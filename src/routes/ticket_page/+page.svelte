<script>
	import './ticket_page.css';
</script>

<button id="status-button" popovertarget="status-menu">Status</button>
<div id="status-menu" popover class="popover-menu">
	<a href="#">Backlog</a>
	<a href="#">Ready</a>
	<a href="#">In progress</a>
	<a href="#">In review</a>
	<a href="#">Blocked</a>
	<a href="#">Done</a>
</div>

<button id="priority-button" popovertarget="priority-menu">Priority</button>
<div id="priority-menu" popover class="popover-menu">
	<a href="#">Low</a>
	<a href="#">Medium</a>
	<a href="#">High</a>
</div>

<form method="POST" action="?/add">
	<h1>ticket page</h1>

	<input name="status" type="status" placeholder="status" />
	<input name="priority" type="priority" placeholder="priority" />
	<input name="title" type="title" placeholder="title" />
	<input name="body" type="body" placeholder="body" />

	<button type="submit">add</button>
	<a href="/kanban_page">back</a>
</form>
