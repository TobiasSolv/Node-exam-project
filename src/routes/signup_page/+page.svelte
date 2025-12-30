<script>
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import toastr from 'toastr';
	import './signup_page.css';
	import img from '$lib/assets/logo_of_fox_2.png';
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
		<h1>Create User</h1>

		<section class="contact-intro">
			<p>
				Create your account to get started with your Kanban board. Once your account is created,
				you'll be redirected to the login page.
			</p>
		</section>

		<section class="contact-form-section">
			<form
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === 'success' && result.status === 200) {
							goto('/front_page');
							toastr.success('Signup successful!');
						} else {
							toastr.error(result.type === 'error' ? result.error.message : result.data?.message);
						}
					};
				}}
				class="contact-form"
			>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" required />
				</label>

				<label>
					Password
					<input name="password" type="password" placeholder="Password" required />
				</label>

				<button type="submit" class="contact-btn">Create Account</button>

				<div class="links" style="margin-top: 1rem;">
					<a href="/front_page">Cancel</a>
				</div>
			</form>
		</section>
	</div>
</main>
