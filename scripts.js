const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".current-select")
const currencySelectOrigin = document.querySelector(".current-select-origin")
const currencySelectDestination = document.querySelector(".current-select-destination")

const rates = {
    "Real": 1,
    "Dolar": 5.2,
    "Euro": 5.9,
    "BitCoin": 134000,
    "Libra": 6.2
}


function convertValues() {
    const inputCurrencyValue = parseFloat(
        document.querySelector(".input-currency").value
            .replace(/[^0-9,\.]/g, '')
            .replace(',', '.')
    ) || 0;
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");
    const from = currencySelectOrigin.value;
    const to = currencySelectDestination.value;

    // 1º: converte para real
    let valueInBRL = inputCurrencyValue * rates[from];
    // 2º: converte de real para destino
    const convertedValue = valueInBRL / rates[to];

    currencyValueToConvert.innerHTML = formatters[from].format(inputCurrencyValue);
    currencyValueConverted.innerHTML = formatters[to].format(convertedValue);
}


const formatters = {
    "Real": new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    "Dolar": new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
    "Euro": new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }),
    "BitCoin": new Intl.NumberFormat("de-DE", { style: "currency", currency: "BTC", maximumFractionDigits: 6 }),
    "Libra": new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })
};

function changeCurrencyDestiny() {
    const currencyName = document.getElementById("currency-name");
    const currencyImg = document.querySelector(".logo-pais-converted");
    const to = currencySelectDestination.value;

    if (to === "Dolar") {
        currencyName.innerHTML = "Dolar";
        currencyImg.src = "./assets/Dolar.png";
    }
    if (to === "Euro") {
        currencyName.innerHTML = "Euro";
        currencyImg.src = "./assets/Euro.png";
    }
    if (to === "BitCoin") {
        currencyName.innerHTML = "BitCoin";
        currencyImg.src = "./assets/BitCoin.png";
    }
    if (to === "Libra") {
        currencyName.innerHTML = "Libra";
        currencyImg.src = "./assets/Libra.png";
    }
    if (to === "Real") {
        currencyName.innerHTML = "Real";
        currencyImg.src = "./assets/real.png";
    }
    convertValues();
}

function changeCurrencyOrigin() {
    const currencyNameOrigin = document.getElementById("curreancy-name-origin");
    const currencyImgOrigin = document.querySelector(".logo-pais-origin");
    const from = currencySelectOrigin.value;

    if (from === "Dolar") {
        currencyNameOrigin.innerHTML = "Dolar";
        currencyImgOrigin.src = "./assets/Dolar.png";
    }
    if (from === "Euro") {
        currencyNameOrigin.innerHTML = "Euro";
        currencyImgOrigin.src = "./assets/Euro.png";
    }
    if (from === "BitCoin") {
        currencyNameOrigin.innerHTML = "BitCoin";
        currencyImgOrigin.src = "./assets/BitCoin.png";
    }
    if (from === "Libra") {
        currencyNameOrigin.innerHTML = "Libra";
        currencyImgOrigin.src = "./assets/Libra.png";
    }
    if (from === "Real") {
        currencyNameOrigin.innerHTML = "Real";
        currencyImgOrigin.src = "./assets/real.png";
    }
}

currencySelectOrigin.addEventListener("change", changeCurrencyOrigin);
currencySelectOrigin.addEventListener("change", convertValues);
currencySelectDestination.addEventListener("change", changeCurrencyDestiny)
convertButton.addEventListener("click", convertValues)