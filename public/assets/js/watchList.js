var watchListInfo = [];
var searchButton = document.getElementById("search-button");
var searchValue = document.getElementById("main-search");

searchButton.addEventListener("click", watchList);

function watchList() {
  event.preventDefault();
  var watchListData = searchValue.value.trim().toLowerCase();
  var apiData = "https://api.coingecko.com/api/v3/coins/" + watchListData;

  fetch(apiData)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var coinImage = data.image.small;
      var coinName = data.name;
      var coinPrice = data.market_data.current_price.usd;
      var coinHigh = data.market_data.high_24h.usd;
      var coinLow = data.market_data.low_24h.usd;
      var watchlistApiData = {
        image: coinImage,
        name: coinName,
        currentPrice: coinPrice,
        highPrice: coinHigh,
        lowPrice: coinLow,
      };
      watchListInfo.push(watchlistApiData);
      console.log(watchListInfo);
    })
    // .then(function () {
    //   renderModal();
    // })
    .catch(function (err) {
      console.error(err);
    });
}

// function renderModal() {

// }

// function renderWatchlist() {

// }
