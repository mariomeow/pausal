<script lang="ts">
	import Icon from "@iconify/svelte"
	import type { doprinosType, monthDataType } from "$lib/types"
	import Razredi from "$lib/razredi.json"
	import { SvelteDate } from "svelte/reactivity"
	import { updateEntry } from "$lib/scripts/localStorage.svelte"
	import { pausalInfo } from "$lib/scripts/localStorage.svelte"

	let {
		doprinos,
		monthData,
		date
	}: { doprinos: doprinosType; monthData: monthDataType; date: SvelteDate } = $props()

	let checkboxInput = $state<HTMLInputElement>()
</script>

<div class="card">
	<div class="card-left">
		<Icon icon={doprinos.ikona} />
	</div>
	<div class="card-middle">
		<h1>{doprinos.kategorija}</h1>
		<p>{doprinos.opis}</p>
		<span
			>{doprinos.krajnjiDatum
				? `${doprinos.krajnjiDatum}.${date.getMonth() + 1}`
				: `${new SvelteDate(date.getFullYear(), date.getMonth() + 1, 0).getDate()}.${date.getMonth() + 1}`}
			/ {doprinos.kategorija == "Doprinosi"
				? doprinos.trosak?.toFixed(2)
				: Razredi[pausalInfo.tax].pay}
			{Razredi[pausalInfo.tax].currency}
		</span>
	</div>
	<div class="card-right">
		<input
			bind:this={checkboxInput}
			type="checkbox"
			hidden
			value={doprinos.kratica}
			checked={monthData[doprinos.kratica]}
			onchange={() => updateEntry(`${date.getMonth()}/${date.getFullYear()}`, doprinos.kratica)}
		/>
		<button
			onclick={() => {
				checkboxInput?.click()
			}}
		>
			{#if monthData[doprinos.kratica]}
				<Icon icon="material-symbols:check" />
			{/if}
		</button>
	</div>
</div>
