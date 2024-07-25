function setup() {
  document.getElementById("inr_input").addEventListener('keyup', submit);
  document.getElementById("input_roe_inr_to_usd").addEventListener('keyup', submit);
  submit()
}

function submit() {
  const inputINR = document.getElementById("inr_input").value;
  const exchangeRate = parseFloat(document.getElementById("input_roe_inr_to_usd").value);

  const formattedCurrencyTag = document.getElementById("formatted_currency");
  const absInr = document.getElementById("abs_inr");
  const inrWithComma = document.getElementById("inr_with_comma");
  const inrStr = document.getElementById("inr_str");
  const inrStrNumericShort = document.getElementById("inr_str_numeric_short");
  const absUsd = document.getElementById("abs_usd");
  const shortUsd = document.getElementById("short_usd");
  const usdStr = document.getElementById("usd_str");

  let formattedCurrency = reformatCurrency(inputINR);

  formattedCurrencyTag.innerText = formattedCurrency.join(' ');

  let intINRValue = inrWordsToNumber(formattedCurrency);
  absInr.innerText = intINRValue;
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

function reformatCurrency(currency) {
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

function inrWordsToNumber(currencyWordArray) {
  let split2DArray = splitByCrore(currencyWordArray);
  let resultAbsInrCurrency = '';

  for (let lessThenCrorePart of split2DArray) {
    if (lessThenCrorePart === '') {
      break;
    }
    let numberValue = computeNumberValueForInrCurrency(lessThenCrorePart);
    if (numberValue.length > 7) {
      throw new Error(lessThenCrorePart + ' gives ' + numberValue + ' whose length is greter then 7. which should not be possible as we are calculating the value for less the crore');
    }
    if (numberValue === 0) {
      resultAbsInrCurrency +=  ''.padEnd(7, '0');
    } else {
      resultAbsInrCurrency += numberValue.toString().padEnd(7, '0')
    }
  }

  return resultAbsInrCurrency.toString();
}

function splitByCrore(currencyWordArray) {
  let splitSubarray = []
  let lastCroreSplitIdx = 0;
  for (let i = 0; i < currencyWordArray.length; i++) {
    let strElement = currencyWordArray[i];
    if (strElement === 'crore') {
      splitSubarray.push(currencyWordArray.slice(lastCroreSplitIdx, i));
      lastCroreSplitIdx = i + 1;
    }
  }
  splitSubarray.push(currencyWordArray.slice(lastCroreSplitIdx, currencyWordArray.length));

  return splitSubarray;
}

function computeNumberValueForInrCurrency(lessThenCrorePart) {

  let magnitude = {
    'lakh': 100000,
    'thousand': 1000,
    'hundred': 100,
    undefined: 1
  }

  let result = 0;
  let rr;
  for (let i = 0; i < lessThenCrorePart.length; i += 2) {
    let numericPart = lessThenCrorePart[i];
    let magnitudePart = lessThenCrorePart[i + 1];
    let magnitudeElement = (rr = magnitude[magnitudePart]) === undefined ? 1 : rr;
    result += numericPart * magnitudeElement;
  }

  return result;
}

function isNumeric(str) {
  if (typeof str != "string") {
    throw new Error("we only process strings!");
  }
  if (isNaN(str)) { // won't able to help empty string or a lot of while space and [1] etc
    // throw new Error(str + "is not a number")
    return false;
  }

  return true;
  // !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


function assert(actual, expected) {
  if (actual !== expected) console.error(' actual:', actual, '\n', 'expected:', expected);
}

function testInrWordsToNumber() {
  assert(inrWordsToNumber(['1', 'crore', '23', 'lakh', '45', 'thousand', '678']), '12345678')
  assert(inrWordsToNumber(['23', 'lakh', '45', 'thousand', '678', 'crore', '23', 'lakh', '45', 'thousand', '678']), '23456782345678')
}

// testInrWordsToNumber()


