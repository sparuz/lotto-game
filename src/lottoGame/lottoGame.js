const prompt = require("prompt-sync")()
const { Schedina } = require("./schedina")
const { Extraction } = require("./extraction")
const { CheckWin } = require("./checkwin")
const { schedineData } = require("../data/schedinaData")
const { cw } = require("../data/fakeExtractionData")

let ruote = []

class Lottogame {

    constructor() {
        this.schedineGiocate = []
        this.ruote = {
            1: "bari",
            2: "cagliari",
            3: "firenze",
            4: "genova",
            5: "milano",
            6: "napoli",
            7: "palermo",
            8: "roma",
            9: "torino",
            10: "venezia",
            11: "tutte"
        }
        this.combination = {
            1: "ambata",
            2: "ambo",
            3: "terno",
            4: "quaterna",
            5: "cinquina"
        }
        this.extractions = {}
        this.game = 0
    }

    addNewTicket() {
        if (this.schedineGiocate.length <= 5) {
            const numberToPlay = parseInt(prompt("\x1b[33mHow many number you want to play? min 1 max 10: "))

            //Choose Ruote
            for (let [key, ruota] of Object.entries(this.ruote)) {
                console.log(`${key}. ${ruota}`)
            }
            const ruoteToPlay = prompt("\x1b[33mInsert number of ruota you wanna play, each separate by comma: ").split(",")
            let ruoteArray = []
            if (!ruoteToPlay.includes("11")) {
                ruoteToPlay.every((value) => ruoteArray.push(this.ruote[parseInt(value)]))
            } else {
                ruoteArray = Object.values(this.ruote).slice(0, -1)
            }

            //Choose Combination
            for (let [key, combination] of Object.entries(this.combination)) {
                console.log(`${key}. ${combination}`)
            }
            const combinationToPlay = prompt("\x1b[33mInsert the combination you wanna play, each separate by comma: ").split(",")
            const combinationArray = []
            combinationToPlay.every((value) => combinationArray.push(this.combination[parseInt(value)]))

            //Amount
            const amountToPlay = prompt("\x1b[33mInsert an amount you wanna play: ")

            //Create New Ticket
            const nTicket = new Schedina(numberToPlay, ruoteArray, combinationArray, amountToPlay, this.game)
            this.schedineGiocate.push(nTicket)
            console.log(`\x1b[32mTicket added`)
            this.game += 1
        } else {
            console.log("\x1b[31mToo many schedine played, you can play max 5 schedine each game")
        }
    }

    printTicket = () => {
        if (this.schedineGiocate.length > 0) {
            for (let i = 0; i < this.schedineGiocate.length; i++) {
                console.log(`\u001b[38;2;253;182;0m${this.schedineGiocate[i].displaySchedina(i + 1)}`)
            }
        } else {
            console.log(`\x1b[31mYou need to add ticket before print`)
        }

    }

    extractNumbers = () => {
        if (this.schedineGiocate.length > 0) {
            if (!Object.hasOwn(this.extractions, "extraction")) {
                const newExtraction = new Extraction()
                this.extractions = newExtraction
                console.log(`\x1b[34m${newExtraction.displayExtraction()}`)
            } else {
                const displayAgain = prompt(`\x1b[31mYou have already an extraction, clear before generate a new extraction. Would you like to display the current extraction again? y or n `)
                if (displayAgain === "y") {
                    console.log(`\x1b[34m${this.extractions.displayExtraction()}`)
                } else {
                    console.log(`\x1b[31mYou have already an extraction, clear before generate a new extraction.`)
                }
            }
        } else {
            console.log(`\x1b[31mYou need to add ticket before extract numbers`)
        }
    }

    checkWinning = () => {
        if (this.schedineGiocate.length > 0) {
            if (Object.hasOwn(this.extractions, "extraction")) {
                for (let schedina of this.schedineGiocate) {
                    const newCheck = new CheckWin(schedina, this.extractions)
                    newCheck.checkPriceWin(schedina)
                }
            } else {
                console.log(`\x1b[31mYou need to generate extraction before`)
            }
        } else {
            console.log(`\x1b[31mYou need to add ticket before`)
        }
    }

    clearAll = () => {
        console.log(`1. Clear all Tickets and Extraction`)
        const choose = prompt("Choose your option: ")
        switch (choose) {
            case "1":
                this.schedineGiocate = []
                this.extractions = {}
                console.log(`\x1b[32mTickets and Extraction cleared, add new tickets and generate new extraction to play again`)
        }
    }



}

module.exports = { Lottogame }