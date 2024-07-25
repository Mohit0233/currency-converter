function setup() {
  document.getElementById("inr_input").addEventListener('keyup', submit);
  document.getElementById("input_roe_inr_to_usd").addEventListener('keyup', submit);
  submit()
}

function submit() {
  const inputINR = document.getElementById("inr_input").value;
  const exchangeRate = parseFloat(document.getElementById("input_roe_inr_to_usd").value);

  const formattedCurrencyTag = document.getElementById("formatted_currency");
  const inrWithComma = document.getElementById("inr_with_comma");
  const inrStr = document.getElementById("inr_str");
  const inrStrNumericShort = document.getElementById("inr_str_numeric_short");
  const absUsd = document.getElementById("abs_usd");
  const shortUsd = document.getElementById("short_usd");
  const usdStr = document.getElementById("usd_str");

  let formattedCurrencyArr = reformatCurrencyArray(inputINR);
  formattedCurrencyTag.innerText = formattedCurrencyArr.join(' ');
  let intINRValue = inrWordsToNumber(formattedCurrencyArr);
  inrWithComma.innerText = commaINStandard(intINRValue)
  inrStr.innerText = inrToWords(intINRValue);
  inrStrNumericShort.innerText = inrToWords(intINRValue, true, true);
  const outputUSD = intINRValue * exchangeRate;
  absUsd.innerHTML = commaUSStandard(outputUSD)
  shortUsd.innerHTML = convertToInternationalCurrencySystem(outputUSD)
  usdStr.innerHTML = convertDollarsAndCents(outputUSD);
}

function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9 ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6 ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+3 ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K" : Math.abs(Number(labelValue));
}

function reformatCurrencyArray(currency) {
  const lakhsList = ["l", "lac", "lakh", "lakhs"];
  const crList = ["c", "cr", "crore", "coreo", "crores"];
  const kList = ["k", "th", "thousand", "thousandsa", "thousands"]
  const hList = ["h", "hundered", "hundred", "hundreds"]
  const millionList = ["m", "mill", "mil", "million", "millions"]
  const billionList = ["b", "bill", "bil", "billion", "billions"]
  const million = 1000_000
  const billion = 1000_000_000
  const lakh = 100000;
  const cr = 10000000;

  let parts = currency.trim()
    .replaceAll(",", "")
    .replaceAll("_", "")
    .toLowerCase()
    .match(/\d+|\D+/g); // used for 100million -> 100 million


  let reformattedCurrencyArray = [];

  if (parts == null) {
    return [];
  }

  for (let part of parts) {
    part = part.trim();
    if (isNumeric(part)) {
      reformattedCurrencyArray.push(part);
    } else if (lakhsList.includes(part)) {
      reformattedCurrencyArray.push('lakh');
    } else if (crList.includes(part)) {
      reformattedCurrencyArray.push('crore');
    } else if (kList.includes(part)) {
      reformattedCurrencyArray.push('thousand');
    } else if (hList.includes(part)) {
      reformattedCurrencyArray.push('hundred');
    }
  }
  return reformattedCurrencyArray;
}


function isNumeric(str) {
  if (typeof str != "string") throw new Error("we only process strings!");
  if (isNaN(str)) return false;   // won't able to help empty string or a lot of while space and [1] etc
  return true; // !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

