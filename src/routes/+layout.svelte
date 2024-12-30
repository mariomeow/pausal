<script lang="ts">
	import "$lib/css/app.css"
	import Nav from "$lib/components/Nav.svelte"

	let { children } = $props()
</script>

<main>
	<Nav />
	<div class="content-wrapper">{@render children()}</div>
</main>
