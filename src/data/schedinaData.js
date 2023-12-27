const {Schedina} = require("../classes/schedina")

const schedineData =
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

module.exports = {schedineData}