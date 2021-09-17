var autoSearch = [];
var searchValue = document.getElementById("main-search");
var autoCompleteResults = document.querySelector(".autocomplete-box");
function searchFiller() {
  var ticker = "https://api.coingecko.com/api/v3/coins/list";
  fetch(ticker)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var coinName = data[i].name.toLowerCase();
        autoSearch.push(coinName);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}
searchFiller();
//get searchvalue the key is pressed
searchValue.onkeyup = (e) => {
  //set userInput variable to key pressed targer
  let userInput = e.target.value;
  console.log(userInput);
  //set an empty array to put possibilities into
  let typingArray = [];
  if (userInput) {
    //if there is any input filter thru autoSearch array depending on data entered
    typingArray = autoSearch.filter((data) => {
      //return in lowercase only words that startWith(userInput)
      return data.toLowerCase().startsWith(userInput.toLowerCase());
    });
  } else {
  }
  showPossible(typingArray);
};

function showPossible(list) {
  autoCompleteResults.innerHTML = "";
  var createUl = document.createElement("ul");
  createUl.classList.add("searchResults");
  list.forEach((text, key) => {
    var createLi = document.createElement("li");
    //create class for li
    createLi.classList.add("populate-search-bar", "mr-sm-1");
    //add data attribute
    createLi.setAttribute("id", `li#${key}`);

    createLi.innerHTML = text;
    createUl.appendChild(createLi);
  });

  autoCompleteResults.appendChild(createUl);
}
//onclick listener
document.body.addEventListener("click", liSelect);
function liSelect(event) {
  console.log(event);
  if (!event.target.classList.contains("populate-search-bar")) {
    return;
  }
  var fillText = event.target.innerHTML;
  console.log(fillText);
  searchValue.value = fillText;
}
