<script lang="ts">
	import Doprinosi from "$lib/doprinosi.json"
	import Card from "./Card.svelte"
	import { taxPaymentMonths, komorskiPaymentDates } from "$lib/constants"
	import type { doprinosType, monthDataType } from "$lib/types"
	import type { SvelteDate } from "svelte/reactivity"
	import { pausalInfo } from "$lib/scripts/localStorage.svelte"

	const doprinosi = Doprinosi as doprinosType[]

	let { monthData, date }: { date: SvelteDate; monthData: monthDataType } = $props()

	$inspect(date.getMonth())
</script>

<div class="card-group">
	{#each doprinosi as doprinos}
		{#if doprinos.kategorija == "Porez"}
			{#if taxPaymentMonths.find((item) => item == date.getMonth())}
				<Card {doprinos} {monthData} {date} />
			{/if}
		{:else if doprinos.kratica == "kd"}
			{#if pausalInfo.komorski_doprinos && komorskiPaymentDates[date.getMonth()]}
				<Card {doprinos} {monthData} {date} />
			{/if}
		{:else if !pausalInfo.poslodavac}
			<Card {doprinos} {monthData} {date} />
		{/if}
	{/each}
</div>
