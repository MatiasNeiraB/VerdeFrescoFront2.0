//Envio de mail
function sendContact(event) {
    event.preventDefault();
    let emailValueContact = document.getElementById('emailContact').value;
    if (emailValueContact.includes('@')) {
        mostrarCarga();
        setTimeout(ocultarCarga,2000);
        toast();
        document.getElementById('contacto').reset();
    } else {
        console.log("El email es incorrecto.");
        errorEmail();
    }
}

//ESTA FUNCION SE EJECUTA SOLO CUANDO TOCAS POR SEGUNDA VEZ EL BOTON ENVIAR
function toast() {
    let numeroCaso = Math.floor(Math.random()*99999)+1;
    console.log(numeroCaso);
    document.getElementById("numCaso").innerHTML = numeroCaso;
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
            toastBootstrap.show()
        })
    }
}

function mostrarCarga() {
    document.getElementById("loading").style.display = "block";
}

function ocultarCarga() {
    document.getElementById("loading").style.display = "none";
}

function errorEmail() {
    let logEmail = document.getElementById('logEmail');
    let errorEmail = document.getElementById('errorEmail');
    if (logEmail) {
        logEmail.style.display = 'none';
        errorEmail.style.display = 'block'
    }
}