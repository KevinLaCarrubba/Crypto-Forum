var newCommentid = document.getElementById("new-comment");
var commentHolderDiv = document.getElementById("comment-holder");
var submitComment = document.getElementById("comment-button");

const findUserId = async (event) => {
  await fetch(`api/users/login_user`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    //get the watchlist of the user logged in
    .then(function (data) {
      // console.log(data);
      userId = data.user_id;
      console.log(userId);
      // getWatchList();
    });
};

findUserId();

const showOldComments = async (event) => {
  await fetch(`/api/comments`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (renderComment) {
      console.log(renderComment);
      renderComment.forEach((comment) => {
        // console.log(comment);
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        var headerDiv = document.createElement("div");
        headerDiv.classList.add(
          "card-header",
          "d-flex",
          "justify-content-between"
        );
        headerDiv.setAttribute("id", "comment-username");
        var userName = document.createTextNode("Username here");
        headerDiv.appendChild(userName);
        var deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("id", "delete-comment");
        deleteBtn.setAttribute("aria-label", "Close");
        deleteBtn.classList.add("close");
        var createButtonSpan = document.createElement("span");
        createButtonSpan.setAttribute("aria-hidden", "true");
        var buttonText = document.createTextNode(`×`);
        createButtonSpan.appendChild(buttonText);
        deleteBtn.appendChild(createButtonSpan);
        headerDiv.appendChild(deleteBtn);
        var cardBodyDiv = document.createElement("div");
        cardBodyDiv.classList.add("card-body");
        var blockquote = document.createElement("blockquote");
        blockquote.classList.add("blockquote", "mb-0");
        var createP = document.createElement("p");
        var createCommentText = document.createTextNode(comment.body);
        createP.appendChild(createCommentText);
        blockquote.appendChild(createP);
        cardBodyDiv.appendChild(blockquote);
        cardDiv.appendChild(headerDiv);
        cardDiv.appendChild(cardBodyDiv);

        deleteBtn.addEventListener("click", function (event) {
          event.preventDefault();
          deleteComments(comment.id);
        });
        commentHolderDiv.appendChild(cardDiv);
      });
    });
};

const newCommentAdd = async (event) => {
  // event.preventDefault();
  var commentAdd = newCommentid.value;
  // console.log(newName);
  await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({
      body: commentAdd,
    }),
    headers: { "Content-Type": "application/json" },
  });
};

function deleteComments(id) {
  // console.log("hello");

  fetch("/api/comments/" + id, {
    method: "delete",
  })
    .then(function (data) {
      console.log(data);
      location.reload();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function renderComments(event) {
  event.preventDefault();
  var newComment = newCommentid.value;
  var cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  var headerDiv = document.createElement("div");
  headerDiv.classList.add("card-header", "d-flex", "justify-content-between");
  headerDiv.setAttribute("id", "comment-username");
  var userName = document.createTextNode("Username here");
  headerDiv.appendChild(userName);
  var deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.setAttribute("id", "delete-comment");
  deleteBtn.setAttribute("aria-label", "Close");
  deleteBtn.classList.add("close");
  var createButtonSpan = document.createElement("span");
  createButtonSpan.setAttribute("aria-hidden", "true");
  var buttonText = document.createTextNode(`×`);
  createButtonSpan.appendChild(buttonText);
  deleteBtn.appendChild(createButtonSpan);
  headerDiv.appendChild(deleteBtn);
  var cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");
  var blockquote = document.createElement("blockquote");
  blockquote.classList.add("blockquote", "mb-0");
  var comment = document.createElement("p");
  comment.innerHTML = newComment;
  blockquote.appendChild(comment);
  cardBodyDiv.appendChild(blockquote);
  cardDiv.appendChild(headerDiv);
  cardDiv.appendChild(cardBodyDiv);
  deleteBtn.addEventListener("click", function (event) {
    event.preventDefault();
    deleteComments(comment.id);
  });
  commentHolderDiv.appendChild(cardDiv);
  newCommentAdd();
  newCommentid.value = "";
}

showOldComments();

submitComment.addEventListener("click", renderComments);
