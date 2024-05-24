//FUNCION SUBMIT DEL FORMULARIO, TOMA LOS DATOS DEl INPUT Y VALIDA LOS DATOS

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

//ESTA FUNCION GENERA UN NUMERO DE CASO Y MUESTRA UN MENSAJE MOMENTANEO EN LA PARTE DE ABAJO DE LA PANTALLA, PERO TENEMOS UN PROBLEMA
// QUE SE EJECUTA SOLO CUANDO TOCAS POR SEGUNDA VEZ EL BOTON ENVIAR

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

//MUESTRA EL LOGO DE CARGA UNA VEZ REALIZADO EL SUBMIT
function mostrarCarga() {
    document.getElementById("loading").style.display = "block";
}


//OCULTA EL LOGO DE CARGA
function ocultarCarga() {
    document.getElementById("loading").style.display = "none";
}

//SI EL ERROR EXISTE, CAMBIA EL LOCO DEL INPUT
function errorEmail() {
    let logEmail = document.getElementById('logEmail');
    let errorEmail = document.getElementById('errorEmail');
    if (logEmail) {
        logEmail.style.display = 'none';
        errorEmail.style.display = 'block'
    }
}