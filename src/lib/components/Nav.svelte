<script lang="ts">
	import Icon from "@iconify/svelte"
	import { page } from "$app/state"

	let { id } = $derived(page.route)
</script>

<nav>
	<a href="/" aria-current={id == "/" ? "page" : false}
		><Icon icon="mdi:letter-p-box" /><span>Paušal</span></a
	>
	<a href="/usluge" aria-current={id == "/usluge" ? "page" : false}
		><Icon icon="mdi:briefcase" /><span>Usluge</span></a
	>
	<a href="/postavke" aria-current={id == "/postavke" ? "page" : false}
		><Icon icon="material-symbols:settings" /><span>Postavke</span></a
	>
</nav>

<div class="mobile-nav">
	<a href="/" aria-current={id == "/" ? "page" : false}
		><Icon icon={id == "/" ? "mdi:letter-p-box" : "mdi:letter-p-box-outline"} /></a
	>
	<a href="/usluge" aria-current={id == "/usluge" ? "page" : false}
		><Icon icon={id == "/usluge" ? "mdi:briefcase" : "mdi:briefcase-outline"} /></a
	>
	<a href="/postavke" aria-current={id == "/postavke" ? "page" : false}
		><Icon
			icon={id == "/postavke" ? "material-symbols:settings" : "material-symbols:settings-outline"}
		/></a
	>
</div>
