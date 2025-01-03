<script lang="ts">
	import "$lib/css/app.css"
	import Nav from "$lib/components/Nav.svelte"
	import { Toaster } from "svelte-french-toast"
	import { screen } from "$lib/scripts/localStorage.svelte"

	let { children } = $props()
</script>

<svelte:window
	bind:innerWidth={screen.width}
	bind:innerHeight={screen.height}
	onresize={() => {
		screen.isMobile = screen.width <= 600 ? true : false
	}}
/>

<main>
	<Nav />
	<div class="content-wrapper">{@render children()}</div>
</main>
<Toaster />
