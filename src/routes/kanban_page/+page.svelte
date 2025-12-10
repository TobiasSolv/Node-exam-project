<script>
	import { goto } from '$app/navigation';
	import './kanban_style.css';

	let { data } = $props();

	const columns = ['backlog', 'ready', 'in progress', 'in review', 'blocked', 'done'];
	const board = {};

	columns.forEach((c) => (board[c] = []));
	data.tickets.forEach((ticket) => board[ticket.status].push(ticket));

	let draggedTicket = null;

	function handleDragStart(ticket) {
		draggedTicket = ticket;
	}

	function handleDragOver(event) {
		event.preventDefault(); // Allows drop
	}

	async function handleDrop(status) {
		if (!draggedTicket) return;

		const oldStatus = draggedTicket.status;

		// Update UI instantly
		board[oldStatus] = board[oldStatus].filter((t) => t.id !== draggedTicket.id);
		draggedTicket.status = status;
		board[status] = [...board[status], draggedTicket];

		// Send update to backend
		const formData = new FormData();
		formData.append('id', draggedTicket.id);
		formData.append('status', status);

		await fetch('?/move', {
			method: 'POST',
			body: formData
		});

		draggedTicket = null;
	}

	function handleDragEnter(event) {
		event.currentTarget.classList.add('drag-over');
	}

	function handleDragLeave(event) {
		event.currentTarget.classList.remove('drag-over');
	}
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
				<li><a href="#">About</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
			<ul class="menu">
				<!-- <button class="logout-btn">Logout</button> -->
				<p class="menu">Logged in as: <strong>{data.user}</strong></p>
				<li class="nav-btn">
					<a href="#" class="btn">logout</a>
				</li>
			</ul>
		</div>
	</header>

	<div class="wrapper">
		{#each columns as status}
			<div
				role="region"
				class="kanban-column"
				on:dragover={handleDragOver}
				on:drop={() => handleDrop(status)}
				on:dragenter={handleDragEnter}
				on:dragleave={handleDragLeave}
			>
				<h2>{status}</h2>
				<ul>
					{#each board[status] as ticket}
						<li class="kanban-item" draggable="true" on:dragstart={() => handleDragStart(ticket)}>
							{ticket.title} <br />
							Priority: {ticket.priority}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
	<a href="/ticket_page">Add</a>
</form>
