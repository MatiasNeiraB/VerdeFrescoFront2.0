var axios = require('axios');

//FUNCION SUBMIT DEL FORMULARIO, TOMA LOS DATOS DEL LOCAL STORAGE, Y VALIDA LOS INPUT
function loginCheck(event) {
    event.preventDefault();
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    const postLogin = async () => {
        try {
            if (emailValue) {
                if (emailValue.includes('@')) {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailValue)) {
                        console.log("El email no es válido");
                        errorEmail();
                        errorPassword();
                    } else if (emailValue.length > 30) {
                        errorEmail();
                        errorPassword();
                        console.log("Credenciales incorrectas.");
                    } else {
                        const data = {
                            email: emailValue,
                            password: passwordValue
                        }
                        
                        const sendData = await axios.post("http://localhost:3000/login", data);
                        if (sendData.status === 200) {
                            const userResponse = sendData.data;
                            const nameUser = userResponse.nameUser + " " + userResponse.surNameUser;
                            localStorage.setItem("token", userResponse.token);
                            localStorage.setItem("userName", nameUser);
                            const rol_user = userResponse.rol;
                            if (rol_user === "ADMINISTRADOR") {
                                mostrarCarga();
                                setTimeout(ocultarCarga, 1200);
                                window.location.href = "http://127.0.0.1:5500/pages/admin.html";
                            }else{
                                mostrarCarga();
                                setTimeout(ocultarCarga, 1200);
                                window.location.href = "http://127.0.0.1:5500/index.html";
                            }
                        } else {
                            console.log("Credenciales incorrectas");
                            errorEmail();
                            errorPassword();
                        }
                    }
                } else {
                    console.log("El email tiene que tener @");
                }
            } else {
                console.log("El email es obligatorio");
            }
        } catch (error) {
            console.log(error);
        }
    }
    postLogin();
}

//MUESTRA EL LOGO DE CARGA UNA VEZ REALIZADO EL SUBMIT
function mostrarCarga() {
    document.getElementById("loading").style.display = "block";
}

//OCULTA EL LOGO DE CARGA Y REDIRECCIONA AL HOME
function ocultarCarga(rol_user) {
    document.getElementById("loading").style.display = "none"
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

//ESTA FUNCION ENVIA EL MAIL CUANDO EL USUARIO OLVIDA LA CONTRASEÑA 
function errorPassword() {
    let logPassword = document.getElementById('logPassword');
    let errorPassword = document.getElementById('errorPassword');
    if (logPassword) {
        logPassword.style.display = 'none';
        errorPassword.style.display = 'block'
    }
}

//ESTA FUNCION ENVIA EL MAIL CUANDO EL USUARIO OLVIDA LA CONTRASEÑA
function mailPassword() {
    let emailValue = document.getElementById('emailPassword').value;
    var templateParams = {
        destinatario: emailValue,
        message: 'Para continuar con el proceso, por favor acceda al siguiente enlace:'
    };

    emailjs.send('service_nc9bzlp', 'template_ovfbtir', templateParams).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
    )
}