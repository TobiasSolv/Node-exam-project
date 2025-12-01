<script>
	import { page } from '$app/stores';

	export let data;
	let password = '';
</script>

<form method="POST" class="auth-form">
	<h1>Reset Password</h1>

	<input type="hidden" name="email" value={$page.url.searchParams.get('email')} />

	<div class="input-group">
		<input
			type="password"
			name="password"
			placeholder="New password"
			bind:value={password}
			required
		/>
	</div>

	<button type="submit">Update Password</button>
</form>
