<script lang="ts">
	import "$lib/css/app.css"
	import Nav from "$lib/components/Nav.svelte"
	import { Toaster } from "svelte-french-toast"

	let { children } = $props()
</script>

<main>
	<Nav />
	<div class="content-wrapper">{@render children()}</div>
</main>
<div class="spacing"></div>
<Toaster />
