<!-- +page.svelte -->
<script>
	import './front_page_style.css';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import toastr from 'toastr';
	import { onMount } from 'svelte';
	import img1 from '$lib/assets/logo_of_fox_2.png';
	import img2 from '$lib/assets/kanban_todo_1.png';
	import img3 from '$lib/assets/kanban_todo_2.png';
	import img4 from '$lib/assets/kanban_todo_3.png';
	import img5 from '$lib/assets/kanban_todo_4.png';
	import img6 from '$lib/assets/kanban_todo_5.png';
	import img7 from '$lib/assets/kanban_todo_6.png';

	let email = '';
	let password = '';

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log(entry.target);
					entry.target.classList.add('show');
				} else {
					entry.target.classList.remove('show');
				}
			});
		});

		const todoElements = document.querySelectorAll('.todo');
		todoElements.forEach((element) => observer.observe(element));
	});
</script>

<header class="nav">
	<div class="nav-inner">
		<a href="/" class="brand">
			<img src={img1} alt="logo" class="logo-img" />
			<span>Kanban</span>
		</a>

		<ul class="menu">
			<li><a href="/front_page">Home</a></li>
			<li><a href="/board_page">Board</a></li>
			<li><a href="/about_page">About</a></li>
			<li><a href="/contact_page">Contact</a></li>
			<li>
				<form
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							console.log(result);
							if (result.type === 'success') {
								toastr.success('Login successful!');
								goto('/board_page');
							} else {
								toastr.error(result.type === 'error' ? result.error.message : result.data?.message);
							}
						};
					}}
					class="auth-form"
				>
					<input name="email" type="email" placeholder="Email..." bind:value={email} required />
					<input
						name="password"
						type="password"
						placeholder="Password..."
						bind:value={password}
						required
					/>

					<button type="submit" class="btn">Login</button>
				</form>
			</li>
			<li class="links">
				<a href="/signup_page" class="btn">Signup</a>
				<a href="/forgot_password_page" class="btn">Forgot password?</a>
			</li>
		</ul>
	</div>
</header>

<section class="main">
	<div class="main-inner">
		<section class="about-section">
			<h1>Master Your Workflow with Kanban</h1>
			<p>
				Kanban is a visual project-management method that helps you track tasks, improve
				productivity, and maintain a smooth, continuous flow of work. Whether you're managing a
				team, organizing personal projects, or optimizing complex operations, Kanban keeps
				everything clear, organized, and adaptable.
			</p>
		</section>
	</div>

	<ul class="todo-list">
		<li class="todo">
			<span>Visualize your work at a glance<br /></span>
			<img src={img2} alt="Kanban visualization" />
		</li>

		<li class="todo">
			<span>Organize tasks into clear workflow columns<br /></span>
			<img src={img3} alt="Kanban visualization" />
		</li>

		<li class="todo">
			<span>Focus better by limiting work in progress<br /></span>
			<img src={img4} alt="Kanban visualization" />
		</li>

		<li class="todo">
			<span>Break big goals into actionable cards<br /></span>
			<img src={img5} alt="Kanban visualization" />
		</li>

		<li class="todo">
			<span>Track progress by moving cards forward<br /></span>
			<img src={img6} alt="Kanban visualization" />
		</li>

		<li class="todo">
			<span>Collaborate with your team in real time<br /></span>
			<img src={img7} alt="Kanban visualization" />
		</li>
	</ul>
</section>
