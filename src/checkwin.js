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

module.exports = {CheckWin}