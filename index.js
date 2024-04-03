const prompt = require("prompt-sync")()
const { Lottogame} = require("./src/lottoGame/lottoGame")

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
            lottogame.addNewTicket()
            mainMenu()
        case "2":
            lottogame.printTicket()
            mainMenu()
        case "3":
            lottogame.extractNumbers()
            mainMenu()
        case "4":
            lottogame.checkWinning()
            mainMenu()
        case "5":
            lottogame.clearAll()
            mainMenu()
        case "0":
            process.exit()
    }
}
const lottogame = new Lottogame()
mainMenu()





