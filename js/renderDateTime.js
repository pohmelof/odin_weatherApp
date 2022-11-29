const getDateData = function (offset = 0, lang = "en", dt = undefined) {
  const date =
    dt === undefined
      ? new Date(new Date().getTime() + offset * 1000)
      : new Date(new Date(dt).getTime() + offset * 1000);
  let hh = date.getUTCHours();
  let mm = date.getUTCMinutes();
  let ss = date.getUTCSeconds();
  const monthsRu = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const month =
    lang === "ru"
      ? monthsRu[date.getUTCMonth()]
      : date.toLocaleString(lang, { month: "long" });
  const weekday = date.toLocaleString(lang, { weekday: "long" });
  const day = date.getUTCDate();

  if (hh < 10) hh = "0" + hh;
  if (mm < 10) mm = "0" + mm;
  if (ss < 10) ss = "0" + ss;

  return { hh, mm, ss, month, weekday, day };
};

const renderDateTime = function (offset, lang, dt) {
  const dateTime = getDateData(offset, lang, dt);
  const { hh, mm, ss, month, weekday, day } = dateTime;
  document.querySelector(".time").innerText = `${hh}:${mm}:${ss}`;
  document.querySelector(".date-month").innerText =
    lang === "ru"
      ? `${day} ${month}, ${weekday} `
      : `${weekday}, ${month} ${day}`;
};

export { renderDateTime, getDateData };
