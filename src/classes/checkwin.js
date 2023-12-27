const {price} = require("../data/priceData")
const {combination} = require("../data/combinationData")


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
        this.price = price
        this.playCombination = combination
    }
    
    /**
     * Need to have an Object schedina when create checkWin as first params
     * 
     * @returns {object} Return an object with all combination possible each Ruota
     */
    checkNumberRuote() {
        let count = 0
        let combination = {}
        const ruote = this.schedina.ruota
        for (let ruota of ruote) {
            const ruotaToLower = ruota.toLowerCase()
            const currNumberRuota = this.estrazione.extraction[ruotaToLower]
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
            } else if (count === 1){
                combination[ruota] = this.playCombination[count]
            } else{
                combination[ruota] = {}
            }
            count = 0

        }
        return combination
    }

    /**
     * Need to have an Object schedina when create checkWin as first params
     * 
     * @returns {object} - Return an object with the sum of all combinations divided by combination
     */

    getPossibility() {
        const calcPrice = {}
        const numberRuote = this.checkNumberRuote()
        for (let ruota in numberRuote) {
            for (let combination of this.schedina.type) {
                if (numberRuote[ruota][combination.toLowerCase()] !== undefined) {
                    if (calcPrice[combination.toLowerCase()] === undefined) {
                        calcPrice[combination.toLowerCase()] = 0;
                    }
                    calcPrice[combination.toLowerCase()] += numberRuote[ruota][combination.toLowerCase()];
                }
            }
        }
        return calcPrice
    }
    
    /**
     * 
     * Print if you have win or lose
     */

    checkPriceWin() {
        const sumGros = []
        const possibility = this.getPossibility()
        const keys = Object.keys(possibility)
        for (let key of keys) {
            if (this.schedina.type.map((value) => value.toLowerCase()).includes(key)) {
                // console.log(this.schedina.amount * this.price)
                let total = (this.price[this.schedina.numbers][key] * this.schedina.amount * possibility[key])
                sumGros.push(total)
            }
        }
        let sum = sumGros.reduce((acc,curr) => acc + curr, 0)
        if (sum > 499.99){
            sum -= sum*0.08
            console.log(`\x1b[32mYou have Win ${sum.toFixed(2)}€ net`)
        } else if (sum < 500 && sum > 0){
            console.log(`\x1b[32mYou have Win ${sum.toFixed(2)}€`)
        } else{
            console.log(`\x1b[31mYou have Lose`)
        }
        
        
    }



}

module.exports = {CheckWin}