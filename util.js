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

function assert(actual, expected) {
  if (actual !== expected) console.error(' actual:', actual, '\n', 'expected:', expected);
}