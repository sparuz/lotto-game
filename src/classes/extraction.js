class Extraction {
    constructor() {
        this.ruote = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia"]
        this.extraction = this.randomExtraction()
    }

    /**
     * 
     * @returns {object} - All the extraction with 5 five numbers each Ruota, the number are random 1 to 90 inclusive
     */
    randomExtraction() {
        const numSorted = {}
        this.ruote.every(ruota => numSorted[ruota.toLowerCase()] = this.generateNumber())
        return numSorted
    }

    /**
     * 
     * @returns {number[]} - Generate 5 random number 1 to 90 inclusive
     */
    generateNumber() {
        const numSort = []
        while (numSort.length < 5) {
            const min = Math.ceil(1);
            const max = Math.floor(90);
            const number = Math.floor(Math.random() * (max - min + 1) + min)
            if (!numSort.includes(number)) {
                numSort.push(number)
            }
        }
        return numSort
    }

    /**
     * Display Schedina with ascii format
     *
     * @returns {string} - Display the extraction with ascii format
     */
    displayExtraction() {
        let line = ""
        const divider = "+==========================================================+"
        const title = `LOTTO Extraction`
        const space = " "
        const keys = Object.keys(this.extraction)
        line += divider + "\n|" + space.repeat((58 - title.length) / 2) + title + space.repeat((58 - title.length) / 2) + "|\n"
        for (let key of keys) {
            line += divider + "\n|" + key.charAt(0).toUpperCase() + key.slice(1) + space.repeat(58 - this.extraction[key].join(" - ").length - key.length) + this.extraction[key].join(" - ") + "|\n"
        }
        return line + divider + "\n"
    }
}

module.exports = { Extraction }