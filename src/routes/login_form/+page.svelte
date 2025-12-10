<script>
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import toastr from 'toastr';

	let email = '';
	let password = '';
</script>

<form
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			console.log(result);
			if (result.type === 'success') {
				toastr.success('Login successful!');
				goto('/kanban_page');
			} else {
				toastr.error(result.type === 'error' ? result.error.message : result.data?.message);
			}
		};
	}}
	class="auth-form"
>
	<h1>Login</h1>

	<div class="input-group">
		<input name="email" type="email" placeholder="Email" bind:value={email} required />
	</div>

	<div class="input-group">
		<input name="password" type="password" placeholder="Password" bind:value={password} required />
	</div>

	<button type="submit"> Login </button>

	<div class="links">
		<a href="/kanban_page">kanban page</a>
		<a href="/signup">Create an account</a>
		<a href="/forgot_password">Forgot password?</a>
	</div>
</form>
