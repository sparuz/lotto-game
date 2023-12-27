class Schedina {
    constructor(numbers, ruotaArray, typeArray, amount) {
        const ruote = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia"]
        // Check if ruotaArray is an array and if the value inside are one of the array ruote
        if (Array.isArray(ruotaArray)) {
            if (ruotaArray.includes("tutte") || ruotaArray.includes("Tutte")) {
                this.ruota = ruote
            } else {
                const arrayIncludes = ruotaArray.every(ruota => ruote.map(curr => curr.toLowerCase()).includes(ruota.toLowerCase()))
                if (arrayIncludes) {
                    this.ruota = ruotaArray
                } else {
                    this.ruota = []
                }
            }
        }

        // Check if typeArray is an array and if the value inside are one of the array combination
        if (Array.isArray(typeArray)) {
            const combination = ["Ambo", "Ambetto", "Terno", "Quaterna", "Cinquina"]
            const arrayComb = typeArray.every(type => combination.map(curr => curr.toLocaleLowerCase()).includes(type.toLowerCase()))
            if (arrayComb) {
                this.type = typeArray
            } else {
                this.type = []
            }
        }

        this.numbers = numbers
        this.amount = amount
        this.numbersSort = this.generateNumbers()
        // this.numbersSort = [46, 90, 77, 58, 52]
        // this.numbersSort = [46, 90]
    }

    /**
     * Generate numbers 1 to 90 inclusive
     * 
     * @returns {number[]}
     */

    generateNumbers() {
        const numSort = []
        if (this.numbers <= 10 && this.numbers >= 1) {
            while (numSort.length < this.numbers) {
                const min = Math.ceil(1);
                const max = Math.floor(90);
                const number = Math.floor(Math.random() * (max - min + 1) + min)
                if (!numSort.includes(number)) {
                    numSort.push(number)
                }
            }
            return numSort
        } else {
            return `You can't play with ${this.numbers} numbers`
        }
    }

    /**
     * Display Schedina with ascii format
     * 
     * @param {string} name 
     * @returns {string} - Display the schedina with ascii format
     */

    displaySchedina(name = " ") {
        const ruote = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia"]
        let line = ""
        if (this.numbersSort.length >= 1 && this.numbersSort.length <= 10) {
            const divider = "+==========================================================+"
            const title = `LOTTO GAME TICKET #${name}`
            const space = " "
            line += divider + "\n|" + space.repeat(19) + title + space.repeat(19) + "|\n"
            if (this.ruota.every((value) => ruote.includes(value))) {
                const lengthRuote = "All Ruote".length
                line += divider + "\n|" + space.repeat(Math.floor((58 - lengthRuote) / 2)) + "All Ruote" + space.repeat(Math.ceil((58 - lengthRuote) / 2)) + "|\n"
            } else {
                const lengthRuote = this.ruota.join(" ").length
                line += divider + "\n|" + space.repeat(Math.floor((58 - lengthRuote) / 2)) + this.ruota.map((ruota) => ruota.charAt(0).toUpperCase() + ruota.slice(1)).join(" ") + space.repeat(Math.ceil((58 - lengthRuote) / 2)) + "|\n"
            }
            const lengthType = this.type.join(" ").length
            line += divider + "\n|" + space.repeat(Math.floor((58 - lengthType) / 2)) + this.type.map((typeValue) => typeValue.charAt(0).toUpperCase() + typeValue.slice(1)).join(" ") + space.repeat(Math.ceil((58 - lengthType) / 2)) + "|\n"
            const numbers = this.numbersSort
            const lengthNumbers = numbers.join("-").length
            line += divider + "\n|" + space.repeat(Math.floor((58 - lengthNumbers) / 2)) + numbers.join(" ") + space.repeat(Math.ceil((58 - lengthNumbers) / 2)) + "|\n"
            line += divider + "\n|" + space.repeat(Math.floor((58 - (`Amount: ${this.amount}€`).length) / 2)) + `Amount: ${this.amount}€` + space.repeat(Math.ceil((58 - (`Amount: ${this.amount}€`).length) / 2)) + "|\n"
            line += divider
        } else {
            line += `You can't play with ${this.numbers} numbers here`
        }

        return line

    }

}

module.exports = { Schedina }