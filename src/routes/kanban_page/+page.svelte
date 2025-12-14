<script>
	import { goto } from '$app/navigation';
	import './kanban_style.css';
	import { draggable, dropzone } from '$lib/drag_and_drop.js';
	import { board } from '$lib/stores/kanban_board.js';

	let { data } = $props();

	const columns = ['backlog', 'ready', 'in progress', 'in review', 'blocked', 'done'];

	// Initialize board ONCE
	const initialBoard = {};
	columns.forEach((c) => (initialBoard[c] = []));
	data.tickets.forEach((ticket) => initialBoard[ticket.status].push(ticket));

	board.set(initialBoard);
</script>

<form method="POST" action="?/logout" class="board">
	<header class="nav">
		<div class="nav-inner">
			<a href="/" class="brand">
				<img src="src\lib\logo of fox 2.png" alt="logo" class="logo-img" />
				<span>Kanban</span>
			</a>
			<ul class="menu">
				<li><a href="/front_page">Home</a></li>
				<li><a href="/kanban_page">Kanban</a></li>
				<li><a href="/about_page">About</a></li>
				<li><a href="/contact_page">Contact</a></li>
			</ul>
			<ul class="menu">
				<!-- <button class="logout-btn">Logout</button> -->
				<p class="menu">Logged in as: <strong>{data.user}</strong></p>
				<li class="nav-btn">
					<button type="submit" name="logout" class="btn logout-btn">logout</button>
				</li>
			</ul>
		</div>
	</header>

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

							return { ...b }; // 🔥 trigger reactivity
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
						<li class="kanban-item {ticket.priority}" use:draggable={JSON.stringify(ticket)}>
							{ticket.title} <br />
							Priority: {ticket.priority}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="add-btn-wrapper">
		<a class="add-btn" href="/ticket_page">Add</a>
	</div>
</form>
