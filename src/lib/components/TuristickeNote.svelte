<script lang="ts">
	import CardYearly from "$lib/components/CardYearly.svelte"
	import Icon from "@iconify/svelte"
	import { eyeClosed, eyeOpen } from "$lib/constants"
	import { fade } from "svelte/transition"
	import { pausalInfo, UI, setUISetting } from "$lib/scripts/localStorage.svelte"

	let sortedYearly = $derived(
		$state
			.snapshot(pausalInfo.turisticke_zajednice_info.godine)
			.sort((a: number, b: number) => b - a)
	)
</script>

<div class="note">
	<h2>
		Članarina za turističku zajednicu <button
			onclick={() => {
				setUISetting("hideTuristicke")
			}}><Icon icon={UI.settings.hideTuristicke ? eyeClosed : eyeOpen} /></button
		>
	</h2>
</div>
{#if !UI.settings.hideTuristicke}
	<div class="card-group" in:fade={{ duration: 200 }}>
		{#each sortedYearly as year}
			<CardYearly {year} />
		{/each}
	</div>
{/if}
