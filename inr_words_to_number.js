function inrWordsToNumber(currencyWordArray) {
  let split2DArray = splitArrayBy(currencyWordArray, 'crore');
  let resultAbsInrCurrency = '';

  for (let i = 0; i < split2DArray.length; i++) {
    let lessThenCrorePart = split2DArray[i];
    if (lessThenCrorePart === '') break;

    let currNumber = calcAbsNumberValueForLessThenCroreValue(lessThenCrorePart);
    if (currNumber.length > 7) {
      throw new Error(lessThenCrorePart + ' gives ' + currNumber + ' whose length is greter then 7. which should not be possible as we are calculating the value for less the crore');
    }
    if (i === 0) {
      resultAbsInrCurrency += currNumber;
    } else {
      resultAbsInrCurrency += currNumber.toString().padStart(7 - currNumber.toString(), '0')
    }
  }

  return resultAbsInrCurrency.toString();
}

function splitArrayBy(currencyWordArray, delimiter) {
  let splitSubarray = []
  let lastCroreSplitIdx = 0;
  for (let i = 0; i < currencyWordArray.length; i++) {
    let strElement = currencyWordArray[i];
    if (strElement === delimiter) {
      splitSubarray.push(currencyWordArray.slice(lastCroreSplitIdx, i));
      lastCroreSplitIdx = i + 1;
    }
  }
  splitSubarray.push(currencyWordArray.slice(lastCroreSplitIdx, currencyWordArray.length));

  return splitSubarray;
}

function calcAbsNumberValueForLessThenCroreValue(lessThenCrorePart) {

  let magnitude = {
    'lakh': 100000, 'thousand': 1000, 'hundred': 100, undefined: 1
  }
  let result = 0;
  for (let i = 0; i < lessThenCrorePart.length; i += 2) {
    let numericPart = lessThenCrorePart[i];
    let magnitudePart = lessThenCrorePart[i + 1];
    let mag = magnitude[magnitudePart]
    let magnitudeElement = mag === undefined ? 1 : mag;
    result += numericPart * magnitudeElement;
  }

  return result;
}


function testInrWordsToNumber() {
  assert(inrWordsToNumber(['1', 'crore', '23', 'lakh', '45', 'thousand', '678']), '12345678')
  assert(inrWordsToNumber(['23', 'lakh', '45', 'thousand', '678', 'crore', '23', 'lakh', '45', 'thousand', '678']), '23456782345678')
  assert(inrWordsToNumber(['12345', 'crore']), '123450000000')
}

testInrWordsToNumber()


