<script lang="ts">
	import Doprinosi from "$lib/doprinosi.json"
	import Card from "./Card.svelte"
	import { paymentMonths } from "$lib/constants"
	import type { doprinosType, monthDataType } from "$lib/types"
	import type { SvelteDate } from "svelte/reactivity"

	const doprinosi = Doprinosi as doprinosType[]

	let { monthData, date }: { date: SvelteDate; monthData: monthDataType } = $props()
</script>

<div class="card-group">
	{#each doprinosi as doprinos}
		{#if doprinos.kategorija != "Porez"}
			<Card {doprinos} {monthData} {date} />
		{:else if doprinos.kategorija == "Porez" && paymentMonths.find((item) => item == date.getMonth())}
			<Card {doprinos} {monthData} {date} />
		{/if}
	{/each}
</div>
