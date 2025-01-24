let BASE_URL = ""

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const exchangeIcon = document.getElementById("Exchange_Icon");
// console.log(dropdowns)

// for(let code in countryList){
//     console.log(code, countryList[code])
// }

for(let select of dropdowns){
    for(let currencyCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerHTML = currencyCode
        newOption.value = currencyCode
        if(select.name === "from" && currencyCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption)
    }    
    select.addEventListener("change", (evt) => {
        updateFlage(evt.target);
    })
}
const updateExchangeRate = () => {
    let amount = document.querySelector("form input").value;

    const dropdowns = document.querySelectorAll(".dropdown select");

    const selectedFrom = dropdowns[0]?.value.toLowerCase(); 
    const selectedTo = dropdowns[1]?.value.toLowerCase();   

    console.log("From:", selectedFrom);
    console.log("To:", selectedTo);

    BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedFrom}.json`;
    fetch(BASE_URL).then( (response) =>{
        return response.json()
    })
    .then( (data) =>{
        let ExchangeRate = amount * data[selectedFrom][selectedTo];
        let msg = document.getElementById("msg");
        msg.innerText = `${amount} ${selectedFrom.toUpperCase()} = ${ExchangeRate} ${selectedTo.toUpperCase()}`
    })
    .catch( (err) => {
        console.log(err)
    })
}

const swapCurrencyRate = () => {
    // Get the input value for the amount
    let amount = document.querySelector("form input").value;

    // Get the dropdown elements and their selected values
    const dropdowns = document.querySelectorAll(".dropdown select");
    const selectedFrom = dropdowns[0].value.toLowerCase(); // From currency value
    const selectedTo = dropdowns[1].value.toLowerCase();   // To currency value
    
    // Get the image elements for the flags
    const flagImages = document.querySelectorAll(".dropdown img");
    const fromFlag = flagImages[0]; // From currency flag
    const toFlag = flagImages[1];   // To currency flag

    // Swap the selected currencies in the dropdowns
    dropdowns[0].value = selectedTo.toUpperCase();
    dropdowns[1].value = selectedFrom.toUpperCase();

    // Swap the flag images
    const tempSrc = fromFlag.src;
    fromFlag.src = toFlag.src;
    toFlag.src = tempSrc;

    // Update the exchange rate logic
    const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedTo}.json`;
    fetch(BASE_URL)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = amount * data[selectedTo][selectedFrom];
            const msg = document.getElementById("msg");
            msg.innerText = `${amount} ${selectedTo.toUpperCase()} = ${exchangeRate} ${selectedFrom.toUpperCase()}`;
        })
        .catch(err => {
            console.log(err);
        });
};


const updateFlage = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

exchangeIcon.addEventListener("click",swapCurrencyRate);

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
}); 

window.addEventListener('load', () => {
    updateExchangeRate();
})