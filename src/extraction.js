class Extraction {
    constructor() {
        this.ruote = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", "tutte"]
        this.extraction = this.randomExtraction()
    }

    randomExtraction() {
        const numSorted = {}
        this.ruote.every(ruota => numSorted[ruota] = this.generateNumber())
        return numSorted
    }

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

    displayExtraction() {
        let line = ""
        const divider = "+==========================================================+"
        const title = `LOTTO Extraction`
        const space = " "
        const keys = Object.keys(this.extraction)
        line += divider + "\n|" + space.repeat((58 - title.length) / 2) + title + space.repeat((58 - title.length) / 2) + "|\n"
        for (let key of keys) {
            line += divider + "\n|" + key + space.repeat(58 - this.extraction[key].join(" - ").length - key.length) + this.extraction[key].join(" - ") + "|\n"
        }
        return line + divider + "\n"
    }
}

module.exports = {Extraction}