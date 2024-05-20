function loginCheck(event) {
    event.preventDefault();
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    let userLS = JSON.parse(localStorage.getItem('users'));
    let emailLS = userLS.email;
    let passwordLS = userLS.password;

    if (emailValue.includes('@')) {
        if (emailValue === emailLS) {
            if (passwordValue === passwordLS) {
                console.log("Login Exitoso.");

                mostrarCarga();
                setTimeout(ocultarCarga, 1200);
            } else {
                errorPassword()
                console.log("Contraseña incorrecta.");
            }
        } else {
            console.log("El email es incorrecto.");
            errorEmail();
        }
    } else {

        errorEmail();
    }
}

function mostrarCarga() {
    document.getElementById("loading").style.display = "block";
}

function ocultarCarga() {
    document.getElementById("loading").style.display = "none";
    window.location.href = "http://127.0.0.1:5500/index.html";
}

function errorEmail() {
    let logEmail = document.getElementById('logEmail');
    let errorEmail = document.getElementById('errorEmail');
    if (logEmail) {
        logEmail.style.display = 'none';
        errorEmail.style.display = 'block'
    }
}

function errorPassword() {
    let logPassword = document.getElementById('logPassword');
    let errorPassword = document.getElementById('errorPassword');
    if (logPassword) {
        logPassword.style.display = 'none';
        errorPassword.style.display = 'block'
    }
}
