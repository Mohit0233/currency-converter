let commaUSStandard = function (n) {
  if (typeof n === 'string') n = Number(n);
  if (n.toString().length === 3) return n;
  return n.toLocaleString('en-US');
}

function commaINStandard(n) {
  if (typeof n === 'string') n = Number(n)
  if (n.toString().length === 3) return n;
  return n.toLocaleString('en-IN');
}