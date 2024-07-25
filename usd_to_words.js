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
  return result.join(' ');
}

function convertDollarsAndCents(amount) {
  if (isNaN(amount)) return 'Invalid Number: ' + amount
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


  assert(convertDollarsAndCents('NaN'), 'Invalid Number: NaN');
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



function assert(actual, expected) {
  if (actual !== expected) console.error(' actual:', actual, '\n', 'expected:', expected);
}

testConvertDollarsAndCents()