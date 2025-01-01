<script lang="ts">
	import Cards from "$lib/components/Cards.svelte"
	import Note from "$lib/components/Note.svelte"
	import { database, pausalInfo } from "$lib/scripts/localStorage.svelte"
	import { SvelteDate } from "svelte/reactivity"
	import TuristickeNote from "$lib/components/TuristickeNote.svelte"
	import type { monthDataType } from "$lib/types"

	const myDate: SvelteDate = new SvelteDate()
	let currentMonthData = $derived(database.map.get(`${myDate.getMonth()}/${myDate.getFullYear()}`))
	let prikaziPovijest: boolean = $state(false)
</script>

<svelte:head>
	<title>Paušal - Početna</title>
</svelte:head>

{#if pausalInfo.turisticke_zajednice}
	<TuristickeNote />
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
