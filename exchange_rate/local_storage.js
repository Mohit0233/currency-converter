const STORAGE_KEY = "exchange_data";

function getStoredExchangeRate() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    let storedDateValue = JSON.parse(storedData);

    let exchangeRate = storedDateValue.exchangeRate === undefined? null: storedDateValue.exchangeRate;
    let lastUpdated = storedDateValue.lastUpdated === undefined? null: storedDateValue.lastUpdated;
    return [exchangeRate, lastUpdated];
  }
  return [null, null];

}

function setExchangeRateToLocalStore(exchangeRate) {
  let lastUpdated = Date.now();
  let jsonValue = {
    exchangeRate: exchangeRate,
    lastUpdated: lastUpdated
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonValue));

  return lastUpdated;
}