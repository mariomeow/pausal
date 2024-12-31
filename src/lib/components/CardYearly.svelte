<script lang="ts">
	import Icon from "@iconify/svelte"
	import TuristickeZajednice from "$lib/turistickezajednice.json"
	import { SvelteDate } from "svelte/reactivity"
	import { toggleTuristickaGodina } from "$lib/scripts/localStorage.svelte"
	import { pausalInfo } from "$lib/scripts/localStorage.svelte"
	import { scale } from "svelte/transition"

	let { year }: { year: number } = $props()

	let checkboxInput = $state<HTMLInputElement>()

	let stopa = $derived<number>(
		TuristickeZajednice.find(
			(item) => item.skupina == pausalInfo.turisticke_zajednice_info.skupina
		)!.stopa
	)
</script>

<div class="card">
	<div class="card-left">
		<Icon icon="streamline:insurance-hand-solid" />
	</div>
	<div class="card-middle">
		<h1>Doprinosi</h1>
		<p>Članarina za turističku zajednicu {year}.</p>
		<span>
			{new SvelteDate(year + 1, 2, 0).getDate()}.2.{year + 1} / {Math.ceil(
				pausalInfo.turisticke_zajednice_info.promet * stopa * 100
			) / 100} EUR
		</span>
	</div>
	<div class="card-right">
		<input
			bind:this={checkboxInput}
			type="checkbox"
			hidden
			onchange={() => {
				toggleTuristickaGodina(year)
			}}
		/>
		<button
			onclick={() => {
				checkboxInput?.click()
			}}
		>
			{#if pausalInfo.turisticke_zajednice_info.placeneGodine.includes(year)}
				<div class="checkmark-box" transition:scale={{ duration: 200 }}>
					<Icon icon="material-symbols:check" />
				</div>
			{/if}
		</button>
	</div>
</div>
