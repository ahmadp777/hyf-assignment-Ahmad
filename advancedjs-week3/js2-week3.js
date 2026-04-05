const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const enteredAmount = document.getElementById("enteredAmount");
const convertButton = document.getElementById("convertButton");

async function loadCurrencies() {
    try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();

        const currencies = Object.keys(data.rates);
        
        fromCurrency.innerHTML = "";
        toCurrency.innerHTML = "";
        
        currencies.forEach(currency => {
            const optionFrom = document.createElement("option");
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrency.appendChild(optionFrom);

            const optionTo = document.createElement("option");
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrency.appendChild(optionTo);
        });
        
        // Set default values
        fromCurrency.value = "EUR";
        toCurrency.value = "DKK";
        
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
}

loadCurrencies();

const outputAmount = document.getElementById("outputAmount");

async function convertCurrency() {
    const fromValue = fromCurrency.value;
    const toValue = toCurrency.value;
    const enteredAmountValue = parseFloat(enteredAmount.value);

    if (isNaN(enteredAmountValue) || enteredAmountValue <= 0) {
        outputAmount.textContent = "Enter a valid amount";
        return;
    }

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromValue}`);
        const data = await response.json();
        const changeRate = data.rates[toValue];
        const result = (enteredAmountValue * changeRate).toFixed(2);
        outputAmount.textContent = `${result} ${toValue}`;
    } catch (error) {
        console.error("Error converting currency:", error);
        outputAmount.textContent = "Conversion failed";
    }
}

convertButton.addEventListener("click", convertCurrency);

// Switch between "from" and "to" currencies
const swapButton = document.querySelector(".swap-icon");
swapButton.addEventListener("click", () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
});
