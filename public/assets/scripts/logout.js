const logout = async function () {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out");
  }
};

const logoutrun = async (event) => {
  // event.preventDefault();

  await fetch(`api/users/login_user`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      userId = data.user_id;
      if (userId) {
        loginStatus.classList.add("logout");
        loginStatus.innerHTML = "Logout";
        document.querySelector(".logout").addEventListener("click", logout);
      }
    });
};

logoutrun();
