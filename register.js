function RegisterCheck(event) {
    event.preventDefault();
    let emailValue = document.getElementById('email').value;
    let nameValue = document.getElementById('name').value;
    let surnameValue = document.getElementById('surname').value;
    let userValue = document.getElementById('userName').value;
    let passwordValue = document.getElementById('password').value;
    let repitPasswordValue = document.getElementById('repitPassword').value;

    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailValue.value)) {
        console.log("El email contiene caracteres invalidos.");
    } else if (emailValue.length > 30) {
        console.log("El email no puede tener más de 30 caracteres.");
    } else if (passwordValue === repitPasswordValue) {
        mostrarCarga();
        const users = {
            name: nameValue,
            surname: surnameValue,
            userName: userValue,
            email: emailValue,
            password: passwordValue
        };
        const userJSON = JSON.stringify(users);
        localStorage.setItem("users", userJSON);
        mailRegister();
        setTimeout(ocultarCarga, 1200);
    } else {
        console.log("Las contraseñas no son iguales.");
    }
}

function mostrarCarga() {
    document.getElementById("loading").style.display = "block";
}

function ocultarCarga() {
    document.getElementById("loading").style.display = "none";
    window.location.href = "http://127.0.0.1:5500/index.html";
    console.log("ENTRASTE");
}

function mailRegister() {
    let userLS = JSON.parse(localStorage.getItem('users'));
    let nameLS = userLS.name;
    let emailLS = userLS.email;
    var templateParams = {
        userName: nameLS,
        destinatario: emailLS,
    };

    emailjs.send('service_nc9bzlp', 'template_jiemk57', templateParams).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
    );
}