let URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
let URL2 = "https://latest.currency-api.pages.dev/v1/currencies/usd.json"


async function currencies() {
    let p1;
    try {
        p1 = await fetch(URL)
    }
    catch (err) {
        p1 = await fetch(URL2)
    }
currency1="inr"
currency2="usd"
    let data = await p1.json();
    console.log(data[currency2][currency1]);

}

currencies()
