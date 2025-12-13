<script>
	import LoginForm from './front_page/+page.svelte';
	export let form;
</script>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<LoginForm />
