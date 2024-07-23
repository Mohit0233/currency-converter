function priceToIndianWords(price) {
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const scales = ["", "Thousand", "Lakh", "Crore"];

  function twoDigitsToWords(num) {
    if (num < 20) return units[num];
    return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + units[num % 10] : "");
  }

  function threeDigitsToWords(num) {
    if (num === 0) return "";
    if (num < 100) return twoDigitsToWords(num);
    return units[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + twoDigitsToWords(num % 100) : "");
  }

  if (price === 0) return "Zero";
  if (typeof price !== 'number' || !Number.isInteger(price) || price < 0 || price > 999999999) {
    throw new Error("Input must be a non-negative integer not exceeding 999999999");
  }

  let words = "";
  let crores = Math.floor(price / 10000000);
  let remaining = price % 10000000;

  if (crores > 0) {
    words += threeDigitsToWords(crores) + " Crore";
    if (remaining > 0) words += " ";
  }

  let lakhs = Math.floor(remaining / 100000);
  remaining %= 100000;

  if (lakhs > 0) {
    words += twoDigitsToWords(lakhs) + " Lakh";
    if (remaining > 0) words += " ";
  }

  let thousands = Math.floor(remaining / 1000);
  remaining %= 1000;

  if (thousands > 0) {
    words += twoDigitsToWords(thousands) + " Thousand";
    if (remaining > 0) words += " ";
  }

  if (remaining > 0) {
    words += threeDigitsToWords(remaining);
  }

  return words.trim();
}

// // Test cases
// function assert(actual, expected) {
//   if (actual !== expected) {
//     console.error(`Assertion failed: ${actual} !== ${expected}`);
//   } else {
//     console.log(`Assertion passed: ${actual}`);
//   }
// }

// assert(priceToIndianWords(0), 'Zero');
// assert(priceToIndianWords(1), 'One');
// assert(priceToIndianWords(10), 'Ten');
// assert(priceToIndianWords(15), 'Fifteen');
// assert(priceToIndianWords(123), 'One Hundred Twenty Three');
// assert(priceToIndianWords(1000), 'One Thousand');
// assert(priceToIndianWords(10_000), 'Ten Thousand');
// assert(priceToIndianWords(50_000), 'Fifty Thousand');
// assert(priceToIndianWords(99_999), 'Ninety Nine Thousand Nine Hundred Ninety Nine');
// assert(priceToIndianWords(10_00_000), 'Ten Lakh');
// assert(priceToIndianWords(25_00_000), 'Twenty Five Lakh');
// assert(priceToIndianWords(1_00_00_000), 'One Crore');
// assert(priceToIndianWords(5_00_00_000), 'Five Crore');
// assert(priceToIndianWords(9_99_99_999), 'Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine');
// assert(priceToIndianWords(10_00_00_000), 'Ten Crore');


function numberToIndianRupeeWords(number) {
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const scales = ["", "Thousand", "Lakh", "Crore"];

  // Helper function to convert a two-digit number to words
  function twoDigitsToWords(num) {
    if (num < 20) return units[num];
    return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + units[num % 10] : "");
  }

  // Helper function to convert a three-digit number to words
  function threeDigitsToWords(num) {
    if (num === 0) return "";
    if (num < 100) return twoDigitsToWords(num);
    return units[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + twoDigitsToWords(num % 100) : "");
  }

  if (number === 0) return "Zero";
  if (typeof number !== 'number' || !Number.isInteger(number) || number < 0 || number > 9999999999) {
    throw new Error("Input must be a positive integer not exceeding 9999999999");
  }

  let words = "";
  let scaleIndex = 0;

  while (number > 0) {
    const segment = number % 1000;
    if (segment !== 0) {
      const segmentWords = threeDigitsToWords(segment);
      words = segmentWords + (scales[scaleIndex] ? " " + scales[scaleIndex] : "") +
        (words ? " " + words : "");
    }
    number = Math.floor(number / 1000);
    scaleIndex++;
  }

  return words.trim();
}

// Test cases
// console.log(numberToIndianRupeeWords(0));  // Zero
// console.log(numberToIndianRupeeWords(10));  // Ten
// console.log(numberToIndianRupeeWords(15));  // Fifteen
// console.log(numberToIndianRupeeWords(123));  // One Hundred Twenty Three
// console.log(numberToIndianRupeeWords(10000));  // Ten Thousand
// console.log(numberToIndianRupeeWords(50000));  // Fifty Thousand
// console.log(numberToIndianRupeeWords(99999));  // Ninety Nine Thousand Nine Hundred Ninety Nine
// console.log(numberToIndianRupeeWords(1000000));  // Ten Lakh
// console.log(numberToIndianRupeeWords(2500000));  // Twenty Five Lakh
// console.log(numberToIndianRupeeWords(999999999));  // Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine
// console.log(numberToIndianRupeeWords(1000000000));  // Ten Crore