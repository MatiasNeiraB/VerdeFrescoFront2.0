function sendContact(event) {
    event.preventDefault();
    let emailValueContact = document.getElementById('emailContact').value;
    if (emailValueContact.includes('@')) {
        mostrarCarga();
        setTimeout(ocultarCarga, 1200);
    } else {
        console.log("El email es incorrecto.");
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