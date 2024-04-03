const { CheckWin } = require("../lottoGame/checkwin")
const { Extraction } = require("../lottoGame/extraction")
const { Schedina } = require("../lottoGame/schedina")

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


module.exports = (cw)