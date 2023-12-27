const prompt = require("prompt-sync")()
const { Schedina } = require("./src/classes/schedina")
const { Extraction } = require("./src/classes/extraction")
const { CheckWin } = require("./src/classes/checkwin")
const { schedineData } = require("./src/data/schedinaData")
const { cw } = require("./src/data/fakeExtractionData")

// const createSchedina = (schedine) => {

//     const keys = Object.keys(schedine)
//     if (keys.length <= 5 && keys.length >= 1) {
//         for (let schedina in schedine) {
//             console.log(schedine[schedina].displaySchedina(schedina) + "\n")
//         }
//     } else {
//         console.log(`You can generate min 1 Schedina and max 5 Schedine`)
//     }

// }

const ruote = ["Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", "tutte"]
const combination = ["Ambo", "Ambetto", "Terno", "Quaterna", "Cinquina"]

let schedineGiocate = []
let extractions = {}

const checkValue = (arrayToCheck, originalArray) => {
    const check = arrayToCheck.every((value) => originalArray.map((originalValue) => originalValue.toLowerCase()).includes(value))
    return check
}


const addNewTicket = () => {
    if (schedineGiocate.length <= 5) {
        let another = "y"
        while (schedineGiocate.length <= 5 && another != "n") {
            const numberToPlay = parseInt(prompt("\x1b[33mHow many number you want to play? min 1 max 10: "))
            const ruoteToPlay = prompt("\x1b[33mInsert the ruote you wanna play, each separate by comma: ").split(",")
            const combinationToPlay = prompt("\x1b[33mInsert the combination you wanna play, each separate by comma: ").split(",")
            const amountToPlay = prompt("\x1b[33mInsert an amount you wanna play: ")
            if (numberToPlay <= 10 && numberToPlay >= 1){
                if (checkValue(ruoteToPlay, ruote) && checkValue(combinationToPlay, combination)) {
                    const nTicket = new Schedina(numberToPlay, ruoteToPlay, combinationToPlay, amountToPlay)
                    schedineGiocate.push(nTicket)
                    console.log(`\x1b[32mTicket added`)
                    another = prompt("\x1b[33mDo you want to play another? y or n ")
                } else {
                    console.log("\x1b[31mInsert a valid Ruota or Combination")
                    another = prompt("\x1b[33mDo you want to play another? y or n ")
                }
    
            } else{
                console.log("\x1b[31mYou can't play with more then 10 numbers and less then 1 numbers")
            }
            
        }

        if (another === "n") {
            mainMenu()
        }
    } else {
        console.log("\x1b[31mToo many schedine played, you can play max 5 schedine each game")
    }
}

const printTicket = () => {
    if (schedineGiocate.length > 0) {
        for (let i = 0; i < schedineGiocate.length; i++) {
            console.log(`\u001b[38;2;253;182;0m${schedineGiocate[i].displaySchedina(i + 1)}`)
        }
    } else {
        console.log(`\x1b[31mYou need to add ticket before print`)
    }

}

const extractNumbers = () => {
    if (schedineGiocate.length > 0) {
        if (!Object.hasOwn(extractions, "extraction")) {
            const newExtraction = new Extraction()
            extractions = newExtraction
            console.log(`\x1b[34m${extractions.displayExtraction()}`)
        } else {
            const displayAgain = prompt(`\x1b[31mYou have already an extraction, clear before generate a new extraction. Would you like to display the current extraction again? y or n `)
            if (displayAgain === "y"){
                console.log(`\x1b[34m${extractions.displayExtraction()}`)
            }else{
                console.log(`\x1b[31mYou have already an extraction, clear before generate a new extraction.`)
            }
        }
    } else {
        console.log(`\x1b[31mYou need to add ticket before extract numbers`)
    }
}

const checkWinning = () => {
    if (schedineGiocate.length > 0) {
        if (Object.hasOwn(extractions, "extraction")) {

            for (let schedina of schedineGiocate) {
                const newCheck = new CheckWin(schedina, extractions)
                newCheck.checkPriceWin()
            }
        } else {
            console.log(`\x1b[31mYou need to generate extraction before`)
        }
    } else {
        console.log(`\x1b[31mYou need to add ticket before`)
    }
}

const clearAll = () => {
    console.log(`1. Clear all Tickets and Extraction
2. Return to Main Menu`)
    const choose = prompt("Choose your option: ")
    switch (choose) {
        case "1":
            schedineGiocate = []
            extractions = {}
            console.log(`\x1b[32mTickets and Extraction cleared, add new tickets and generate new extraction to play again`)
            mainMenu()
        case "2":
            mainMenu()
    }
}

const mainMenu = () => {
    console.log(`\x1b[33m1. Add a new ticket
2. Print tickets
3. Extract and Display Extraction
4. Check for winning tickets and print them
5. Clear all tickets and extractions
0. Exit`)
    const choose = prompt("Choose your option: ")
    switch (choose) {
        case "1":
            addNewTicket()
            mainMenu()
        case "2":
            printTicket()
            mainMenu()
        case "3":
            extractNumbers()
            mainMenu()
        case "4":
            checkWinning()
            mainMenu()
        case "5":
            clearAll()
        case "0":
            process.exit()
    }
}

mainMenu()





