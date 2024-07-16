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
                        alert("El email no es válido");
                        errorEmail();
                        errorPassword();
                    } else if (emailValue.length > 30) {
                        errorEmail();
                        errorPassword();
                        alert("El email no es válido");
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
                                window.location.href = "http://127.0.0.1:5500/admin/orders.html";
                            } else {
                                mostrarCarga();
                                setTimeout(ocultarCarga, 1200);
                                window.location.href = "http://127.0.0.1:5500/index.html";
                            }
                        } else {
                            alert("Credenciales incorrectas");
                            errorEmail();
                            errorPassword();
                        }
                    }
                } else {
                    alert("El email tiene que tener @");
                }
            } else {
                alert("El email es obligatorio");
            }
        } catch (error) {
            console.log(error);
        }
    }
    postLogin();
}

function putPasswords(event) {
    event.preventDefault();
    const putPassword = async () => {
        try {
            const emailClient = document.getElementById('emailClient').value;
            const newPassword = document.getElementById('newPassword').value;
            const newPasswordRepit = document.getElementById('newPasswordRepit').value;
            if (emailClient.includes('@')) {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailClient)) {
                    alert("El email no es válido");
                } else {
                    if (newPassword === newPasswordRepit) {
                        const data = {
                            email: emailClient,
                            password: newPassword,
                        };
                        const sendData = await axios.put('http://localhost:3000/login', data);
                        console.log(sendData);
                    } else {
                        alert("Las contraseñas no son iguales");
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    putPassword();
    mostrarCarga();
    mailPassword();
    setTimeout(ocultarCarga, 1000);
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
    let emailValue = document.getElementById('emailClient').value;
    var templateParams = {
        destinatario: emailValue,
        message: 'Su contraseña fué actualizada.'
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