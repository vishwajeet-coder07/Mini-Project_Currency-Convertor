const BASE_URL = "https://api.exchangerate.host";
const API_KEY = "4b7453ca287f16e11cbf16dd1593145f";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector("#from");
const toCurrency = document.querySelector("#to");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        if (select.name === "from-currency" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to-currency" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
};


const updateFlag = (element) => {
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".Amount input").value;

    if (amount === "" || amount < 1) {
        alert("Please enter a valid amount");
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

const URL = `${BASE_URL}/convert?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`;

try {
  let response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  let data = await response.json();

  if (!data.success) {
    throw new Error(`API error: ${data.error ? data.error.info : 'Unknown error'}`);
  }

  let finalAmount = data.result;
  msg.innerText = `${amount} ${from} = ${finalAmount.toFixed(2)} ${to}`;

} catch (error) {
  console.error("Fetch/Conversion error:", error);
  msg.innerText = `Error: ${error.message}`;
}
});

