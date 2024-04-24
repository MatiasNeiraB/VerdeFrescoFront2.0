function loginCheck(event) {
    event.preventDefault();
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    let emailLS = localStorage.getItem('email');
    let passwordLS = localStorage.getItem('password');

    if (emailValue.includes('@')) {
        if (emailValue === emailLS) {
            if (passwordValue === passwordLS) {
                console.log("Login Exitoso.");

                mostrarCarga();
                setTimeout(ocultarCarga, 1200);
            } else {
                console.log("Contraseña incorrecta.");
            }
        } else {
            console.log("El email es incorrecto.");
        }
    } else {
        console.log("El mail no contiene @.");
    }
}

function mostrarCarga() {
    document.getElementById("loading").style.display = "block";
}

function ocultarCarga() {
    document.getElementById("loading").style.display = "none";
    window.location.href = "http://127.0.0.1:5500/index.html";
}