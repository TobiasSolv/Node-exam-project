<!-- +page.svelte -->
<script>
	import './front_page_style.css';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import toastr from 'toastr';
	import { onMount } from 'svelte';
	import img from '$lib/assets/logo of fox 2.png';

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
			<img src={img} alt="logo" class="logo-img" />
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

	<ul>
		<li class="todo">
			Visualize tasks with clarity <br /><img src="https://i.imgur.com/98K8Vdi.png" width="120" />
		</li>
		<li class="todo">
			Limit Work-In-Progress (WIP) <br /><img src="https://i.imgur.com/y2qS0eZ.png" width="120" />
		</li>
		<li class="todo">
			Create columns for workflow stages <br /><img
				src="https://i.imgur.com/UiQmQx5.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Break big tasks into smaller actionable cards <br /><img
				src="https://i.imgur.com/naE8lMT.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Use color-coded tags for categories <br /><img
				src="https://i.imgur.com/DSFgsdr.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Prioritize tasks with labels <br /><img src="https://i.imgur.com/XbFXvY9.png" width="120" />
		</li>
		<li class="todo">
			Move cards only when work truly progresses <br /><img
				src="https://i.imgur.com/tpU76pm.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Hold daily Kanban standups <br /><img src="https://i.imgur.com/pM2lNcG.png" width="120" />
		</li>
		<li class="todo">
			Review workflow bottlenecks regularly <br /><img
				src="https://i.imgur.com/8t68Uz4.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Continuously improve your board <br /><img
				src="https://i.imgur.com/Gr3en5a.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Customize swimlanes for teams or priorities <br /><img
				src="https://i.imgur.com/8uGHH8k.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Use Kanban for personal productivity <br /><img
				src="https://i.imgur.com/y7nlP6Z.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Track completed tasks for motivation <br /><img
				src="https://i.imgur.com/FmkR2aA.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Use checklists inside cards <br /><img src="https://i.imgur.com/WVbWUlE.png" width="120" />
		</li>
		<li class="todo">
			Assign team members to specific cards <br /><img
				src="https://i.imgur.com/0ZKwoMP.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Set due dates for time-sensitive work <br /><img
				src="https://i.imgur.com/KUo8K1G.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Include file attachments in Kanban cards <br /><img
				src="https://i.imgur.com/0mSBAFX.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Use automation for repetitive actions <br /><img
				src="https://i.imgur.com/JI4jyNP.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Track cycle time analytics <br /><img src="https://i.imgur.com/HYaxAVD.png" width="120" />
		</li>
		<li class="todo">
			Use Kanban for sprint planning <br /><img src="https://i.imgur.com/wT6xW8R.png" width="120" />
		</li>
		<li class="todo">
			Share boards with your team in real time <br /><img
				src="https://i.imgur.com/q8iPVzE.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Create templates for recurring workflows <br /><img
				src="https://i.imgur.com/bzr2fd0.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Use recurring tasks for weekly routines <br /><img
				src="https://i.imgur.com/zJr8xGx.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Organize your backlog efficiently <br /><img
				src="https://i.imgur.com/OEeQ0xL.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Keep the board clean to avoid clutter <br /><img
				src="https://i.imgur.com/is6jIxn.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Use Kanban to track learning or habits <br /><img
				src="https://i.imgur.com/kHDWT6J.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Plan long-term projects visually <br /><img
				src="https://i.imgur.com/e6eCUNx.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Integrate Kanban with your calendar <br /><img
				src="https://i.imgur.com/7tQ4o5G.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Run retrospectives using board data <br /><img
				src="https://i.imgur.com/rYxI1Rf.png"
				width="120"
			/>
		</li>
		<li class="todo">
			Use mobile Kanban apps to stay updated <br /><img
				src="https://i.imgur.com/cqRiZ0g.png"
				width="120"
			/>
		</li>
	</ul>
</section>
