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
var commentPosts = [];
// var commentBodyEl = document.getElementbyId("comment-body");

const newFormHandler = async (event) => {
  event.preventDefault();

  await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { "Content-Type": "application/json" },
  });
  commentPosts.push();
};

function renderComments() {
  var commentHolder = document.createElement("div");
  commentHolder.id = "comment-holder";

  var commentDiv = document.createElement("div");
  commentDiv.classList.add("form-group", "purple-border");

  commentBodyEl.appendChild(commentHolder);
  commentBodyEl.appendChild(commentDiv);

  var commentLabel = document.createElement("label");
  var lableText = document.createTextNode(`${commentPosts.name}`);
  commentLabel.appendChild(lableText);

  var commentTextArea = document.createElement("textarea");
  commentTextArea.classList.add("form-control", "commentbox");
  commentTextArea.id = "exampleFormControlTextarea4";
  commentTextArea.rows = "3";
  var commentText = document.createTextNode(`${commentPosts.body}`);
  commentTextArea.appendChild(commentText);

  // <div id="comment-holder">
  //   <div class="form-group purple-border">
  //     <label for="userName">User name</label>
  //     <textarea
  //       class="form-control commentbox"
  //       id="exampleFormControlTextarea4"
  //       rows="3"
  //       readonly
  //     >
  //       Bitcoin to the moon !
  //     </textarea>
  //   </div>
  //   ​
  // </div>;
}
