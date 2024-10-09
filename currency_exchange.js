let fromCurrency = "usd";
let toCurrency = "inr";

// adding more currency options 
const dropdown = document.querySelectorAll(".dropdown select");
// there are 2 objects in dropdown class because we have created 2 'select' tags in dropdown tag('from' and 'to')
const updateExchangeRate=async()=>{
    let p1;
    try {
        let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`
        // editing url to change from currency at run time 
        p1 = await fetch(URL);
    }
    catch (err) {
        let URL2 = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`
        p1 = await fetch(URL2);
    }
    // creating fall back in case 1st URL is not working 

    let data = await p1.json();
    let convoRate = data[fromCurrency][toCurrency];
    document.querySelector("#result").innerText = document.querySelector("#input").value * convoRate+" "+toCurrency.toUpperCase();
    // innerText does not work with input tag
}

window.addEventListener("load", async ()=>{

    updateExchangeRate();

})

for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        // here we created new option tag to store new currency options 
        newOption.innerText = currCode;
        // adding new currency options to newly made option tag
        newOption.value = currCode;
        // assigning value to newly created option tag

        if (select.name == "from" && currCode == "USD") {
            newOption.selected = "selected";
            // making USD as default currency in 'from' select tag 
        }
        if (select.name == "to" && currCode == "INR") {
            newOption.selected = "selected";
            // making INR as default currency in 'to' select tag
        }
        select.append(newOption);
    }
    // changing image of flag every time we change country 
    select.addEventListener("change", (evt) => {
        // evt is the object it has all info regarding event type, target, etc. 
        updateFlag(evt.target);
        // evt.target holds the html tag that is getting changed 
    }
        // whenever a change is detected updateFlag() function will be called 
    )
}

const updateFlag = (element) => {
    let currCode = element.value;
    // getting new currency code 
    let countryCode = countryList[currCode];
    // finding country code from currency code
    let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    // accessing img tag inside the parent element of select tag 
    img.src = newLink;
    // giving new image link to img tag
    if (element.name == "from") {
        fromCurrency = currCode.toLowerCase();
    }
    if (element.name == "to") {
        toCurrency = currCode.toLowerCase();
    }
}

async function currencyConvert(event) {
    event.preventDefault();
    /*
    this function will prevent default behavior of tag from occuring however in this case '.preventDefault()' function will 
    only prevent reloding of page after button click because function is being called after the form is submitted 
    */
    // on clicking button page will not reload 
    updateExchangeRate();
    
}let btn = document.querySelector("#btn");
btn.addEventListener("click", currencyConvert);
