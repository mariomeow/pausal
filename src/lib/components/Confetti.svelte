<script lang="ts">
	import confetti from "canvas-confetti"
	import { onMount } from "svelte"
	import { setLastConfettiKey, getLastConfettiKey } from "$lib/scripts/localStorage.svelte"
	import { SvelteDate } from "svelte/reactivity"

	const myDate: SvelteDate = new SvelteDate()

	onMount(() => {
		const lastConfettiKey: string | null = getLastConfettiKey()

		if (!lastConfettiKey || lastConfettiKey != `${myDate.getMonth()}/${myDate.getFullYear()}`) {
			confetti({
				particleCount: 100,
				spread: 140,
				origin: { y: -0.2, x: 0.5 },
				angle: -90,
				startVelocity: 40
			})

			setLastConfettiKey(`${myDate.getMonth()}/${myDate.getFullYear()}`)
		}
	})
</script>
