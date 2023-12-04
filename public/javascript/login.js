const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const btn = document.getElementById("login");
const btn2 = document.getElementById("signup");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    // console.log(email, password);
    if(email=="" || password==""){
        alert("Please fill all the fields");
        return;
    }
    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            // console.log('Login Successfully');
            location.href = '/';
        } else {
            console.error('Login failed');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

btn2.addEventListener('click', async (e) => {

    e.preventDefault();

    const email = document.getElementById("signEmail").value;
    const password = document.getElementById("signPass").value;
    const username = document.getElementById("username").value;

    
    if(email=="" || password=="" || username==""){
        alert("Please fill all the fields");
        return;
    }

    const data = {
        email: email,
        password: password,
        username: username
    };

    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.status === 201) {
            // console.log('Login Successfully');
            alert("Check your email");
            location.href = '/';
        } else {
            console.error('Sigup failed');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});