<script>
	import { goto } from '$app/navigation';
	import './kanban_style.css';
	import { draggable, dropzone } from '$lib/drag_and_drop.js';
	import { board } from '$lib/stores/kanban_board.js';
	import { page } from '$app/state';
	import img from '$lib/assets/logo_of_fox_2.png';

	let board_id = page.params.board_id;

	let { data } = $props();

	const columns = ['backlog', 'ready', 'in progress', 'in review', 'blocked', 'done'];

	// Initialize board ONCE
	const initialBoard = {};
	columns.forEach((c) => (initialBoard[c] = []));
	data.tickets.forEach((ticket) => initialBoard[ticket.status].push(ticket));

	board.set(initialBoard);

	async function deleteTicket(id, status) {
		// Update UI immediately
		board.update((b) => {
			b[status] = b[status].filter((t) => t.id !== id);
			return { ...b };
		});

		const formData = new FormData();
		formData.append('id', id);

		await fetch('?/delete', {
			method: 'POST',
			body: formData
		});
	}

	let selectedTicket = $state(null);
	let isModalOpen = $state(false);

	function openModal(ticket) {
		console.log('openModal called', ticket);
		selectedTicket = { ...ticket }; // clone so we don’t mutate directly
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		selectedTicket = null;
	}

	async function saveTicket() {
		if (!selectedTicket) return;

		const formData = new FormData();
		formData.append('id', selectedTicket.id);
		formData.append('title', selectedTicket.title);
		formData.append('priority', selectedTicket.priority);

		await fetch('?/update', {
			method: 'POST',
			body: formData
		});

		board.update((b) => {
			const list = b[selectedTicket.status];
			const index = list.findIndex((t) => t.id === selectedTicket.id);
			if (index !== -1) {
				list[index] = { ...selectedTicket };
			}
			return { ...b };
		});

		closeModal();
	}

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
				<li><a href="/front_page">Home</a></li>
				<li><a href="/board_page">Board</a></li>
				<li><a href="/about_page">About</a></li>
				<li><a href="/contact_page">Contact</a></li>
			</ul>
			<ul class="menu">
				<!-- <button class="logout-btn">Logout</button> -->
				<p class="menu">Logged in as: <strong>{data.user.email}</strong></p>
				<li class="nav-btn">
					<button type="submit" name="logout" class="btn logout-btn">logout</button>
				</li>
			</ul>
		</div>
	</header>
</form>

<form method="POST" class="board">
	<div class="wrapper">
		{#each columns as status}
			<div
				class="kanban-column"
				use:dropzone={{
					on_dropzone: async (payload) => {
						const ticket = JSON.parse(payload);

						board.update((b) => {
							// Remove from old column
							b[ticket.status] = b[ticket.status].filter((t) => t.id !== ticket.id);

							// Update ticket status
							ticket.status = status;

							// Add to new column
							b[status] = [...b[status], ticket];

							return { ...b }; // trigger reactivity
						});

						// Persist to backend
						const formData = new FormData();
						formData.append('id', ticket.id);
						formData.append('status', status);

						await fetch('?/move', {
							method: 'POST',
							body: formData
						});
					}
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
	<div class="modal-backdrop" onclick={closeModal}></div>

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
			{selectedTicket.priority
				? selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)
				: 'Priority'}
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
