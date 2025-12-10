<!-- +page.svelte -->
<script>
	import './front_page_style.css';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import toastr from 'toastr';

	let email = '';
	let password = '';
</script>

<header class="nav">
	<div class="nav-inner">
		<a href="/" class="brand">
			<img src="src\lib\logo of fox 2.png" alt="logo" class="logo-img" />
			<span>Kanban</span>
		</a>

		<ul class="menu">
			<li><a href="/front_page">Home</a></li>
			<li><a href="/kanban_page">Kanban</a></li>
			<li><a href="#">About</a></li>
			<li><a href="#">Contact</a></li>

			<form action="#" class="search">
				<input type="search" placeholder="Email..." required />
				<input type="password" placeholder="Password..." required />
			</form>

			<li class="nav-btn">
				<a href="#" class="btn">Login</a>
			</li>
		</ul>
	</div>
</header>

<section class="main">
	<div class="main-inner">
		<h1>title</h1>
		<p>text</p>
	</div>
</section>
