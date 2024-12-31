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

    if (!localStorage.getItem("pausalPoslodavac")) setPausalOption("poslodavac", false)
    if (!localStorage.getItem("pausalKomorskiDoprinos")) setPausalOption("komorski_doprinos", false)
    if (!localStorage.getItem("pausalTuristickeZajednice")) setPausalOption("turisticke_zajednice", false)

    if (!database) {
        const databaseMap = new SvelteMap() as databaseType

        databaseMap.set(`${myDate.getMonth()}/${myDate.getFullYear()}`, { ozs: false, mo: false, mozsntiks: false, ppnd: false, kd: false })

        localStorage.setItem("pausal", JSON.stringify(Array.from(databaseMap)))

        return databaseMap
    }

    let databaseMap = new SvelteMap(JSON.parse(database)) as databaseType

    if (!databaseMap.has(`${myDate.getMonth()}/${myDate.getFullYear()}`)) {
        databaseMap.set(`${myDate.getMonth()}/${myDate.getFullYear()}`, { ozs: false, mo: false, mozsntiks: false, ppnd: false, kd: false })
        databaseMap = sortMap(databaseMap)
        localStorage.setItem("pausal", JSON.stringify(Array.from(databaseMap)))
    }

    return databaseMap
}

export function setPausalOption(option: "poslodavac" | "komorski_doprinos" | "turisticke_zajednice", value: boolean) {
    if (option == "poslodavac") {
        localStorage.setItem("pausalPoslodavac", JSON.stringify(value))
        pausalInfo.poslodavac = value
    }

    if (option == "komorski_doprinos") {
        localStorage.setItem("pausalKomorskiDoprinos", JSON.stringify(value))
        pausalInfo.komorski_doprinos = value
    }

    if (option == "turisticke_zajednice") {
        localStorage.setItem("pausalTuristickeZajednice", JSON.stringify(value))
        pausalInfo.turisticke_zajednice = value
    }
}

function getPausalOption(option: "poslodavac" | "komorski_doprinos" | "turisticke_zajednice") {
    if (option == "poslodavac") return JSON.parse(localStorage.getItem("pausalPoslodavac")!)
    if (option == "komorski_doprinos") return JSON.parse(localStorage.getItem("pausalKomorskiDoprinos")!)
    if (option == "turisticke_zajednice") return JSON.parse(localStorage.getItem("pausalTuristickeZajednice")!)
}

export function setTaxBracket(title: "prvi" | "drugi" | "treci" | "cetvrti" | "peti") {
    localStorage.setItem("pausalTaxBracket", title)

    pausalInfo.tax = title
}

function getTaxBracket() {
    return localStorage.getItem("pausalTaxBracket") as "prvi" | "drugi" | "treci" | "cetvrti" | "peti"
}

export function updateEntry(key: string, field: "ozs" | "mo" | "mozsntiks" | "ppnd" | "kd") {
    const databaseEntry = database.map.get(key)!

    database.map.set(key, { ozs: databaseEntry.ozs, mo: databaseEntry.mo, mozsntiks: databaseEntry.mozsntiks, ppnd: databaseEntry.ppnd, kd: databaseEntry.kd, [field]: !databaseEntry[field] })

    localStorage.setItem("pausal", JSON.stringify(Array.from(database.map)))
}

export const pausalInfo = $state({ tax: getTaxBracket(), poslodavac: getPausalOption("poslodavac"), komorski_doprinos: getPausalOption("komorski_doprinos"), turisticke_zajednice: getPausalOption("turisticke_zajednice") })
export const database = $state({ map: getDatabaseMap() })