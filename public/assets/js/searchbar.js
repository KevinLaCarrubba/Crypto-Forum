var searchBarInfo = [];
var searchButton = document.getElementById("search-button");
var searchValue = document.getElementById("main-search");
var coinNameEL = document.getElementById("coinName");
var modalBody = document.querySelector(".modal-body");

searchButton.addEventListener("click", searchBar);
// console.log(searchBarInfo);
function searchBar() {
  event.preventDefault();
  var searchBarData = searchValue.value.trim().toLowerCase();
  searchBarData = searchBarData.replace(/\s+/g, "-");
  var apiData = "https://api.coingecko.com/api/v3/coins/" + searchBarData;
  searchValue.value = "";
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
      var searchBarApiData = {
        image: coinImage,
        name: coinName,
        currentPrice: coinPrice,
        highPrice: coinHigh,
        lowPrice: coinLow,
      };
      searchBarInfo.push(searchBarApiData);
      renderModal();
      searchBarInfo = [];
    })
    .catch(function (err) {
      console.error(err);
    });
}

function renderModal() {
  clearModal();
  var coinImage = document.createElement("img");
  coinImage.classList.add("modal-image");
  coinImage.src = searchBarInfo[0].image;
  var titleText = document.createTextNode(`${searchBarInfo[0].name}`);
  watchListData.push(searchBarInfo[0].name);
  coinNameEL.appendChild(coinImage);
  coinNameEL.appendChild(titleText);
  var ul = document.createElement("ul");
  var currentPriceLine = document.createElement("li");
  var currentPriceText = document.createTextNode(
    `Current Price: $${searchBarInfo[0].currentPrice}`
  );
  currentPriceLine.appendChild(currentPriceText);

  var coinLowLine = document.createElement("li");
  var coinLowText = document.createTextNode(
    `24 hour Low: $${searchBarInfo[0].lowPrice}`
  );
  coinLowLine.appendChild(coinLowText);

  var coinHighLine = document.createElement("li");
  var coinHighText = document.createTextNode(
    `24 Hour High: $${searchBarInfo[0].highPrice}`
  );
  coinHighLine.appendChild(coinHighText);

  ul.appendChild(currentPriceLine);
  ul.appendChild(coinLowLine);
  ul.appendChild(coinHighLine);

  modalBody.appendChild(ul);
}

function clearModal() {
  coinNameEL.innerHTML = "";
  modalBody.innerHTML = "";
}

watchListData = [];
var addButton = document.getElementById("add-to-watchlist");
var watchListMainApped = document.getElementById("watch-list");

//add event listener to add to watchlist button
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  // console.log(watchListData);
  //clear out watchlist data
  watchListData = [];
});
