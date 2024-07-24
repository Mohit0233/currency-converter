console.log('util.js')
let commaUSStandard = function (n) {
  let commaSeparated = n.toLocaleString('en-US')
  return commaSeparated.slice(0, 2).replace(",", "") + commaSeparated.slice(2);
}

// function commaINStandard(n) {
//   let commaSeparated = n.toLocaleString('en-IN');
//   console.log('commaSeparated', commaSeparated)
//   return commaSeparated.slice(0, 2).replace(",", "") + commaSeparated.slice(2);
// }

let commaINStandard = function (n) {
  // Convert the number to a string formatted with commas according to the Indian numbering system
  let commaSeparated = n.toLocaleString('en-IN');
  console.log('inside util.js commaSeparated:', commaSeparated);

  // Handle cases where the number has fewer than three digits before the first comma
  if (commaSeparated.length <= 2) {
    return commaSeparated;
  }

  // Remove the first comma if it's in the third position
  // if (commaSeparated[2] === ',') {
  //   commaSeparated = commaSeparated.slice(0, 2) + commaSeparated.slice(3);
  // }

  return commaSeparated;
}