
async function fetchUsdToInrExchangeRate() {

  // todo double check here if you want that the freeze time is over
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    let usdToINRExchangeRate = data.rates.INR;
    // console.log(usdToINRExchangeRate);
    return usdToINRExchangeRate;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    alert("Error Fetching Exchange Rate: " + error.toString());
    return null;
  }
}

