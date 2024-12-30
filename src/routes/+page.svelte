<script lang="ts">
	import Cards from "$lib/components/Cards.svelte"
	import Note from "$lib/components/Note.svelte"
	import { database } from "$lib/scripts/localStorage.svelte"
	import { SvelteDate } from "svelte/reactivity"
	import type { monthDataType } from "$lib/types"

	const myDate: SvelteDate = new SvelteDate()
	let currentMonthData = $derived(database.map.get(`${myDate.getMonth()}/${myDate.getFullYear()}`))
	let prikaziPovijest: boolean = $state(false)
</script>

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
<button
	onclick={() => {
		prikaziPovijest = !prikaziPovijest
	}}>{prikaziPovijest ? "Sakrij povijest" : "Prikaži povijest"}</button
>
