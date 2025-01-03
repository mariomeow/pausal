<script lang="ts">
	import { setPausalOption, pausalInfo } from "$lib/scripts/localStorage.svelte"
	import toast from "svelte-french-toast"
	import { screen } from "$lib/scripts/localStorage.svelte"

	let { option }: { option: "poslodavac" | "komorski_doprinos" | "turisticke_zajednice" } = $props()

	let switchCircleElement: HTMLDivElement | undefined = $state(undefined)
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="switch"
	onclick={() => {
		setPausalOption(option, !pausalInfo[option])

		toast.success("Uspješno ste primjenili postavke", {
			position: screen.isMobile ? "top-right" : "bottom-center",
			className: "toast-css"
		})

		switchCircleElement!.classList.toggle("switch-clicked")
		switchCircleElement!.style.animation = "none"
		void switchCircleElement?.offsetWidth
		switchCircleElement!.style.animation = "pulse-animation 1s 1"
	}}
	class:switch-background={pausalInfo[option]}
>
	<div
		class="switch-circle"
		bind:this={switchCircleElement}
		class:switch-clicked={pausalInfo[option]}
	></div>
</div>
