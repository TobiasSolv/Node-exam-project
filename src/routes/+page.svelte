<script>
	import LoginForm from './login_form/+page.svelte';
	export let form;
</script>

{#if form?.message}
	<p>{form.message}</p>
{/if}

<LoginForm />
