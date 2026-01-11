<script>
	import { page } from '$app/stores';
	import './reset_password_page.css';
	import img from '$lib/assets/logo_of_fox_2.png';

	export let data;
	let password = '';
</script>

<header class="nav">
	<div class="nav-inner">
		<img src={img} alt="logo" class="logo-img" />
		<span class="logo-text">Kanban</span>
	</div>
</header>

<main class="main">
	<div class="main-inner">
		<h1>Reset Password</h1>

		<section class="contact-intro">
			<p>
				Enter your new password below. After updating, you can sign in again using your new
				credentials.
			</p>
		</section>

		<section class="contact-form-section">
			<form method="POST" class="contact-form">
				<!-- hidden email from URL param -->
				<input type="hidden" name="email" value={$page.url.searchParams.get('email')} />

				<label>
					New Password
					<input
						type="password"
						name="password"
						placeholder="New password"
						bind:value={password}
						required
					/>
				</label>

				<button type="submit" class="contact-btn">Update Password</button>
			</form>
		</section>
	</div>
</main>
