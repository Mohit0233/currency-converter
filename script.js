function setup() {
  document.getElementById("inr_input").addEventListener('keyup', submit);
  document.getElementById("input_roe_inr_to_usd").addEventListener('keyup', submit);
  submit()
}

function submit() {
  const inputINR = document.getElementById("inr_input").value;
  const absINRElem = document.getElementById("absolute_inr");
  const exchangeRate = parseFloat(document.getElementById("input_roe_inr_to_usd").value);

  let intINRValue = convertIndianCurrencyToNumber(inputINR);

  const absInr = document.getElementById("abs_inr");
  const inrWithComma = document.getElementById("inr_with_comma");
  const inrStr = document.getElementById("inr_str");
  const absUsd = document.getElementById("abs_usd");
  const shortUsd = document.getElementById("short_usd");
  const usdStr = document.getElementById("usd_str");

  absInr.innerText = intINRValue
  inrWithComma.innerText = formatCommaINStandard(intINRValue)
  inrStr.innerText = priceToIndianWords(intINRValue);

  const outputUSD = intINRValue * exchangeRate;
  absUsd.innerHTML = formatCommaUSStandard(outputUSD)
  shortUsd.innerHTML = convertToInternationalCurrencySystem(outputUSD)
  usdStr.innerHTML = numberToUSWords(outputUSD);
}

function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9 ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions
    : Math.abs(Number(labelValue)) >= 1.0e+6 ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+3 ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K" : Math.abs(Number(labelValue));
}

function convertIndianCurrencyToNumber(currency) {
  const lakhsList = ["l", "lac", "lakh", "lakhs"];
  const crList = ["c", "cr", "crore", "crores"];
  const kList = ["k", "th", "thousand", "thousands"]
  const hList = ["h", "hundred", "hundreds"]
  const lakh = 100000;
  const cr = 10000000;

  const parts = currency.trim().replace(",", "").toLowerCase().split(/\s+/);

  let absNumber = 0;
  let currDigitNumber = 0;

  for (const part of parts) {
    if (isNumeric(part)) {
      absNumber += currDigitNumber;
      currDigitNumber = Number(part);
    } else if (lakhsList.includes(part)) {
      currDigitNumber *= lakh;
    } else if (crList.includes(part)) {
      currDigitNumber *= cr;
    } else if (kList.includes(part)) {
      currDigitNumber *= 1000;
    } else if (hList.includes(part)) {
      currDigitNumber *= 100;
    }
  }

  return absNumber + currDigitNumber;
}

function formatCommaUSStandard(n) {
  let commaSeparated = n.toLocaleString('en-US')
  return commaSeparated.slice(0, 2).replace(",", "") + commaSeparated.slice(2);
}

function formatCommaINStandard(n) {
  let commaSeparated = n.toLocaleString('en-IN');

  return commaSeparated.slice(0, 2).replace(",", "") + commaSeparated.slice(2);

}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}



/*
function priceToIndianWords(price) {

  areAllDigits(price)

  let sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
    dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
    tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
    handle_tens = function (dgt, prevDgt) {
      return 0 === dgt ? "" : " " + (1 === dgt ? dblDigit[prevDgt] : tensPlace[dgt])
    },
    handle_utlc = function (dgt, nxtDgt, denom) {
      return (0 !== dgt && 1 !== nxtDgt ? " " + sglDigit[dgt] : "") + (0 !== nxtDgt || dgt > 0 ? " " + denom : "")
    };

  var str = "",
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0,
    words = [];
  if (price += "", isNaN(parseInt(price))) str = "";
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
      case 0:
        words.push(handle_utlc(digit, nxtDigit, ""));
        break;
      case 1:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 2:
        words.push(0 !== digit ? " " + sglDigit[digit] + " Hundred" + (0 !== price[digitIdx + 1] && 0 !== price[digitIdx + 2] ? " and" : "") : "");
        break;
      case 3:
        words.push(handle_utlc(digit, nxtDigit, "Thousand"));
        break;
      case 4:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 5:
        words.push(handle_utlc(digit, nxtDigit, "Lakh"));
        break;
      case 6:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 7:
        words.push(handle_utlc(digit, nxtDigit, "Crore"));
        break;
      case 8:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 9:
        words.push(0 !== digit ? " " + sglDigit[digit] + " Hundred" + (0 !== price[digitIdx + 1] || 0 !== price[digitIdx + 2] ? " and" : " Crore") : "")
    }
    str = words.reverse().join("")
  } else {
    str = "";
  }
  return str.trim()

}

*/



function numberToUSWords(usDollars) {

  const translations = new Map([[1000000000, 'Billion'], [1000000, 'Million'], [1000, 'Thousand'], [100, 'Hundred'], [90, 'Ninety'], [80, 'Eighty'], [70, 'Seventy'], [60, 'Sixty'], [50, 'Fifty'], [40, 'Forty'], [30, 'Thirty'], [20, 'Twenty'], [19, 'Nineteen'], [18, 'Eighteen'], [17, 'Seventeen'], [16, 'Sixteen'], [15, 'Fifteen'], [14, 'Fourteen'], [13, 'Thirteen'], [12, 'Twelve'], [11, 'Eleven'], [10, 'Ten'], [9, 'Nine'], [8, 'Eight'], [7, 'Seven'], [6, 'Six'], [5, 'Five'], [4, 'Four'], [3, 'Three'], [2, 'Two'], [1, 'One'],]);

  if (usDollars === 0) return 'Zero';

  if (usDollars <= 20) return translations.get(usDollars);

  let result = [];
  for (let [value, translation] of translations) {
    const times = Math.floor(usDollars / value);
    if (times === 0) continue;
    usDollars -= times * value;
    if (times === 1 && value >= 100) {
      result.push('One', translation);
    } else if (times === 1) {
      result.push(translation);
    } else {
      result.push(numberToUSWords(times), translation);
    }
  }

  let res = result.join(' ');
  return res;
}

function convertDollarsAndCents(amount) {
  let [dollars, centsPart] = amount.toString().split('.');
  let cents = centsPart ? parseInt(centsPart.slice(0, 2)) : 0;
  let extraDecimals = centsPart && centsPart.length > 2;

  let dollarPart = dollars ? numberToUSWords(parseInt(dollars)) + (parseInt(dollars) === 1 ? ' Dollar' : ' Dollars') : '';
  let centPart = cents ? numberToUSWords(cents) + (cents === 1 ? ' Cent' : ' Cents') : '';

  if (extraDecimals) {
    dollarPart = '~ ' + dollarPart;
  }
  if (dollarPart && centPart) {
    return dollarPart + ' and ' + centPart;
  } else if (dollarPart) {
    return dollarPart;
  } else if (centPart) {
    return centPart;
  }
}




// Testing

function testConvertDollarsAndCents() {

  assert(convertDollarsAndCents(0), 'Zero Dollars');
  assert(convertDollarsAndCents(0.22), 'Zero Dollars and Twenty Two Cents');
  assert(convertDollarsAndCents(0.223), '~ Zero Dollars and Twenty Two Cents');
  assert(convertDollarsAndCents(123.88), 'One Hundred Twenty Three Dollars and Eighty Eight Cents');
  assert(convertDollarsAndCents(1000001), 'One Million One Dollars');
  assert(convertDollarsAndCents(1000_000_001), 'One Billion One Dollars');
  assert(convertDollarsAndCents(1_234_567_890), 'One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety Dollars');
  assert(convertDollarsAndCents(9_876_543_210), 'Nine Billion Eight Hundred Seventy Six Million Five Hundred Forty Three Thousand Two Hundred Ten Dollars');
  assert(convertDollarsAndCents(1_001_001_001), 'One Billion One Million One Thousand One Dollars');
  assert(convertDollarsAndCents(1_000_000_000), 'One Billion Dollars');
  assert(convertDollarsAndCents(11_000_000_000), 'Eleven Billion Dollars');
  assert(convertDollarsAndCents(999_999_999_999), 'Nine Hundred Ninety Nine Billion Nine Hundred Ninety Nine Million Nine Hundred Ninety Nine Thousand Nine Hundred Ninety Nine Dollars');
  assert(convertDollarsAndCents(456_789_012_345), 'Four Hundred Fifty Six Billion Seven Hundred Eighty Nine Million Twelve Thousand Three Hundred Forty Five Dollars');
  assert(convertDollarsAndCents(123_456_789_012), 'One Hundred Twenty Three Billion Four Hundred Fifty Six Million Seven Hundred Eighty Nine Thousand Twelve Dollars');
  assert(convertDollarsAndCents(200_300_400_500), 'Two Hundred Billion Three Hundred Million Four Hundred Thousand Five Hundred Dollars');
  assert(convertDollarsAndCents(8_000_700_600), 'Eight Billion Seven Hundred Thousand Six Hundred Dollars');
  assert(convertDollarsAndCents(123_004_500), 'One Hundred Twenty Three Million Four Thousand Five Hundred Dollars');
  assert(convertDollarsAndCents(9_876_000_000), 'Nine Billion Eight Hundred Seventy Six Million Dollars');

}

function testPriceToIndianWords() {
  assert(priceToIndianWords(0), 'Zero')
  assert(priceToIndianWords(1), 'One')
  assert(priceToIndianWords(10), 'Ten')
  assert(priceToIndianWords(15), 'Fifteen')
  assert(priceToIndianWords(123), 'One Hundred Twenty Three')
  assert(priceToIndianWords(1000), 'One Thousand')
  assert(priceToIndianWords(10_000), 'Ten Thousand')
  assert(priceToIndianWords(50_000), 'Fifty Thousand')
  assert(priceToIndianWords(99_999), 'Ninety Nine Thousand Nine Hundred Ninety Nine')
  assert(priceToIndianWords(10_00_000), 'Ten Lakh')
  assert(priceToIndianWords(25_00_000), 'Twenty Five Lakh')
  assert(priceToIndianWords(1_00_00_000), 'One Crore')
  assert(priceToIndianWords(5_00_00_000), 'Five Crore')
  assert(priceToIndianWords(9_99_99_999), 'Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine')
  assert(priceToIndianWords(10_00_00_000), 'Ten Crore')
  assert(priceToIndianWords(99_99_99_999), 'Ninety Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine')
  // assert(priceToIndianWords(1_00_00_00_000), 'Ten Crore') // overflow

}


function assert(actual, expected) {
  if (actual !== expected) console.error(' actual:', actual, '\n', 'expected:', expected);
}

testConvertDollarsAndCents()
testPriceToIndianWords()


