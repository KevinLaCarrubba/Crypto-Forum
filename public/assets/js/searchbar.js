var searchBarInfo = [];
var watchListData = [];
var watchListDB = [];
var searchButton = document.getElementById("search-button");
var searchValue = document.getElementById("main-search");
var coinNameEL = document.getElementById("coinName");
var modalBody = document.querySelector(".modal-body");
var closeButton = document.getElementById("close-modal");
var cardDiv = document.getElementById("card-list");
var addButton = document.getElementById("add-to-watchlist");
var watchListMainAppend = document.getElementById("watch-list");
var loginStatus = document.getElementById("login-status");

searchButton.addEventListener("click", searchBar);

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

addButton.addEventListener("click", newWatchlistItem);
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  watchListData = [];
});

const newUserId = async (event) => {
  await fetch(`api/users/login_user`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      userId = data.user_id;
      getWatchList();
    });
};

const getWatchList = async (event) => {
  await fetch("api/watchlist/" + userId, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (list) {
      // console.log(list.Watchlists);
      var coinNames = [];
      for (i = 0; i < list.Watchlists.length; i++) {
        var name = list.Watchlists[i].coinName;
        coinNames.push(name);
        // console.log(coinNames);
      }
      return coinNames;
    })
    .then(function (render) {
      // console.log(render);
      var createCardUl = document.createElement("ul");
      createCardUl.classList.add("list-group");
      render.forEach((coin) => {
        var createCardLi = document.createElement("li");
        createCardLi.classList.add("list-group-item");
        var createCardLink = document.createElement("a");
        var urlText = document.createTextNode(`${coin}`);
        createCardLink.appendChild(urlText);
        createCardLink.href = `https://coinmarketcap.com/currencies/${coin}/`;
        createCardLi.appendChild(createCardLink);
        createCardUl.appendChild(createCardLi);
        cardDiv.appendChild(createCardUl);
      });
    });
};

newUserId();

const newListItem = async (event) => {
  // event.preventDefault();
  var newName = watchListData[0].name.toLowerCase();
  console.log(newName);
  await fetch(`/api/watchlist`, {
    method: "POST",
    body: JSON.stringify({
      coinName: newName,
    }),
    headers: { "Content-Type": "application/json" },
  });
};

function newWatchlistItem() {
  var createCardUl = document.createElement("ul");
  createCardUl.classList.add("list-group");
  // console.log(watchListData);
  event.preventDefault();

  watchListData.forEach((item) => {
    var createCardLi = document.createElement("li");
    createCardLi.classList.add("list-group-item");
    var createCardLink = document.createElement("a");
    // var createcoinImg = document.createElement("img");
    // createcoinImg.classList.add("card-image");
    // createcoinImg.src = item.image;
    var urlText = document.createTextNode(`${item.name}`);
    // createCardLink.appendChild(createcoinImg);
    createCardLink.appendChild(urlText);
    createCardLink.href = `https://coinmarketcap.com/currencies/${item.name}/`;
    createCardLi.appendChild(createCardLink);
    createCardUl.appendChild(createCardLi);
    cardDiv.appendChild(createCardUl);
  });
  newListItem();
  watchListData = [];
}
