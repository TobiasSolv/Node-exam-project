<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import 'toastr/build/toastr.min.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
