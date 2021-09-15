// var autoSearch = [];
// function searchFiller() {
//   var ticker = "https://api.coingecko.com/api/v3/coins/list";
//   fetch(ticker)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       for (var i = 0; i < data.length; i++) {
//         var coinName = data[i].name;
//         autoSearch.push(coinName);
//       }
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// }
// searchFiller();
