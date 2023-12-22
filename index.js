const {Schedina} = require("./src/schedina")
const {Extraction} = require("./src/extraction")
const {CheckWin}  = require("./src/checkwin")

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

const extraction1 = new Extraction()



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


createSchedina(schedine)
console.log(extraction1.randomExtraction())