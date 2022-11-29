function saveToLocalStorage(obj) {
  localStorage.setItem("userSettings", JSON.stringify(obj));
}

function getFromLocalStorage(obj) {
  const data = JSON.parse(localStorage.getItem("userSettings"));
  const { city, lang, mode, modeSign } = data;
  obj.city = city;
  obj.lang = lang;
  obj.mode = mode;
  obj.modeSign = modeSign;
}

export { saveToLocalStorage, getFromLocalStorage };
