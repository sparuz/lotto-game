class Schedina {
    constructor(numbers, ruotaArray, typeArray, amount) {
        if (Array.isArray(ruotaArray)) {
            const ruote = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", "tutte"]
            const arrayIncludes = ruotaArray.every(ruota => ruote.map(curr => curr.toLowerCase()).includes(ruota.toLowerCase()))
            if (arrayIncludes) {
                this.ruota = ruotaArray
            } else {
                this.ruota = []
            }
        }
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
        // this.numbersSort = this.generateNumbers()
        // this.numbersSort = [46, 90, 77, 58, 52]
        this.numbersSort = [46, 90]
    }

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

    displaySchedina(name = " ") {

        let line = ""
        if (this.numbersSort.length >= 1 && this.numbersSort.length <= 10) {
            const divider = "+==========================================================+"
            const title = `LOTTO GAME TICKET #${name}`
            const space = " "
            line += divider + "\n|" + space.repeat(19) + title + space.repeat(19) + "|\n"

            const lengthRuote = this.ruota.join(" ").length
            line += divider + "\n|" + space.repeat(Math.floor((58 - lengthRuote) / 2)) + this.ruota.join(" ") + space.repeat(Math.ceil((58 - lengthRuote) / 2)) + "|\n"
            const lengthType = this.type.join(" ").length
            line += divider + "\n|" + space.repeat(Math.floor((58 - lengthType) / 2)) + this.type.join(" ") + space.repeat(Math.ceil((58 - lengthType) / 2)) + "|\n"
            const numbers = this.numbersSort
            const lengthNumbers = numbers.join("-").length
            line += divider + "\n|" + space.repeat(Math.floor((58 - lengthNumbers) / 2)) + numbers.join(" ") + space.repeat(Math.ceil((58 - lengthNumbers) / 2)) + "|\n"
            line += divider
        } else {
            line += `You can't play with ${this.numbers} numbers`
        }

        return line

    }

}

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

class CheckWin {
    constructor(schedina, estrazione) {
        if (typeof schedina === 'object') {
            this.schedina = schedina
        } else {
            this.schedina = 'Need an object as Schedina'
        }
        if (typeof estrazione === 'object') {
            this.estrazione = estrazione
        } else {
            this.estrazione = 'Need an object as Estrazione'
        }
        this.price = {
            1: {
                ambata: 11.23
            },
            2: {
                ambata: 5.61,
                ambo: 250
            },
            3: {
                ambata: 3.74,
                ambo: 83.33,
                terno: 4500,
            },
            4: {
                ambata: 2.80,
                ambo: 41.66,
                terno: 1125,
                quaterna: 120000,
            },
            5: {
                ambata: 2.24,
                ambo: 25,
                terno: 450,
                quaterna: 24000,
                cinquina: 6000000
            },
            6: {
                ambata: 1.87,
                ambo: 16.66,
                terno: 225,
                quaterna: 8000,
                cinquina: 1000000
            },
            7: {
                ambata: 1.60,
                ambo: 11.90,
                terno: 128.57,
                quaterna: 3428.57,
                cinquina: 285714.28
            },
            8: {
                ambata: 1.40,
                ambo: 8.92,
                terno: 80.35,
                quaterna: 1714.28,
                cinquina: 107142.85
            },
            9: {
                ambata: 1.24,
                ambo: 6.94,
                terno: 53.57,
                quaterna: 952.38,
                cinquina: 47619.04
            },
            10: {
                ambata: 1.12,
                ambo: 5.55,
                terno: 37.50,
                quaterna: 571.42,
                cinquina: 23809.52
            }
        }
        this.playCombination = {
            1: {
                ambata: 1
            },
            2: {
                ambata: 2,
                ambo: 1
            },
            3: {
                ambata: 3,
                ambo: 3,
                terno: 1,
            },
            4: {
                ambata: 4,
                ambo: 6,
                terno: 4,
                quaterna: 1,
            },
            5: {
                ambata: 5,
                ambo: 10,
                terno: 10,
                quaterna: 5,
                cinquina: 1
            },
            6: {
                ambata: 6,
                ambo: 15,
                terno: 20,
                quaterna: 15,
                cinquina: 6
            },
            7: {
                ambata: 7,
                ambo: 21,
                terno: 35,
                quaterna: 35,
                cinquina: 21
            },
            8: {
                ambata: 8,
                ambo: 28,
                terno: 56,
                quaterna: 70,
                cinquina: 56
            },
            9: {
                ambata: 9,
                ambo: 36,
                terno: 84,
                quaterna: 126,
                cinquina: 126
            },
            10: {
                ambata: 10,
                ambo: 45,
                terno: 120,
                quaterna: 210,
                cinquina: 252
            }
        }
    }

    checkNumberRuote() {
        let count = 0
        let combination = {}
        const ruote = this.schedina.ruota
        for (let ruota of ruote) {
            const currNumberRuota = this.estrazione[ruota]
            for (let number of this.schedina.numbersSort) {
                if (currNumberRuota.includes(number)) {
                    count += 1
                }
            }
            if (count === 5) {
                combination[ruota] = this.playCombination[count]
            } else if (count === 4) {
                combination[ruota] = this.playCombination[count]
            } else if (count === 3) {
                combination[ruota] = this.playCombination[count]
            } else if (count === 2) {
                combination[ruota] = this.playCombination[count]
            } else {
                combination[ruota] = this.playCombination[count]
            }
            count = 0

        }
        return combination
    }

    getPossibility() {
        const calcPrice = {}
        const numberRuote = this.checkNumberRuote()
        for (let ruota in numberRuote) {
            for (let combination of this.schedina.type) {
                if (numberRuote[ruota][combination] !== undefined) {
                    if (calcPrice[combination] === undefined) {
                        calcPrice[combination] = 0;
                    }
                    calcPrice[combination] += numberRuote[ruota][combination];
                }
            }
        }
        return calcPrice
    }

    checkCombination() {
        const sumGros = []
        const possibility = this.getPossibility()
        const keys = Object.keys(possibility)
        for (let key of keys) {
            if (this.schedina.type.includes(key)) {
                // console.log(this.schedina.amount * this.price)
                let total = (this.price[this.schedina.numbers][key] * this.schedina.amount * possibility[key])
                sumGros.push(total)
            }
        }
        let sum = sumGros.reduce((acc,curr) => acc + curr, 0)
        if (sum > 499.99){
            sum -= sum*0.08
            return `You have Win ${sum.toFixed(2)}€ netto`
        } else if (sum < 500 && sum > 0){
            return `You have Win ${sum.toFixed(2)}€`
        } else{
            return `Hai perso`
        }
        
        
    }



}


module.exports = {
    Schedina,
    Extraction,
    CheckWin
}



const schedina = new Schedina(10, ["Cagliari"], ["ambo", "quaterna", "terno"], 2)


const cw = new CheckWin
    (
        schedina,
        {
            Bari: [2, 31, 79, 9, 77],
            Cagliari: [46, 90, 77, 58, 65],
            Firenze: [69, 10, 11, 28, 50],
            Genova: [46, 90, 51, 52, 23],
            Milano: [25, 82, 56, 42, 4],
            Napoli: [55, 62, 72, 25, 70],
            Palermo: [61, 11, 88, 53, 47],
            Roma: [2, 74, 53, 81, 22],
            Torino: [81, 56, 51, 82, 54],
            Venezia: [50, 56, 10, 46, 6],
            tutte: [32, 22, 65, 51, 61]
        }
    )


// console.log(cw.getPossibility())
console.log(cw.checkCombination())
