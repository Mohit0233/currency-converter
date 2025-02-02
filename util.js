function commaUSStandard(n) {
  if (typeof n === 'string') n = Number(n);
  if (n.toString().length <= 3) return n;
  return n.toLocaleString('en-US');
}

function commaINStandard(n) {
  if (typeof n === 'string') n = Number(n)
  if (n.toString().length <= 4) return n;
  return n.toLocaleString('en-IN');
}

function countLastZeros(str) {
  if (typeof str !== 'string') {
    throw new Error("for countZero() Input must be a string.");
  }

  let zeroCount = 0;
  for (let i = str.length - 1; i > 0; i--) {
    if (str[i] === '0') {
      zeroCount++;
    } else {
      break;
    }
  }
  return zeroCount;
}


function assert(actual, expected) {
  const actual_colored = 'actual:';
  const expected_color = 'expected:';
  if (actual !== expected) {
    if (actual.toString() === expected.toString()) {
      console.error(actual_colored, actual, ' != ', expected_color, expected, " (Type Mismatch: ", typeof actual + " != " + typeof expected + ")");
    }
    console.error(actual_colored, actual, ' != ', expected_color, expected);
  }
}


function testCountLastZeros() {
  assert(countLastZeros("23420000000"), 7)
  assert(countLastZeros("2342000230000"), 4)
  assert(countLastZeros("101011010101"), 0)
}

testCountLastZeros()