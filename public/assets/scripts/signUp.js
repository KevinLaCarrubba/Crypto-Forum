const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document
    .querySelector("#username-input-signup")
    .value.trim();
  const email = document.querySelector("#email-input-signup").value.trim();
  const password = document
    .querySelector("#password-input-signup")
    .value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users/signUp", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
