var searchBarInfo = [];
var watchListData = [];
var searchButton = document.getElementById("search-button");
var searchValue = document.getElementById("main-search");
var coinNameEL = document.getElementById("coinName");
var modalBody = document.querySelector(".modal-body");
var closeButton = document.getElementById("close-modal");

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
      watchListData.push(searchBarApiData);
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
  // watchListData.push(searchBarInfo[0].name);
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

var addButton = document.getElementById("add-to-watchlist");
var watchListMainAppend = document.getElementById("watch-list");

//add event listener to add to watchlist button
addButton.addEventListener("click", newWatchlistItem);
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  watchListData = [];
});
// event.preventDefault();
//   console.log(watchListData);
//   if (watchListData) {
//     const response = await fetch("api/watchlist", {
//       method: "POST",
//       body: JSON.stringify({ coinName, user_id }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       renderWatchlist();
//     } else {
//       alert(response.statusText);
//     }
//   }
// renderWatchlist();
// watchListData = [];
var cardDiv = document.getElementById("card-list");
function newWatchlistItem() {
  var createCardUl = document.createElement("ul");
  createCardUl.classList.add("list-group");
  console.log(watchListData);
  event.preventDefault();
  watchListData.forEach((item) => {
    //
    // var createCardDiv = document.createElement("div");
    // createCardDiv.classList.add("card");

    var createCardLi = document.createElement("li");
    createCardLi.classList.add("list-group-item");
    var createCardLink = document.createElement("a");
    var createcoinImg = document.createElement("img");
    createcoinImg.classList.add("card-image");
    createcoinImg.src = item.image;
    var urlText = document.createTextNode(
      `${item.name}    Current price: $${item.currentPrice}    24-Hour Low: $${item.lowPrice}    24-Hour High: $${item.highPrice}`
    );
    createCardLink.appendChild(createcoinImg);
    createCardLink.appendChild(urlText);
    createCardLink.href = `https://coinmarketcap.com/currencies/${item.name}/`;
    createCardLi.appendChild(createCardLink);
    createCardUl.appendChild(createCardLi);
    cardDiv.appendChild(createCardUl);

    // createCardDiv.appendChild(watchListMainAppend);
  });

  watchListData = [];
}
