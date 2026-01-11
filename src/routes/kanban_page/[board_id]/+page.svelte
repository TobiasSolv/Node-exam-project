<script>
	import './kanban_style.css';
	import { draggable, dropzone } from '$lib/drag_and_drop.js';
	import { board } from '$lib/stores/kanban_board.js';
	import { page } from '$app/state';
	import img from '$lib/assets/logo_of_fox_2.png';

	let board_id = page.params.board_id;

	let { data } = $props();

	const columns = ['backlog', 'ready', 'in progress', 'in review', 'blocked', 'done'];

	// Initialize empty board structure
	const initialBoard = {};
	columns.forEach((c) => (initialBoard[c] = []));

	// Distribute tickets into columns by status
	data.tickets.forEach((ticket) => initialBoard[ticket.status].push(ticket));

	board.set(initialBoard);

	async function handleDrop(payload, newStatus) {
		const ticket = JSON.parse(payload);

		// Move ticket between columns
		board.update((board) => {
			board[ticket.status] = board[ticket.status].filter((t) => t.id !== ticket.id);
			ticket.status = newStatus;
			board[newStatus] = [...board[newStatus], ticket];
			return { ...board };
		});

		// Persist status change
		const formData = new FormData();
		formData.append('id', ticket.id);
		formData.append('status', newStatus);

		await fetch('?/move', {
			method: 'POST',
			body: formData
		});
	}

	// Delete a ticket locally and on the backend
	async function deleteTicket(id, status) {
		board.update((board) => {
			board[status] = board[status].filter((t) => t.id !== id);
			return { ...board };
		});

		// Persist deletion
		const formData = new FormData();
		formData.append('id', id);

		await fetch('?/delete', {
			method: 'POST',
			body: formData
		});
	}

	// Update selected ticket priority
	function setPriority(value) {
		selectedTicket.priority = value;
		document.getElementById('priority-menu')?.hidePopover();
	}

	// Modal state
	let selectedTicket = $state(null);
	let isModalOpen = $state(false);

	// Open modal
	function openModal(ticket) {
		selectedTicket = { ...ticket }; // clone to avoid direct mutation
		isModalOpen = true;
	}

	// Close modal
	function closeModal() {
		isModalOpen = false;
		selectedTicket = null;
	}

	// Save ticket changes
	async function saveTicket() {
		if (!selectedTicket) return;

		// Send update to backend
		const formData = new FormData();
		formData.append('id', selectedTicket.id);
		formData.append('title', selectedTicket.title);
		formData.append('priority', selectedTicket.priority);

		await fetch('?/update', {
			method: 'POST',
			body: formData
		});

		// Update ticket in board state
		board.update((board) => {
			const list = board[selectedTicket.status];
			const index = list.findIndex((t) => t.id === selectedTicket.id);
			if (index !== -1) {
				list[index] = { ...selectedTicket };
			}
			return { ...board };
		});

		closeModal();
	}

	// Delete ticket from modal
	async function deleteFromModal() {
		await deleteTicket(selectedTicket.id, selectedTicket.status);
		closeModal();
	}
</script>

<form method="POST" action="?/logout">
	<header class="nav">
		<div class="nav-inner">
			<a href="/" class="brand">
				<img src={img} alt="logo" class="logo-img" />
				<span>Kanban</span>
			</a>
			<ul class="menu">
				<li><a href="/">Home</a></li>
				<li><a href="/board_page">Board</a></li>
				<li><a href="/about_page">About</a></li>
				<li><a href="/contact_page">Contact</a></li>
			</ul>
			<ul class="menu">
				<p class="menu">Logged in as: <strong>{data.user.email}</strong></p>
				<li class="nav-btn">
					<button type="submit" name="logout" class="btn logout-btn">logout</button>
				</li>
			</ul>
		</div>
	</header>
</form>

<!-- Kanban board -->
<form method="POST" class="board">
	<div class="wrapper">
		{#each columns as status}
			<div
				class="kanban-column"
				use:dropzone={{
					on_dropzone: (payload) => handleDrop(payload, status)
				}}
			>
				<h2>{status}</h2>

				<ul>
					{#each $board[status] as ticket}
						<li class="kanban-item {ticket.priority}">
							<div class="drag-handle" use:draggable={JSON.stringify(ticket)}>
								<div class="ticket-content">
									<strong class="ticket-title" onclick={() => openModal(ticket)}>
										{ticket.title}<br />
										Priority: {ticket.priority}
									</strong>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="add-btn-wrapper">
		<a class="add-btn" href="/ticket_page/{board_id}">Add ticket</a>
	</div>
</form>

{#if isModalOpen}
	<div class="modal-backdrop"></div>

	<div class="modal">
		<h2>Edit Ticket</h2>

		<label>
			Title
			<input placeholder="Title" bind:value={selectedTicket.title} />
		</label>

		<label>
			Description
			<textarea placeholder="Description" bind:value={selectedTicket.body}></textarea>
		</label>

		<button type="button" id="priority-button" popovertarget="priority-menu" class="contact-btn">
			{selectedTicket.priority}
		</button>

		<label>
			<div id="priority-menu" popover class="popover-menu">
				<button type="button" onclick={() => setPriority('low')}>Low</button>
				<button type="button" onclick={() => setPriority('medium')}>Medium</button>
				<button type="button" onclick={() => setPriority('high')}>High</button>
			</div>
		</label>

		<div class="modal-actions">
			<button class="add-btn" onclick={saveTicket}>Save</button>
			<button class="add-btn" onclick={deleteFromModal}>Delete</button>
			<button class="add-btn" onclick={closeModal}>Cancel</button>
		</div>
	</div>
{/if}
