const newFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="comment-title"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;

  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/index.html');
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', newFormHandler);
