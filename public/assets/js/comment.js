// const newFormHandler = async (event) => {
//   event.preventDefault();

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

// const newFormHandler = async (event) => {
//   event.preventDefault();

//   await fetch(`/api/comments`, {
//     method: "POST",
//     body: JSON.stringify({
//       title,
//       body,
//     }),
//     headers: { "Content-Type": "application/json" },
//   });
//   commentPosts.push();
// };
var newCommentid = document.getElementById("new-comment");
var commentHolderDiv = document.getElementById("comment-holder");
var submitComment = document.getElementById("comment-button");
function renderComments() {
  event.preventDefault();
  var newComment = newCommentid.value;
  newCommentid.value = "";
  var commentDiv = document.createElement("div");
  commentDiv.classList.add("form-group");
  var textArea = document.createElement("textarea");
  textArea.rows = 3;
  textArea.classList.add("form-control", "commentbox");
  // textArea.setAttribute("readonly");
  textArea.innerHTML = newComment;
  commentDiv.appendChild(textArea);
  commentHolderDiv.appendChild(commentDiv);
}

submitComment.addEventListener("click", renderComments);
