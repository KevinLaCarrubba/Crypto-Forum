const logInFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    console.log(email);
    console.log(password);
    
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/index');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.login-form');
document.addEventListener('submit', logInFormHandler);