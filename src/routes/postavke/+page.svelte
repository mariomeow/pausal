<script lang="ts">
	import Note from "$lib/components/NoteLeft.svelte"
	import Icon from "@iconify/svelte"
	import Razredi from "$lib/razredi.json"
	import { pausalInfo, setTaxBracket } from "$lib/scripts/localStorage.svelte"
	import Switch from "$lib/components/Switch.svelte"
	import toast from "svelte-french-toast"
</script>

<Note />
<div class="postavke">
	<div class="card-group">
		<div class="postavka">
			<h1><Icon icon="material-symbols:money-bag" /> Porezni razred</h1>
			<select
				bind:value={pausalInfo.tax}
				onchange={() => {
					setTaxBracket(pausalInfo.tax)
					toast.success("Uspješno ste promijenili porezni razred", {
						position: "bottom-center",
						style: "background-color: #333; color: white;"
					})
				}}
			>
				{#each Object.entries(Razredi) as item}
					<option value={item[0]}
						>{item[1].title} ({item[1].start} - {item[1].end} {item[1].currency})</option
					>
				{/each}
			</select>
		</div>
		<div class="postavka">
			<div class="postavka-header">
				<h1><Icon icon="material-symbols:work" /> Radim kod drugog poslodavca</h1>
				<Switch option="poslodavac" />
			</div>
			<div class="postavka-content">
				<p>
					Ukoliko uz paušalni obrt radite kod drugog poslodavca tada plaćate doprinose po osnovi
					druge djelatnosti. Porezna uprava po isteku godine će Vam poslati rješenje o visini
					doprinosa koje se temelji na ostvarenim primitcima u protekloj godini, što se može vidjeti
					iz PO-SD obrasca. Godišnja obveza doprinosa dospijeva na naplatu u roku propisanom na
					rješenju Porezne uprave.
				</p>
				<a
					target="_blank"
					href="https://plaviured.hr/vodici/placa-doprinose-pausalni-obrtnik-radi-kod-drugog-poslodavca/"
					>Saznaj više (plaviured.hr)</a
				>
			</div>
		</div>
		<div class="postavka">
			<div class="postavka-header">
				<h1><Icon icon="mdi:donation" /> Prikaži komorski doprinos</h1>
				<Switch option="komorski_doprinos" />
			</div>
			<div class="postavka-content">
				<p>
					Ukoliko je Vaš obrt registriran nakon 1. siječnja 2021. godine tada ne plaćate komorski
					doprinos za prve dvije godine obrta
				</p>
				<a
					target="_blank"
					href="https://plaviured.hr/vodici/komorski-doprinos-placaju-li-ga-pausalisti"
					>Saznaj više (plaviured.hr)</a
				>
			</div>
		</div>
		<div class="postavka">
			<div class="postavka-header">
				<h1><Icon icon="mdi:donation" /> Prikaži članarinu turističkim zajednicama</h1>
				<Switch option="turisticke_zajednice" />
			</div>
			<div class="postavka-content">
				<p>
					Ukoliko se bavite djelatnostima turizma, ugostiteljstva, prijevoza, izdavaštva, osiguranja
					ili sportskim djelatnostima - obveznik ste plaćanja članarine turističkim zajednicama
				</p>
				<a
					target="_blank"
					href="https://plaviured.hr/vodici/placaju-li-pausalisti-clanarinu-turistickim-zajednicama"
					>Saznaj više (plaviured.hr)</a
				>
			</div>
		</div>
	</div>
</div>
