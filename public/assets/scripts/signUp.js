const signupFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#signUp-userName').value.trim();
    const userEmail = document.querySelector('#signUp-userEmail').value.trim();
    const password = document.querySelector('#signUp-password').value.trim();

    if (userName && userEmail && password) {
        const response = await fetch ('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/index.js');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form');
document.addEventListener('submit', signupFormHandler);