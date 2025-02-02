function autoUpdateExchangeRangeFetchButtonState() {
  const fetchButton = document.getElementById("fetch_exchange_rate_button");
  const [_, lastUpdated] = getStoredExchangeRate();
  const timeSinceLastFetch = Date.now() - lastUpdated;

  const lockDurationInMillis = hardCodedData.exchangeRateFetchButtonDisableTimeout;

  if (timeSinceLastFetch < lockDurationInMillis) {
    fetchButton.disabled = true;
    console.log("Button will be timmed out for: ", (lockDurationInMillis - timeSinceLastFetch) / 1000, "sec");
    setTimeout(() => fetchButton.disabled = false, lockDurationInMillis - timeSinceLastFetch);
  } else {
    fetchButton.disabled = false;
  }
}

async function onClickUpdateExchangeRate() {
  const fetchButton = document.getElementById("fetch_exchange_rate_button");

  fetchButton.disabled = true;
  let exchangeRate = await fetchUsdToInrExchangeRate();

  if (exchangeRate !== null) {
    console.log("no wa");

    const lastUpdated = setExchangeRateToLocalStore(exchangeRate)

    // todo does timeout takes data in millis???
    const lockDurationInMillis = hardCodedData.exchangeRateFetchButtonDisableTimeout;
    setTimeout(() => fetchButton.disabled = false, lockDurationInMillis);

    updateExchangeRateDisplay(exchangeRate, lastUpdated);
  } else {
    fetchButton.disabled = false;
  }
}

function setExchangeRateFromLocalStorage() {
  let [exchangeRate, lastUpdated] = getStoredExchangeRate();
  if (exchangeRate === null) exchangeRate = hardCodedData.exchangeRate;
  if (lastUpdated === null) lastUpdated = "Release Date";

  updateExchangeRateDisplay(exchangeRate, lastUpdated);
}

function updateExchangeRateDisplay(exchangeRate, lastUpdated) {
  const inputExchangeRateElement = document.getElementById("input_roe_usd_to_inr");
  const pUsdToInrElement = document.getElementById("inr_to_usd_exchange");

  inputExchangeRateElement.value = exchangeRate.toString();
  pUsdToInrElement.innerText = "Exchange Rate 1 INR = " + (1 / exchangeRate).toFixed(5).toString() + " USD, LastUpdated: " + timeAgo(parseInt(lastUpdated));

}



function manuallyUpdateExchangeRateDisplay() {
  const exchangeRate = parseFloat(document.getElementById("input_roe_usd_to_inr").value);
  let lastUpdated= setExchangeRateToLocalStore(exchangeRate);
  updateExchangeRateDisplay(exchangeRate, lastUpdated);
}
