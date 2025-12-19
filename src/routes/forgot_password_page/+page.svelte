<script>
	import { enhance } from '$app/forms';
	import toastr from 'toastr';
	import './forgot_password_page.css';
	import img from '$lib/assets/logo of fox 2.png';

	let email = '';
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
		<h1>Forgot Password</h1>

		<section class="contact-intro">
			<p>Enter your email and we will send you a link to reset your password.</p>
		</section>

		<section class="contact-form-section">
			<form
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success' && result.data?.success) {
							toastr.success('Reset link sent to your email!');
						} else {
							toastr.error(result.data?.message || 'Something went wrong');
						}
					};
				}}
				class="contact-form"
			>
				<label>
					Email
					<input name="email" type="email" bind:value={email} placeholder="Email" required />
				</label>

				<button type="submit" class="contact-btn">Send Reset Email</button>

				<div class="links" style="margin-top: 1rem;">
					<a href="/front_page">Cancel</a>
				</div>
			</form>
		</section>
	</div>
</main>
