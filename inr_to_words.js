console.log('inr_to_words.js')
let units;
let tens;
let allDoubles;
let CRORE;
let LAKH;
let THOUSAND;
let HUNDRED;


function initializedConstants(short, numberShouldNumeric) {

  allDoubles = []
  if (numberShouldNumeric) {
    units = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
      "11", "12", "13", "14", "15", "16", "17", "18", "19"];
    let ones = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    tens = ["", "", "20", "30", "40", "50", "60", "70", "80", "90"];

    // 1, 0
    for (let i = 1; i < ones.length; i++) {
      for (let j = 0; j < ones.length; j++) {
        allDoubles[i * 10 + j] = ones[i] + ones[j];
      }
    }
  } else {
    let ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

    units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    // 1, 0
    for (let i = 2; i < ones.length; i++) {
      for (let j = 0; j < ones.length; j++) {
        if (j === 0) {
          allDoubles[i * 10] = tens[i];
        } else {
          allDoubles[i * 10 + j] = tens[i] + ' ' + ones[j];
        }
      }
    }
  }

  if (short) {
    CRORE = 'cr'
    LAKH = 'lac'
    THOUSAND = 'k'
    HUNDRED = 'h'
  } else {
    CRORE = 'Crore'
    LAKH = 'Lakh'
    THOUSAND = 'Thousand'
    HUNDRED = 'Hundred'
  }

}

function inrToWords(inputCurrencyString, short = false, numberShouldNumeric = false) {

  if (inputCurrencyString === undefined) {
    throw new Error("inrToWords can't be blank");
  }

  initializedConstants(short, numberShouldNumeric)

  inputCurrencyString = inputCurrencyString.toString();
  // ,
  // _ underscore
  // handle decimals

  let resultStr = '';

  if (inputCurrencyString === '0') return 'Zero'

  let isLastPar = false;

  while (inputCurrencyString.length !== 0) {
    if (inputCurrencyString.length <= 7) {
      isLastPar = true;
    }
    let exactDigits = extractLastNDigits(inputCurrencyString, 7)
    exactDigits = trimLeadingZeros(exactDigits);
    let len = exactDigits.length;
    if (len === 7) {
      resultStr = handle7Digits(exactDigits).trim() + resultStr;
    } else if (len === 6) {
      resultStr = handle6Digits(exactDigits).trim() + resultStr;
    } else if (len === 5) {
      resultStr = handle5Digits(exactDigits).trim() + resultStr;
    } else if (len === 4) {
      resultStr = handle4Digits(exactDigits, isLastPar).trim() + resultStr;
    } else if (len === 3) {
      resultStr = handle3Digits(exactDigits).trim() + resultStr;
    } else if (len === 2) {
      resultStr = handle2Digits(exactDigits).trim() + resultStr;
    } else if (len === 1) {
      resultStr = handle1Digits(exactDigits).trim() + resultStr;
    }
    inputCurrencyString = trimLastNDigits(inputCurrencyString, 7);

    if (inputCurrencyString.length !== 0) {
      resultStr = " " + CRORE + " " + resultStr.trim();
    }

  }

  return resultStr.trim();

}

// lakhs + thousands + hundreds
function handle7Digits(sevenDigits) {
  // 01 23 456
  let lahkPlace = handle2Digits(sevenDigits.slice(0, 2));
  let remainingPlaces = handle5Digits(sevenDigits.slice(2, 7));

  if (lahkPlace.length !== 0) lahkPlace += " " + LAKH + " ";
  return lahkPlace + remainingPlaces;
}

function handle6Digits(sixDigits) {
  // 0 12 345
  let lahkPlace = handle1Digits(sixDigits.slice(0, 1));
  let remainingPlaces = handle5Digits(sixDigits.slice(1, 6));

  if (lahkPlace.length !== 0) lahkPlace += " " + LAKH + " ";
  return lahkPlace + remainingPlaces;
}

function handle5Digits(fiveDigits) {
  let exactDigits = trimLeadingZeros(fiveDigits);
  let len = exactDigits.length;
  if (len === 0) {
    return '';
  } else if (len === 1) {
    return handle1Digits(exactDigits);
  } else if (len === 2) {
    return handle2Digits(exactDigits);
  } else if (len === 3) {
    return handle3Digits(exactDigits);
  } else if (len === 4) {
    return handle4Digits(exactDigits);
  } else if (len === 5) {
    // 01 234
    let thousandPlace = handle2Digits(fiveDigits.slice(0, 2));
    let tripleDigits = handle3Digits(fiveDigits.slice(2, 5));

    if (thousandPlace.length !== 0) thousandPlace += " " + THOUSAND + " ";
    return thousandPlace + tripleDigits;
  }

}

function handle4Digits(fourDigits, isLastPart) {
  let secondDigitOfFirstTwoDigit = fourDigits.slice(1, 2);
  if (isLastPart && secondDigitOfFirstTwoDigit !== '0') {
    // 2201 (22 hundred 1)
    let hundredPlace = handle2Digits(fourDigits.slice(0, 2));
    let doubleDigit = handle2Digits(fourDigits.slice(2, 4));

    if (hundredPlace.length !== 0) hundredPlace += " " + HUNDRED + " ";
    return hundredPlace + doubleDigit;
  } else {
    // 0 123
    // 4001 (won't be 40 hundred one but will be 4 thousand 1) 2024 will be 2 thousand 24
    let thousandPlace = handle1Digits(fourDigits.slice(0, 1));
    let tripleDigits = handle3Digits(fourDigits.slice(1, 4));

    if (thousandPlace.length !== 0) thousandPlace += " " + THOUSAND + " ";

    return thousandPlace + tripleDigits;
  }
}

function handle3Digits(threeDigits) {
  let exactDigits = trimLeadingZeros(threeDigits);
  let len = exactDigits.length;
  if (len === 0) {
    return '';
  } else if (len === 1) {
    return handle1Digits(exactDigits);
  } else if (len === 2) {
    return handle2Digits(exactDigits);
  } else if (len === 3) {
    // 0 12
    let hundredPlace = handle1Digits(exactDigits.slice(0, 1));
    let doubleDigit = handle2Digits(exactDigits.slice(1, 3));

    if (hundredPlace.length !== 0) hundredPlace += " " + HUNDRED + " ";
    return hundredPlace + doubleDigit;
  }
}

function handle2Digits(twoDigits) {
  let exactDigits = trimLeadingZeros(twoDigits);
  let len = exactDigits.length;

  if (len === 0) {
    return '';
  } else if (len === 1) {
    return handle1Digits(exactDigits);
  } else if (len === 2) {
    let num = parseInt(exactDigits)
    if (num < 20) {
      // for 11 to 19
      return units[num];
    } else if (num >= 20) {
      // let tensPlaceNumber = Math.floor(num / 10);
      // let tensPlace = tens[tensPlaceNumber];
      // let oncePlaceNumber = num % 10;
      // let oncePlace = oncePlaceNumber !== 0 ? units[oncePlaceNumber] : "";
      // if (oncePlace.length !== 0) oncePlace = " " + oncePlace;
      // return tensPlace + oncePlace;
      return allDoubles[num];
    }
  }
}

function handle1Digits(oneDigits) {
  return units[parseInt(oneDigits)];
}


function trimLastNDigits(inputCurrencyString, digitsToTrim) {
  return inputCurrencyString.slice(0, -digitsToTrim);
}

function extractLastNDigits(str, digitsToExtract) {
  return str.slice(-digitsToExtract);
}


function trimLeadingZeros(str) {
  return str.replace(/^0+/, ''); // Return '0' if the result is an empty string
}


function assert(actual, expected) {
  if (actual !== expected) console.error(' actual:', actual, '\n', 'expected:', expected);
}


function testInrToWords() {
  assert(inrToWords(0), 'Zero')
  assert(inrToWords(1), 'One')
  assert(inrToWords(10), 'Ten')
  assert(inrToWords(15), 'Fifteen')
  assert(inrToWords(123), 'One Hundred Twenty Three')
  assert(inrToWords(1000), 'One Thousand')
  assert(inrToWords(4001), 'Four Thousand One')
  assert(inrToWords(2024), 'Two Thousand Twenty Four')
  assert(inrToWords(10_000), 'Ten Thousand')
  assert(inrToWords(50_000), 'Fifty Thousand')
  assert(inrToWords(99_999), 'Ninety Nine Thousand Nine Hundred Ninety Nine')
  assert(inrToWords(1_00_201), 'One Lakh Two Hundred One')
  assert(inrToWords(1_02_001), 'One Lakh Two Thousand One')
  assert(inrToWords(10_00_000), 'Ten Lakh')
  assert(inrToWords(11_02_201), 'Eleven Lakh Two Thousand Two Hundred One')
  assert(inrToWords(25_00_000), 'Twenty Five Lakh')
  assert(inrToWords(1_00_00_000), 'One Crore')
  assert(inrToWords(1_20_26_033), 'One Crore Twenty Lakh Twenty Six Thousand Thirty Three')
  assert(inrToWords(5_00_00_000), 'Five Crore')
  assert(inrToWords(9_99_99_999), 'Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine')
  assert(inrToWords(10_00_00_000), 'Ten Crore')
  assert(inrToWords('999999999'), 'Ninety Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine')
  assert(inrToWords('999999999'), 'Ninety Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine')
  assert(inrToWords('10000000000'), 'One Thousand Crore');
  assert(inrToWords('100000000000'), 'Ten Thousand Crore');
  assert(inrToWords('1000000000000'), 'One Lakh Crore');
  assert(inrToWords('10000000000000'), 'Ten Lakh Crore');
  assert(inrToWords('100000000000000'), 'One Crore Crore');
  assert(inrToWords('100000000000000', true, true), '1 cr cr');
  assert(inrToWords('999999999', true, true), '99 cr 99 lac 99 k 9 h 99')

}

// testInrToWords()
