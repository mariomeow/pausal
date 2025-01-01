<script lang="ts">
	import Confetti from "./Confetti.svelte"
	import type { monthDataType } from "$lib/types"
	import { SvelteDate } from "svelte/reactivity"
	import { eyeClosed, eyeOpen } from "$lib/constants"
	import Icon from "@iconify/svelte"
	import { taxPaymentMonths, komorskiPaymentDates } from "$lib/constants"
	import { pausalInfo, UI, setUISetting } from "$lib/scripts/localStorage.svelte"

	let {
		mjesec,
		monthData,
		cardDate
	}: { mjesec: string; monthData: monthDataType; cardDate?: SvelteDate } = $props()

	let neRjeseno = $derived.by(() => {
		let ukupno: number = Object.values(monthData).filter((item) => item == false).length

		if (!pausalInfo.komorski_doprinos) {
			ukupno--
		} else if (!komorskiPaymentDates[new SvelteDate().getMonth()]) {
			ukupno--
		}

		if (pausalInfo.poslodavac) {
			ukupno -= 3
		}

		if (!taxPaymentMonths.find((item) => item == new SvelteDate().getMonth())) {
			ukupno--
		}

		return ukupno
	})
</script>

<div class="note">
	{#if neRjeseno > 0}
		<h2>
			Još {neRjeseno}
			{neRjeseno > 1 ? "neplaćena računa" : "neplaćen račun"} za {mjesec}
			{cardDate ? cardDate?.getFullYear() + "." : null}
			<button
				onclick={() => {
					setUISetting("hideRacuni")
				}}><Icon icon={UI.settings.hideRacuni ? eyeClosed : eyeOpen} /></button
			>
		</h2>
	{:else}
		{#if !cardDate}
			<Confetti />
		{/if}
		<h2>
			Platili ste sve račune za {mjesec}
			<button
				onclick={() => {
					setUISetting("hideRacuni")
				}}><Icon icon={UI.settings.hideRacuni ? eyeClosed : eyeOpen} /></button
			>
		</h2>
	{/if}
</div>
