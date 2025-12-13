<script>
	import './ticket_page.css';
</script>

<header class="nav">
	<div class="nav-inner">
		<a href="/" class="brand">
			<img src="src/lib/logo of fox 2.png" alt="logo" class="logo-img" />
			<span>Kanban</span>
		</a>

		<ul class="menu">
			<li><a href="/front_page">Home</a></li>
			<li><a href="/kanban_page">Kanban</a></li>
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
			<button id="status-button" popovertarget="status-menu" class="contact-btn"> Status </button>

			<div id="status-menu" popover class="popover-menu">
				<a href="#">Backlog</a>
				<a href="#">Ready</a>
				<a href="#">In progress</a>
				<a href="#">In review</a>
				<a href="#">Blocked</a>
				<a href="#">Done</a>
			</div>

			<!-- Priority button + menu -->
			<button id="priority-button" popovertarget="priority-menu" class="contact-btn">
				Priority
			</button>

			<div id="priority-menu" popover class="popover-menu">
				<a href="#">Low</a>
				<a href="#">Medium</a>
				<a href="#">High</a>
			</div>

			<form method="POST" action="?/add" class="contact-form">
				<label>
					Status
					<input name="status" type="text" placeholder="Status" />
				</label>

				<label>
					Priority
					<input name="priority" type="text" placeholder="Priority" />
				</label>

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
