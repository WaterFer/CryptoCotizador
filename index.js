//selectores
const coin = document.querySelector('#coin')
const crypto = document.querySelector('#crypto')
const form = document.querySelector('#form')
const coinInfo = document.querySelector('#coin-info')
const monto = document.querySelector('#monto')

// events
form.addEventListener('submit', async e => {
    e.preventDefault();
        coinInfo.innerHTML = `<div class="loader"></div>`
    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const montoValue = monto.value;
    const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`
    const response = await (await fetch(URL,{method: 'GET'})).json();
    const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
    const high = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
    const low = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
    const changePerentage = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;


    if (!montoValue) {
        coinInfo.innerHTML = `<p>el precio actual <span class="coin-value">${price}</span></p>
<p>el precio mas alto<span class="coin-value">${high}</span></p>
<p>el precio mas bajo<span class="coin-value">${low}</span></p>
<p>diferencia 24h:<span class="coin-value">${changePerentage}</span></p>`
    } else {
        const PriceRaw = response.RAW[cryptoSelected][coinSelected].PRICE;
        const result = (montoValue / PriceRaw).toFixed(4);
    coinInfo.innerHTML = `<p>el precio actual <span class="coin-value">${price}</span></p>
                        <p>el precio mas alto<span class="coin-value">${high}</span></p>
                        <p>el precio mas bajo<span class="coin-value">${low}</span></p>
                        <p>diferencia 24h:<span class="coin-value">${changePerentage}</span></p>
                        <p>Puedes comprar:<span class="coin-value">${result} ${cryptoSelected}</span></p>
                        `

    }

});