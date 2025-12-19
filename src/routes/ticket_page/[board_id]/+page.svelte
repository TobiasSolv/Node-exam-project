<script>
	import './ticket_page.css';
	import { page } from '$app/state';
	import img from '$lib/assets/logo of fox 2.png';

	let board_id = page.params.board_id;

	let statusValue = '';
	let priorityValue = '';
	let statusLabel = 'Status';
	let priorityLabel = 'Priority';

	function selectStatus(value, label) {
		statusValue = value;
		statusLabel = label;
		document.getElementById('status-menu')?.hidePopover();
	}

	function selectPriority(value, label) {
		priorityValue = value;
		priorityLabel = label;
		document.getElementById('priority-menu')?.hidePopover();
	}
</script>

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
	</div>
</header>

<main class="main">
	<div class="main-inner">
		<h1>Create Ticket</h1>

		<section class="contact-intro">
			<p>Create a new ticket by selecting a status, priority, and entering details below.</p>
		</section>

		<section class="contact-form-section">
			<!-- Status button + menu -->
			<button type="button" id="status-button" popovertarget="status-menu" class="contact-btn">
				{statusLabel}
			</button>

			<div id="status-menu" popover class="popover-menu">
				<button type="button" on:click={() => selectStatus('backlog', 'Backlog')}>Backlog</button>
				<button type="button" on:click={() => selectStatus('ready', 'Ready')}>Ready</button>
				<button type="button" on:click={() => selectStatus('in progress', 'In progress')}
					>In progress</button
				>
				<button type="button" on:click={() => selectStatus('in review', 'In review')}
					>In review</button
				>
				<button type="button" on:click={() => selectStatus('blocked', 'Blocked')}>Blocked</button>
				<button type="button" on:click={() => selectStatus('done', 'Done')}>Done</button>
			</div>

			<!-- Priority button + menu -->
			<button type="button" id="priority-button" popovertarget="priority-menu" class="contact-btn">
				{priorityLabel}
			</button>

			<div id="priority-menu" popover class="popover-menu">
				<button type="button" on:click={() => selectPriority('low', 'Low')}>Low</button>
				<button type="button" on:click={() => selectPriority('medium', 'Medium')}>Medium</button>
				<button type="button" on:click={() => selectPriority('high', 'High')}>High</button>
			</div>

			<form method="POST" action="?/add" class="contact-form">
				<input type="hidden" name="status" value={statusValue} required />
				<input type="hidden" name="priority" value={priorityValue} required />

				<label>
					Title
					<input name="title" type="text" placeholder="Title" />
				</label>

				<label>
					Body
					<textarea name="body" rows="4" placeholder="Description"></textarea>
				</label>

				<button type="submit" class="contact-btn">Add Ticket</button>

				<div class="links" style="margin-top: 1rem;">
					<a href="/kanban_page">Back</a>
				</div>
			</form>
		</section>
	</div>
</main>
