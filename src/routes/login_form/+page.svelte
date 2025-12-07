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
			if (result.type === 'success') {
				goto('/kanban_page');
				toastr.success('Login successful!');
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
		<button on:click={() => goto('/signup')}>Create an account</button>
		<button on:click={() => goto('/forgot_password')}>Forgot password?</button>
	</div>
</form>
