const { Schedina } = require("./src/lottoGame/schedina")
const { Extraction } = require("./src/lottoGame/extraction")
const { CheckWin } = require("./src/lottoGame/checkwin")


test('Array Ruota works?', () => {
    const s1 = new Schedina(
        10,
        ["cagliari", "firenze", "genova"],
        ["ambo", "quaterna"],
        2,
        0
    )
    expect(s1.ruota).toEqual(["cagliari", "firenze", "genova"])
    expect(s1.numbersSort).toHaveLength(10)
    const s2 = new Schedina(
        10,
        ["cagliari", "genova"],
        ["ambo", "quaterna"],
        2,
        0
    )
    expect(s2.ruota).toEqual(["cagliari", "genova"],)

})

describe('Extraction Class', () => {
    let extraction

    beforeEach(() => {
        extraction = new Extraction()
    })

    test('should initialize with 10 ruote', () => {
        expect(extraction.ruote.length).toBe(10)
    })

    test('randomExtraction generates a valid structure', () => {
        const result = extraction.randomExtraction()
        expect(Object.keys(result).length).toBe(10)
        Object.values(result).forEach(numbers => {
            expect(numbers.length).toBe(5)
            numbers.forEach(number => {
                expect(number).toBeGreaterThanOrEqual(1)
                expect(number).toBeLessThanOrEqual(90)
            })
            expect(new Set(numbers).size).toBe(numbers.length)
        })
    })

    test('generateNumber returns an array of 5 unique numbers', () => {
        const numbers = extraction.generateNumber()
        expect(numbers.length).toBe(5)
        expect(new Set(numbers).size).toBe(5)
        numbers.forEach(number => {
            expect(number).toBeGreaterThanOrEqual(1)
            expect(number).toBeLessThanOrEqual(90)
        })
    })

    test('displayExtraction returns a string', () => {
        const display = extraction.displayExtraction()
        expect(typeof display).toBe('string')
    })

    test('displayExtraction includes all ruote names', () => {
        const display = extraction.displayExtraction()
        extraction.ruote.forEach(ruota => {
            expect(display.toLowerCase()).toContain(ruota.toLowerCase())
        })
    })


    test('displayExtraction includes numbers of extraction', () => {
        const display = extraction.displayExtraction()
        Object.entries(extraction.extraction).forEach(([ruota, numbers]) => {
            numbers.forEach(number => {
                expect(display).toContain(number.toString())
            })
        })
    })
})
describe('Schedina Class', () => {

    test('should initialize correctly with provided parameters', () => {
        const numbers = 5
        const ruotaArray = ["Bari", "Cagliari"]
        const typeArray = ["ambo", "terno"]
        const amount = 10
        const id = 1

        const schedina = new Schedina(numbers, ruotaArray, typeArray, amount, id)

        expect(schedina.numbers).toBe(numbers)
        expect(schedina.ruota).toEqual(ruotaArray)
        expect(schedina.type).toEqual(typeArray)
        expect(schedina.amount).toBe(amount)
        expect(schedina.id).toBe(id)
    })

    test('generateNumbers returns an array of unique numbers within the specified range', () => {
        const schedina = new Schedina(5, ["Bari"], ["ambo"], 10, 1)
        const numbersSort = schedina.generateNumbers()

        expect(numbersSort.length).toBe(5)
        expect(new Set(numbersSort).size).toBe(5)
        numbersSort.forEach(number => {
            expect(number).toBeGreaterThanOrEqual(1)
            expect(number).toBeLessThanOrEqual(90)
        })
    })

    test('displaySchedina returns a string and includes essential information', () => {
        const schedina = new Schedina(5, ["bari"], ["ambo"], 10, 1)
        const display = schedina.displaySchedina()

        expect(typeof display).toBe('string')
        expect(display).toContain("LOTTO GAME TICKET")
        expect(display).toContain("Bari")
        expect(display).toContain("Ambo")
        expect(display).toContain("Amount: 10€")
    })

    test('displaySchedina returns a string and includes All', () => {
        const schedina = new Schedina(5, ["bari", "cagliari", "firenze", "genova", "milano", "napoli", "palermo", "roma", "torino", "venezia"], ["ambo"], 10, 1)
        const display = schedina.displaySchedina()

        expect(typeof display).toBe('string')
        expect(display).toContain("LOTTO GAME TICKET")
        expect(display).toContain("All Ruote")
        expect(display).toContain("Ambo")
        expect(display).toContain("Amount: 10€")
    })


    test('handles invalid numbers amount gracefully', () => {
        const schedina = new Schedina(11, ["Bari"], ["ambo"], 10, 1)
        const numbersSort = schedina.generateNumbers()
        expect(numbersSort).toBe(`You can't play with 11 numbers`)

        const display = schedina.displaySchedina()
        expect(display).toBe(`You can't play with 11 numbers here`)
    })
    test('line 33 of schedina', () => {
        const schedina = new Schedina(5, ["bari"], ["ambo"], 10, 1)
        schedina.numbersSort = [10, 10, 2, 3, 90]
        expect(schedina.numbersSort.length).toBe(5)
    })

})

describe('CheckWin Class', () => {
    let schedina = new Schedina(5, ["bari", "cagliari", "firenze", "milano", "napoli", "roma"], ["ambata", "ambo", "terno", "quaterna", "cinquina"], 10, 1)
    schedina.numbersSort = [10, 20, 30, 40, 50]
    const estrazione = new Extraction()
    estrazione.extraction = {
        bari: [10, 20, 30, 40, 50],
        cagliari: [60, 24, 40, 50, 42],
        firenze: [3, 20, 30, 40, 8],
        genova: [9, 13, 38, 15, 63],
        milano: [10, 57, 88, 37, 58],
        napoli: [10, 20, 30, 40, 21],
        palermo: [86, 62, 2, 9, 34],
        roma: [19, 84, 80, 7, 35],
        torino: [31, 1, 75, 25, 58],
        venezia: [61, 26, 9, 63, 40]
    }
    const checkWin = new CheckWin(schedina, estrazione)

    test('should initialize with provided Schedina and Estrazione objects', () => {
        expect(checkWin.schedina).toBe(schedina)
        expect(checkWin.estrazione).toBe(estrazione)
    })


    test('win gross', () => {
        expect(checkWin.checkPriceWin(schedina)).toBe("\x1b[32mYou have Win 56591809.12€ net")
    })



    let schedina2, estrazione2, checkWin2

    beforeEach(() => {

        schedina2 = new Schedina(1, ["bari"], ["ambata", "ambo", "terno", "quaterna", "cinquina"], 10, 1)
        schedina2.numbersSort = [10]
        schedina.win = 0
        estrazione2 = new Extraction()
        estrazione2.extraction = {
            bari: [10, 20, 30, 40, 50],
            cagliari: [60, 24, 40, 50, 42],
            firenze: [3, 20, 30, 40, 8],
            genova: [9, 13, 38, 15, 63],
            milano: [10, 57, 88, 37, 58],
            napoli: [10, 20, 30, 40, 21],
            palermo: [86, 62, 2, 9, 34],
            roma: [19, 84, 80, 7, 35],
            torino: [31, 1, 75, 25, 58],
            venezia: [61, 26, 9, 63, 40]
        }
        checkWin2 = new CheckWin(schedina2, estrazione2)
    })
    test('win net', () => {
        expect(checkWin2.checkPriceWin(schedina2)).toBe("\x1b[32mYou have Win 112.30€")
    })




    let schedina3, estrazione3, checkWin3

    beforeEach(() => {

        schedina3 = new Schedina(6, ["bari"], ["ambata", "ambo", "terno", "quaterna", "cinquina"], 10, 1)
        schedina3.numbersSort = [9, 11, 13, 15, 17]
        estrazione3 = new Extraction()
        estrazione3.extraction = {
            bari: [10, 20, 30, 40, 50],
            cagliari: [60, 24, 40, 50, 42],
            firenze: [3, 20, 30, 40, 8],
            genova: [9, 13, 38, 15, 63],
            milano: [10, 57, 88, 37, 58],
            napoli: [10, 20, 30, 40, 21],
            palermo: [86, 62, 2, 9, 34],
            roma: [19, 84, 80, 7, 35],
            torino: [31, 1, 75, 25, 58],
            venezia: [61, 26, 9, 63, 40]
        }
        checkWin3 = new CheckWin(schedina3, estrazione3)
    })

    test('lose', () => {
        expect(checkWin3.checkPriceWin(schedina3)).toBe("\x1b[31mYou have Lose")
    })

})