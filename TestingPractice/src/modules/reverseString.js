function reverseString(string) {
  let tempArr = string.split("");
  let reverseArr = tempArr.reverse();
  let newString = reverseArr.join("");

  return newString;
}

export default reverseString;
