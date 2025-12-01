<script>
	import { enhance } from '$app/forms';
	import toastr from 'toastr';

	let email = '';
</script>

<form
	method="POST"
	use:enhance={(submitEvent) => {
		return async ({ result }) => {
			if (result.type === 'success' && result.data?.success) {
				toastr.success('Reset link sent to your email!');
			} else {
				toastr.error(result.data?.message || 'Something went wrong');
			}
		};
	}}
	class="auth-form"
>
	<h1>Forgot Password</h1>

	<div class="input-group">
		<input name="email" type="email" bind:value={email} placeholder="Email" required />
	</div>

	<button type="submit">Send Reset Email</button>

	<div class="links">
		<a href="/login_form">Cancel</a>
	</div>
</form>
