<script>
	import { goto } from '$app/navigation';
	let { data } = $props();
</script>

<form method="POST">
	<h1>You have logged in</h1>
	<p>users: {data.user}</p>

	<button>Logout</button>
</form>
