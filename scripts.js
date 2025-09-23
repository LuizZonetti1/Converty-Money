const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".current-select")

function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueConverted = document.querySelector(".currency-value")

    console.log(currencySelect.value)

    const dolarToday = 5.2
    const euroToday = 5.9
    const bitcoinToday = 134.000
    const libraToday = 6.2

    if (currencySelect.value === "Dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday)
    }
    if (currencySelect.value === "Euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday)

    }
    if (currencySelect.value === "BitCoin") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "BTC"
        }).format(inputCurrencyValue / bitcoinToday)
    }
    if (currencySelect.value === "Libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-UK", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyValue / libraToday)
    }


    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue)

}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImg = document.querySelector(".logo-pais-converted")

    if (currencySelect.value === "Dolar") {
        currencyName.innerHTML = "Dolar"
        currencyImg.src = "./assets/Dolar.png"

    }
    if (currencySelect.value === "Euro") {
        currencyName.innerHTML = "Euro"
        currencyImg.src = "./assets/Euro.png"

    }
    if (currencySelect.value === "BitCoin") {
        currencyName.innerHTML = "BitCoin"
        currencyImg.src = "./assets/BitCoin.png"
    }
    if (currencySelect.value === "Libra") {
        currencyName.innerHTML = "Libra"
        currencyImg.src = "./assets/Libra.png"
    }

    convertValues()
}

currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)