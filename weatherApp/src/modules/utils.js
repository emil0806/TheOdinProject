function getDataFromForm() {
  const input = document.querySelector("#cityInput");
  const cityName = input.value;
  if (cityName) {
    return cityName
      .replace(/(\s+$|^\s+)/g, "")
      .replace(/(,\s+)/g, ",")
      .replace(/(\s+,)/g, ",")
      .replace(/\s+/g, "+");
  } else {
    return "";
  }
}

function capatilize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { getDataFromForm, capatilize };
