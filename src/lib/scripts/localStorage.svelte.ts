import { SvelteDate, SvelteMap } from "svelte/reactivity"
import type { databaseType } from "$lib/types"

function parseDate(dateString: string) {
    const [month, year] = dateString.split("/")
    return new Date(+year, +month).getTime()
}

function sortMap(map: databaseType): databaseType {
    return new SvelteMap([...map].sort(([keyA], [keyB]) => parseDate(keyB) - parseDate(keyA)))
}

export function setLastConfettiKey(key: string) {
    localStorage.setItem("pausalConfetti", key)
}

export function getLastConfettiKey() {
    return localStorage.getItem("pausalConfetti")!
}

function getDatabaseMap(): databaseType {
    const database = localStorage.getItem("pausal")
    const myDate = new SvelteDate()

    if (!localStorage.getItem("pausalTaxBracket")) setTaxBracket("prvi")

    if (!database) {
        const databaseMap = new SvelteMap() as databaseType

        databaseMap.set(`${myDate.getMonth()}/${myDate.getFullYear()}`, { ozs: false, mo: false, mozsntiks: false, ppnd: false })

        localStorage.setItem("pausal", JSON.stringify(Array.from(databaseMap)))

        return databaseMap
    }

    let databaseMap = new SvelteMap(JSON.parse(database)) as databaseType

    if (!databaseMap.has(`${myDate.getMonth()}/${myDate.getFullYear()}`)) {
        databaseMap.set(`${myDate.getMonth()}/${myDate.getFullYear()}`, { ozs: false, mo: false, mozsntiks: false, ppnd: false })
        databaseMap = sortMap(databaseMap)
        localStorage.setItem("pausal", JSON.stringify(Array.from(databaseMap)))
    }

    return databaseMap
}

function setTaxBracket(title: "prvi" | "drugi" | "treci" | "cetvrti" | "peti") {
    localStorage.setItem("pausalTaxBracket", title)

    pausalInfo.tax = title
}

function getTaxBracket() {
    return localStorage.getItem("pausalTaxBracket") as "prvi" | "drugi" | "treci" | "cetvrti" | "peti"
}

export function updateEntry(key: string, field: "ozs" | "mo" | "mozsntiks" | "ppnd") {
    const databaseEntry = database.map.get(key)!

    database.map.set(key, { ozs: databaseEntry.ozs, mo: databaseEntry.mo, mozsntiks: databaseEntry.mozsntiks, ppnd: databaseEntry.ppnd, [field]: !databaseEntry[field] })

    localStorage.setItem("pausal", JSON.stringify(Array.from(database.map)))
}

export const database = $state({ map: getDatabaseMap() })
export const pausalInfo = $state({ tax: getTaxBracket() })