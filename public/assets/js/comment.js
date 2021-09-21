// const newFormHandler = async (event) => {
//   event.preventDefault();

// const { response } = require("express");

//   const title = document.querySelector('input[name="comment-title"]').value;
//   const body = document.querySelector('textarea[name="comment-body"]').value;

//   await fetch(`/api/post`, {
//     method: 'POST',
//     body: JSON.stringify({
//       title,
//       body,
//     }),
//     headers: { 'Content-Type': 'application/json' },
//   });

//   document.location.replace('/index.html');
// };

// document
//   .querySelector('#new-comment-form')
//   .addEventListener('submit', newFormHandler);

// var commentHold = document.getElementbyId("comment-holder");
// var commentBodyEl = document.getElementbyId("comment-body");
// var commentPosts = [];

var newCommentid = document.getElementById("new-comment");
var commentHolderDiv = document.getElementById("comment-holder");
var submitComment = document.getElementById("comment-button");

const showOldComments = async (event) => {
  // event.preventDefault();

  await fetch(`/api/comments`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    // .then(function (comment) {
    //   console.log(comment);
    //   var commentData = [];
    //   for (i = 0; i < comment.length; i++) {
    //     var commentLoop = comment[i].body;
    //     commentData.push(commentLoop);
    //   }
    //   return commentData;
    // })


<div class="card">
                  <div class="card-header d-flex justify-content-between" id="comment-username">
                    UserName
                    <button type="button" class="close" id="delete-comment" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="card-body">
                    <blockquote class="blockquote mb-0">
                      <p class = "comment-data">Comment entered here</p> 
                    </blockquote>
                  </div>
                </div>

    .then(function (renderComment) {
      renderComment.forEach((comment) => {
        // console.log(comment);
        var div = document.createElement("div");
        div.classList.add("form-group");
        var text = document.createElement("textarea");
        text.rows = 3;
        text.classList.add("form-control", "commentbox");
        text.innerHTML = comment.body;

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", function (event) {
          event.preventDefault();
          deleteComments(comment.id);
        });
        commentHolderDiv.appendChild(deleteBtn);
        div.appendChild(text);
        commentHolderDiv.appendChild(div);
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
  console.log("hello");
  // needs to change the URL dynamcally based where its being hosted.
  // this wont work in Heroku because it is hard coded to localhost

  fetch("http://localhost:3001/api/comments/" + id, {
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

  var commentDiv = document.createElement("div");
  commentDiv.classList.add("form-group");
  var textArea = document.createElement("textarea");
  textArea.rows = 3;
  textArea.classList.add("form-control", "commentbox");
  // textArea.setAttribute("readonly");
  textArea.innerHTML = newComment;
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", function (event) {
    event.preventDefault();
    deleteComments(comments.id);
  });
  commentHolderDiv.appendChild(deleteBtn);
  commentDiv.appendChild(textArea);
  commentHolderDiv.appendChild(commentDiv);
  newCommentAdd();
  newCommentid.value = "";
}

showOldComments();

submitComment.addEventListener("click", renderComments);
