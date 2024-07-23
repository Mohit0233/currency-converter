
function setup() {
    console.log("adding")
    document.getElementById("inr_input").addEventListener('keyup', submit);
    document.getElementById("input_roe_inr_to_usd").addEventListener('keyup', submit);
    submit()
}

function submit() {
    const inputINR = document.getElementById("inr_input").value;
    const absINRElem = document.getElementById("absolute_inr");
    const exchangeRate = parseFloat(document.getElementById("input_roe_inr_to_usd").value);
    const usd_output_p = document.getElementById("usd_output");

    let intINRValue = convertIndianCurrencyToNumber(inputINR);

    absINRElem.textContent = ''
    absINRElem.appendChild(document.createTextNode("abs INR: Rs. " + intINRValue));
    absINRElem.appendChild(document.createElement("br"))
    absINRElem.appendChild(document.createTextNode(formatCommaINStandard(intINRValue)));
    absINRElem.appendChild(document.createElement("br"))
    console.log(priceToIndianWords(intINRValue))
    absINRElem.appendChild(document.createTextNode(priceToIndianWords(intINRValue)))
    const outputUSD = intINRValue * exchangeRate
    usd_output_p.textContent = '';
    usd_output_p.appendChild(document.createTextNode(`usd_output: \$ ${formatCommaUSStandard(outputUSD)}`));
    usd_output_p.appendChild(document.createElement("br"))
    usd_output_p.appendChild(document.createTextNode(convertToInternationalCurrencySystem(outputUSD)));
    usd_output_p.appendChild(document.createElement("br"))
    console.log(numberToUSWords(outputUSD))
    usd_output_p.appendChild(document.createTextNode(numberToUSWords(outputUSD)));

}

function convertToInternationalCurrencySystem(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions
        : Math.abs(Number(labelValue)) >= 1.0e+6
            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3
                ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
                : Math.abs(Number(labelValue));
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

function priceToIndianWords(price) {
    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
        dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
        tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
        handle_tens = function (dgt, prevDgt) {
            return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
        },
        handle_utlc = function (dgt, nxtDgt, denom) {
            return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
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
                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
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
                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
        }
        str = words.reverse().join("")
    } else str = "";
    return str

}

var numberToUSWords = function (num) {
    const translations = new Map([
        [1000000000, 'Billion'],
        [1000000, 'Million'],
        [1000, 'Thousand'],
        [100, 'Hundred'],
        [90, 'Ninety'],
        [80, 'Eighty'],
        [70, 'Seventy'],
        [60, 'Sixty'],
        [50, 'Fifty'],
        [40, 'Forty'],
        [30, 'Thirty'],
        [20, 'Twenty'],
        [19, 'Nineteen'],
        [18, 'Eighteen'],
        [17, 'Seventeen'],
        [16, 'Sixteen'],
        [15, 'Fifteen'],
        [14, 'Fourteen'],
        [13, 'Thirteen'],
        [12, 'Twelve'],
        [11, 'Eleven'],
        [10, 'Ten'],
        [9, 'Nine'],
        [8, 'Eight'],
        [7, 'Seven'],
        [6, 'Six'],
        [5, 'Five'],
        [4, 'Four'],
        [3, 'Three'],
        [2, 'Two'],
        [1, 'One'],
    ]);

    if (num === 0) {
        return 'Zero';
    }

    if (num <= 20) {
        return translations.get(num);
    }

    let result = [];

    for (let [value, translation] of translations) {
        const times = Math.floor(num / value);

        if (times === 0) {
            continue;
        }

        num -= times * value;

        if (times === 1 && value >= 100) {
            result.push('One', translation);
            continue;
        }

        if (times === 1) {
            result.push(translation);
            continue;
        }

        result.push(numberToUSWords(times), translation);
    }

    return result.join(' ');
}
