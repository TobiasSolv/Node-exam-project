<script>
	import './board_page.css';
	import img from '$lib/assets/logo_of_fox_2.png';

	let { data } = $props();
	let showForm = $state(false);
</script>

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
	</div>
</header>

<!-- Boards -->
<section class="boards">
	{#each data.boards as board}
		<div class="board-card-wrapper">
			<a class="board-card" href="/kanban_page/{board.id}">
				<span class="board-name">{board.name}</span>
			</a>

			<form
				method="POST"
				action="?/deleteBoard"
				onsubmit={(e) => {
					if (!confirm(`Delete "${board.name}"?`)) {
						e.preventDefault();
					}
				}}
			>
				<input type="hidden" name="id" value={board.id} />
				<button type="submit" class="delete-btn">✕</button>
			</form>
		</div>
	{/each}

	<!-- Add board card -->
	<button class="board-card add-board" onclick={() => (showForm = true)}> Add Board </button>
</section>

<!-- Add board modal -->
{#if showForm}
	<div class="modal-backdrop" onclick={() => (showForm = false)}></div>

	<form method="POST" class="modal" action="?/addBoard">
		<h2>Create board</h2>

		<input name="name" placeholder="Board name" required />

		<textarea name="description" placeholder="Description (optional)"></textarea>

		<div class="modal-actions">
			<button type="submit" class="add-btn">Create</button>
			<button type="button" class="add-btn" onclick={() => (showForm = false)}> Cancel </button>
		</div>
	</form>
{/if}
