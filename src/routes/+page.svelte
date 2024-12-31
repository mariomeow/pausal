<script lang="ts">
	import Cards from "$lib/components/Cards.svelte"
	import Note from "$lib/components/Note.svelte"
	import CardYearly from "$lib/components/CardYearly.svelte"
	import { database, pausalInfo } from "$lib/scripts/localStorage.svelte"
	import { SvelteDate } from "svelte/reactivity"
	import type { monthDataType } from "$lib/types"

	const myDate: SvelteDate = new SvelteDate()
	let currentMonthData = $derived(database.map.get(`${myDate.getMonth()}/${myDate.getFullYear()}`))
	let prikaziPovijest: boolean = $state(false)

	let sortedYearly = $derived(
		$state
			.snapshot(pausalInfo.turisticke_zajednice_info.godine)
			.sort((a: number, b: number) => b - a)
	)
</script>

<svelte:head>
	<title>Paušal - Početna</title>
</svelte:head>

{#if pausalInfo.turisticke_zajednice}
	<div class="note">
		<h2>Članarina za turističku zajednicu</h2>
	</div>
	<div class="card-group">
		{#each sortedYearly as year}
			<CardYearly {year} />
		{/each}
	</div>
{/if}
<Note mjesec={myDate.toLocaleDateString("hr", { month: "long" })} monthData={currentMonthData!} />
<Cards monthData={currentMonthData as monthDataType} date={myDate} />
{#if prikaziPovijest}
	{#each database.map.keys() as key}
		{#if key != `${myDate.getMonth()}/${myDate.getFullYear()}`}
			{@const cardDate = new SvelteDate(key.split("/")[1], key.split("/")[0])}
			<Note
				mjesec={cardDate.toLocaleDateString("hr", { month: "long" })}
				monthData={database.map.get(key)!}
				{cardDate}
			/>
			<Cards monthData={database.map.get(key) as monthDataType} date={cardDate} />
		{/if}
	{/each}
{/if}
{#if database.map.size > 1}
	<button
		onclick={() => {
			prikaziPovijest = !prikaziPovijest
		}}>{prikaziPovijest ? "Sakrij povijest" : "Prikaži povijest"}</button
	>
{/if}
