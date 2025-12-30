<script>
	import './contact_page.css';
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
		<h1>Contact Us</h1>

		<section class="contact-intro">
			<p>
				We’re here to help! Whether you have questions about using the Kanban board, want to suggest
				new features, or simply want to say hello—feel free to reach out. Your feedback helps us
				grow and improve.
			</p>
		</section>

		<section class="contact-section">
			<h2>Get in Touch</h2>

			<article class="contact-card">
				<h3>Email</h3>
				<p>
					For general support and inquiries:
					<br />
					<strong>support@kanbanapp.com</strong>
				</p>
			</article>

			<article class="contact-card">
				<h3>Feedback</h3>
				<p>
					We love hearing ideas, improvements, and suggestions.
					<br />
					<strong>feedback@kanbanapp.com</strong>
				</p>
			</article>

			<article class="contact-card">
				<h3>Report an Issue</h3>
				<p>
					Found a bug or something not working as expected?
					<br />
					<strong>issues@kanbanapp.com</strong>
				</p>
			</article>
		</section>

		<section class="contact-form-section">
			<h2>Send a Message</h2>

			<form class="contact-form">
				<label>
					Name
					<input type="text" placeholder="Your name" required />
				</label>

				<label>
					Email
					<input type="email" placeholder="you@example.com" required />
				</label>

				<label>
					Message
					<textarea rows="5" placeholder="Write your message here..." required></textarea>
				</label>

				<button type="submit" class="contact-btn">Send Message</button>
			</form>
		</section>
	</div>
</main>
