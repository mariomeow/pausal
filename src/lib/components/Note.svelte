<script lang="ts">
	import Confetti from "./Confetti.svelte"
	import type { monthDataType } from "$lib/types"
	import { SvelteDate } from "svelte/reactivity"
	import { taxPaymentMonths, komorskiPaymentDates } from "$lib/constants"
	import { pausalInfo } from "$lib/scripts/localStorage.svelte"

	let {
		mjesec,
		monthData,
		cardDate
	}: { mjesec: string; monthData: monthDataType; cardDate?: SvelteDate } = $props()

	let neRjeseno = $derived.by(() => {
		let ukupno: number = Object.values(monthData).filter((item) => item == false).length
		console.log("Pocetak", ukupno)

		if (!pausalInfo.komorski_doprinos) {
			ukupno--
			console.log("Nema komorski -1", ukupno)
		} else if (!komorskiPaymentDates[new SvelteDate().getMonth()]) {
			ukupno--
			console.log("Nije komorski mjesec -1", ukupno)
		}

		if (pausalInfo.poslodavac) {
			ukupno -= 3
			console.log("IMA POSLODAVCA -3")
		}

		if (!taxPaymentMonths.find((item) => item == new SvelteDate().getMonth())) {
			ukupno--
			console.log("Nije mjesec za porez -1")
		}

		console.log("NA KRAJU: ", ukupno)

		return ukupno
	})
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
