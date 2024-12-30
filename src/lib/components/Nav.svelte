<script lang="ts">
	import Icon from "@iconify/svelte"
	import { page } from "$app/state"

	let { id } = $derived(page.route)
</script>

<nav>
	<a href="/" aria-current={id == "/" ? "page" : false}><Icon icon="mdi:letter-p-box" /> Paušal</a>
	<a href="/usluge" aria-current={id == "/usluge" ? "page" : false}
		><Icon icon="mdi:briefcase" />Usluge</a
	>
	<a href="/postavke" aria-current={id == "/postavke" ? "page" : false}
		><Icon icon="material-symbols:settings" />Postavke</a
	>
</nav>
