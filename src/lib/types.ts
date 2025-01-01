import type { SvelteMap } from "svelte/reactivity"

export type databaseType = SvelteMap<
	string,
	{ ozs: boolean; mo: boolean; mozsntiks: boolean; ppnd: false; kd: false }
>
export type doprinosType = {
	opis: string
	ikona: string
	kategorija: string
	kratica: "ozs" | "mo" | "mozsntiks" | "ppnd" | "kd"
	krajnjiDatum?: number
	trosak?: number
}

export type monthDataType = {
	ozs: boolean
	mo: boolean
	mozsntiks: boolean
	ppnd: boolean
	kd: boolean
}
