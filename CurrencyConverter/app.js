const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const NEWBASE =
  "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("form button");

//Get list of all the country in select options
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = currCode;
    newOptions.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOptions.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOptions.selected = "selected";
    }
    select.append(newOptions);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//Update the flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  console.log(newSrc);
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

//Update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amountVal.value = 1;
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = (
    data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()] *
    parseInt(amount.value)
  ).toFixed(2);
  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
