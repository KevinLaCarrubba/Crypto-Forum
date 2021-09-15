var tickerInfo = [];

function cryptoTicker() {
  var ticker =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=falseg";
  //fetch the data from the api
  fetch(ticker)
    //return as json
    .then(function (response) {
      return response.json();
    })
    //loop through data by the length
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        //set variables for needed information
        var coinName = data[i].id;
        var coinSymbol = data[i].symbol;
        var currentPrice = data[i].current_price;
        var coinImage = data[i].image;
        //put into an object
        var tickerObj = {
          name: coinName,
          symbol: coinSymbol,
          price: currentPrice,
          image: coinImage,
        };
        //push object into the global array
        tickerInfo.push(tickerObj);
      }
    })
    //run renderTicker();
    .then(function () {
      renderTicker();
    })
    .catch(function (err) {
      console.error(err);
    });
}
cryptoTicker();
//get marquee element by id
var ticker = document.getElementById("ticker");
//function to renderTicker
function renderTicker() {
  //loop through tickerInfo array
  tickerInfo.forEach((item) => {
    var createDiv = document.createElement("div");
    createDiv.classList.add("d-inline");
    var createUrl = document.createElement("a");
    var tickerImg = document.createElement("img");
    tickerImg.classList.add("imgSize");
    tickerImg.src = item.image;
    var urlText = document.createTextNode(
      `     ${item.symbol.toUpperCase()}: $${item.price}       `
    );
    createUrl.appendChild(tickerImg);
    createUrl.appendChild(urlText);
    createUrl.href = `https://coinmarketcap.com/currencies/${item.name}/`;
    createDiv.appendChild(createUrl);
    ticker.appendChild(createDiv);
  });
}
