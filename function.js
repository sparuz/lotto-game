const { Schedina } = require("./src/lottoGame/schedina")
const { Extraction } = require("./src/lottoGame/extraction")
const { CheckWin } = require("./src/lottoGame/checkwin")

// // const extr = new Extraction()

// // console.log(extr.randomExtraction())


// const schedina = new Schedina
//     (
//         10,
//         ["tutte"],
//         ["Ambo", "Quaterna"],
//         2
//     )
// console.log(schedina)
// console.log(schedina.displaySchedina())
// // let extractions = {}

let obj = {}

const schedina = new Schedina(10, ["bari"], ["ambata","ambo"], 2, 1)
const extraction1 = new Extraction()
const checkWin = new CheckWin(schedina,extraction1)

console.log(schedina)
console.log(extraction1)
console.log(checkWin.price)


// obj = extraction1

// console.log(obj)
// console.log(obj.extraction)
// // console.log(extraction1)


// let combination = {
//     bari:{
//         ambata: 5,
//         ambo: 10,
//         terno: 10,
//         quaterna: 5,
//         cinquina: 1
//     },
// }

// console.log(extraction.displayExtraction())
// // console.log(Object.hasOwn(extractions, "extraction"))

// const newCheck = new CheckWin(schedina, extraction)

// const obj = {prova:2,prova:3,ciao:"ciao1"}
// const {ciao,prova,prova2,prova3} = obj
// console.log(ciao)



