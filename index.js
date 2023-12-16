/*

Ambo = 2 numeri estratti
Ambetto = estratto uno dei numeri giocati più il precedente o successivo dell'altro numero.
Terno = 3 numeri estratti
Quaterna = 4 numeri estratti
Cinquina = 5 numeri estratti

Possibilita di numeri da giocare da 1 a massimo 10

Ruote = Bari, Cagliari, Firenze, Genova, Milano, Napoli, Palermo, Roma, Torino, Venezia e tutte

Massimo numero di schedine giocabili min: 1, max: 5, 0: exit

+==========================================================+
|                   LOTTO GAME TICKET #2                   |
+==========================================================+
|                         Venezia                          |
+==========================================================+
|                         Cinquina                         |
+==========================================================+
|      17 - 6 - 13 - 70 - 42 - 37 - 64 - 35 - 22 - 44      |
+==========================================================+

*/

class Schedina {
    constructor(numbers, ruotaArray, typeArray) {
        if (Array.isArray(ruotaArray)) {
            const ruote = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", "tutte"]
            const arrayIncludes = ruotaArray.every(ruota => ruote.map(curr => curr.toLowerCase()).includes(ruota.toLowerCase()))
            if (arrayIncludes) {
                this.ruota = ruotaArray
            }else{
                this.ruota = []
            }
        }
        this.type = typeArray
        this.numbers = numbers
        this.numbersSort = this.generateNumbers()
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

const schedine =
{
    1: new Schedina
        (
            10,
            ["Cagliari", "Firenze", "Genova"],
            ["Ambo", "Quaterna"]
        ),
    2: new Schedina
        (
            5,
            ["Bari", "Cagliari"],
            ["Terno", "Quaterna", "Cinquina"]
        ),
    3: new Schedina
        (
            2,
            ["Milano", "Napoli", "Palermo", "Roma"],
            ["Terno", "Quaterna"]
        ),
    4: new Schedina
        (
            3,
            ["Roma", "Torino", "Venezia"],
            ["Ambo", "Ambetto"]
        ),
    5: new Schedina
        (
            7,
            ["Tutte"],
            ["Quaterna", "Cinquina"]
        ),
}


const createSchedina = (schedine) => {

    const keys = Object.keys(schedine)
    if (keys.length <= 5 && keys.length >= 1) {
        for (let schedina in schedine) {
            console.log(schedine[schedina].displaySchedina(schedina) + "\n")
        }
    } else {
        console.log(`You can generate min 1 Schedina and max 5 Schedine`)
    }

}
