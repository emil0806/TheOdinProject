function analyzeArray(arr) {
  let tempMax = arr[0];
  let tempMin = arr[0];
  let tempSum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > tempMax) {
      tempMax = arr[i];
    }
    if (arr[i] < tempMin) {
      tempMin = arr[i];
    }
    tempSum += arr[i];
  }
  let length = arr.length;
  let min = tempMin;
  let max = tempMax;
  let average = tempSum / length;

  return { average: average, min: min, max: max, length: length };
}

export default analyzeArray;
