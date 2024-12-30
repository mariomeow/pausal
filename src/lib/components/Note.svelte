<script lang="ts">
	import Confetti from "./Confetti.svelte"
	import type { monthDataType } from "$lib/types"
	import { SvelteDate } from "svelte/reactivity"

	let {
		mjesec,
		monthData,
		cardDate
	}: { mjesec: string; monthData: monthDataType; cardDate?: SvelteDate } = $props()
	let neRjeseno = $derived<number>(Object.values(monthData).filter((item) => item == false).length)
</script>

<div class="note">
	{#if neRjeseno > 0}
		<h2>
			Još {neRjeseno}
			{neRjeseno > 1 ? "neplaćena računa" : "neplaćen račun"} za {mjesec}
			{cardDate ? cardDate?.getFullYear() + "." : null}
		</h2>
	{:else}
		{#if !cardDate}
			<Confetti />
		{/if}
		<h2>Platili ste sve račune za {mjesec}</h2>
	{/if}
</div>
