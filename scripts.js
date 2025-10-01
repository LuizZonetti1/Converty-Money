const convertButton = document.querySelector(".convert-button");
const currencySelectOrigin = document.querySelector(".current-select-origin");
const currencySelectDestination = document.querySelector(".current-select-destination");

// Taxas em BRL por 1 unidade da moeda (carregadas apenas via API)
const rates = {};
let ratesReady = false;

function setControlsEnabled(enabled) {
    convertButton.disabled = !enabled;
    currencySelectOrigin.disabled = !enabled;
    currencySelectDestination.disabled = !enabled;
}

// Busca cotações reais e atualiza o objeto rates
async function fetchRates() {
    try {
        const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // A API retorna quantos BRL valem 1 unidade da moeda
        rates.Real = 1;
        rates.Dolar = parseFloat(data.USDBRL.bid);
        rates.Euro = parseFloat(data.EURBRL.bid);
        rates.Libra = parseFloat(data.GBPBRL.bid);
        rates.BitCoin = parseFloat(data.BTCBRL.bid);
        ratesReady = true;
        setControlsEnabled(true);
    } catch (err) {
        console.error("Falha ao buscar cotações. Conversão indisponível:", err);
        ratesReady = false;
        setControlsEnabled(false);
        const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
        const currencyValueConverted = document.querySelector(".currency-value");
        if (currencyValueToConvert) currencyValueToConvert.innerHTML = "—";
        if (currencyValueConverted) currencyValueConverted.innerHTML = "Erro ao buscar cotações";
    } finally {
        if (ratesReady) {
            // Atualiza a UI com as cotações atuais
            convertValues();
        }
    }
}

function getRate(code) {
    return rates[code];
}


function convertValues() {
    const inputCurrencyValue = parseFloat(
        document.querySelector(".input-currency").value
            .replace(/[^0-9,\.]/g, "")
            .replace(",", ".")
    ) || 0;

    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");
    const from = currencySelectOrigin.value;
    const to = currencySelectDestination.value;

    if (!ratesReady || !getRate(from) || !getRate(to)) {
        if (currencyValueConverted) currencyValueConverted.innerHTML = "Carregando cotações...";
        return;
    }

    // 1º: converte para BRL
    const valueInBRL = inputCurrencyValue * getRate(from);
    // 2º: converte de BRL para destino
    const convertedValue = valueInBRL / getRate(to);

    currencyValueToConvert.innerHTML = formatters[from].format(inputCurrencyValue);
    currencyValueConverted.innerHTML = formatters[to].format(convertedValue);
}


const formatters = {
    "Real": new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    "Dolar": new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
    "Euro": new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }),
    // BTC não é suportado como 'currency' em todos os navegadores, usar formatação customizada
    "BitCoin": { format: (n) => `₿ ${Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 6, maximumFractionDigits: 8 })}` },
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
        currencyImg.src = "./assets/bitcoin.png";
    }
    if (to === "Libra") {
        currencyName.innerHTML = "Libra";
        currencyImg.src = "./assets/libra.png";
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
        currencyImgOrigin.src = "./assets/bitcoin.png";
    }
    if (from === "Libra") {
        currencyNameOrigin.innerHTML = "Libra";
        currencyImgOrigin.src = "./assets/libra.png";
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

// Busca as cotações quando a página carrega e atualiza periodicamente
window.addEventListener("DOMContentLoaded", () => {
    // Desabilita controles até que as taxas sejam carregadas
    setControlsEnabled(false);
    // Mensagens iniciais
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");
    if (currencyValueToConvert) currencyValueToConvert.innerHTML = "—";
    if (currencyValueConverted) currencyValueConverted.innerHTML = "Carregando cotações...";

    fetchRates();
    // Atualiza a cada 15 minutos (opcional)
    setInterval(fetchRates, 900000);
});