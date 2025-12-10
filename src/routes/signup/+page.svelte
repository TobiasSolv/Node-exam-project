<script>
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import toastr from 'toastr';
</script>

<form
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success' && result.status === 200) {
				goto('/login_form');
				toastr.success('Signup successful!');
			} else {
				toastr.error(result.type === 'error' ? result.error.message : result.data?.message);
			}
		};
	}}
	class="auth-form"
>
	<h1>Create User</h1>

	<div class="input-group">
		<input name="email" type="email" placeholder="Email" required />
	</div>

	<div class="input-group">
		<input name="password" type="password" placeholder="Password" required />
	</div>

	<button type="submit">Create Account</button>

	<div class="links">
		<a href="/login_form">Cancel</a>
	</div>
</form>
