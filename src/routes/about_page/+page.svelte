<script lang="ts">
	import './about_page.css';
	import img from '$lib/assets/logo_of_fox_2.png';
	import { onMount, onDestroy } from 'svelte';

	let ws: WebSocket;
	let messages: string[] = [];
	let messageInput = '';

	onMount(() => {
		ws = new WebSocket('ws://localhost:3000');

		ws.onmessage = (event) => {
			messages = [...messages, event.data];
		};

		ws.onerror = (err) => {
			console.error('WebSocket error:', err);
		};

		ws.onclose = () => {
			console.log('WebSocket closed');
		};
	});

	onDestroy(() => {
		if (ws) ws.close();
	});

	function sendMessage() {
		if (messageInput && ws?.readyState === WebSocket.OPEN) {
			ws.send(messageInput);
			messageInput = '';
		}
	}
</script>

<header class="nav">
	<div class="nav-inner">
		<a href="/" class="brand">
			<img src={img} alt="logo" class="logo-img" />
			<span>Kanban</span>
		</a>

		<ul class="menu">
			<li><a href="/">Home</a></li>
			<li><a href="/board_page">Board</a></li>
			<li><a href="/about_page">About</a></li>
			<li><a href="/contact_page">Contact</a></li>
		</ul>
	</div>
</header>

<main class="main">
	<div class="main-inner">
		<h1>About Kanban</h1>

		<section class="contact-section">
			<div class="contact-card ws-chat">
				<h3>Chat bot</h3>

				<div class="messages">
					{#each messages as msg}
						<div class="message">{msg}</div>
					{/each}
				</div>

				<form class="contact-form" on:submit|preventDefault={sendMessage}>
					<input type="text" bind:value={messageInput} placeholder="Enter your message" />
					<button type="submit" class="contact-btn"> Send Message </button>
				</form>
			</div>
		</section>

		<section class="about-section">
			<p>
				Kanban is a visual workflow system designed to help individuals and teams manage tasks with
				clarity and focus. Its core purpose is simple: <strong
					>see work, limit overload, and improve flow</strong
				>. Whether you're organizing a personal project or coordinating a full team, Kanban
				transforms your process into something you can see, adjust, and continually improve.
			</p>
		</section>

		<section class="about-section">
			<h2>Our Mission</h2>
			<p>
				Our goal is to provide a clean, intuitive, and flexible Kanban experience that empowers
				users to work at their best pace. We believe that task management shouldn’t be
				complicated—so we focus on simplicity, clarity, and a smooth user experience.
			</p>
		</section>

		<section class="about-section">
			<h2>Why Kanban Works</h2>
			<ul>
				<li>
					<strong>Visual Clarity:</strong> All your work is displayed in front of you, reducing overwhelm
					and forgotten tasks.
				</li>
				<li>
					<strong>Work-in-Progress Limits:</strong> Encourages focus by preventing too many tasks from
					piling up.
				</li>
				<li>
					<strong>Continuous Improvement:</strong> By observing the flow of tasks, you can fine-tune
					your productivity over time.
				</li>
				<li>
					<strong>Adaptability:</strong> Suitable for personal planning, team projects, Agile workflows,
					and more.
				</li>
			</ul>
		</section>

		<section class="about-section">
			<h2>Our Philosophy</h2>
			<p>
				Every task you complete is a step forward. Every bottleneck you fix is progress. Kanban
				isn’t just a tool—it's a mindset of thoughtful, steady improvement. We aim to create a space
				where your work feels manageable, organized, and aligned with your goals.
			</p>
		</section>

		<section class="about-section">
			<h2>Our Purpose</h2>
			<p>
				This project aims to bring the simplicity of Kanban into a clean, modern, and accessible
				digital environment. Whether you're organizing personal tasks or managing team projects, our
				Kanban board provides a streamlined experience that adapts to your workflow—never the other
				way around.
			</p>
		</section>

		<section class="about-section">
			<h2>What You Can Expect</h2>
			<ul>
				<li>A clear and intuitive drag-and-drop workflow</li>
				<li>Customizable task states (To-Do, In Progress, Done)</li>
				<li>A lightweight, fast, and distraction-free interface</li>
				<li>An environment designed to help you stay focused</li>
			</ul>
		</section>

		<section class="about-section">
			<h2>Our Vision</h2>
			<p>
				We believe productivity tools should feel empowering—not overwhelming. This Kanban
				application is built with simplicity in mind, offering just the right features to help you
				see your work clearly, prioritize effectively, and achieve more with less stress.
			</p>
		</section>

		<section class="about-section">
			<h2>Why a Fox?</h2>
			<p>
				The fox in our logo represents adaptability, clarity, and smart problem-solving—all key
				traits of an effective workflow. Just like the fox, Kanban helps you stay agile and
				confident in the face of changing tasks and priorities.
			</p>
		</section>
	</div>
</main>
