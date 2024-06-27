
window.onload = function getClient() {
    const getClients = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await axios.get("http://localhost:3000/admin/clients", { headers });
            const clients = response.data;
            const clientDinamicos = document.getElementById('client');
            clients.forEach((client) => {
                const formatDates = formatDate(client.date);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <tr>
                        <th scope="row">${client.id}</th>
                        <td>${client.name}</td>
                        <td>${client.surName}</td>
                        <td>${client.userName}</td>
                        <td>${client.email}</td>
                        <td>${client.name_rol}</td>
                        <td>${formatDates}</td>
                        <td><button class="btn btn-danger" id="${client.id}" onclick="deleteClients(event)">ELIMINAR</button></td>
                        <td><button type="button" class="btn btn-success" data-bs-toggle="modal" onclick="seeClients(event)" data-bs-target="#editClient" id="${client.id}">EDITAR</td>
                    </tr>
                `;
                clientDinamicos.appendChild(tr);
            });
        } catch (error) {
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al obtener las ordenes:", error);
            }
        }
    }
    getClients();

}
var axios = require('axios');

function seeClients(event) {
    event.preventDefault();
    const client_id = event.target.id;
    const seeClient = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                id: client_id,
            };
            const url = `http://localhost:3000/admin/clients/${client_id}`;
            const sendData = await axios.post(url, data, { headers });
            const client = sendData.data[0];
            const id_client = document.getElementById('id_client');
            id_client.innerText = client_id;
            document.getElementById('nameClient').value = client.name;
            document.getElementById('surNameClient').value = client.surName;
            document.getElementById('userNameClient').value = client.userName;
            document.getElementById('emailClient').value = client.email;
        } catch (error) {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al obtener el producto:", error);
            }
        }
    }
    seeClient();
}

function putClients(event) {
    const putClient = async () => {
        try {
            const putIdClient = document.getElementById('id_client').innerText;
            const putNameClient = document.getElementById('nameClient').value;
            const putSurNameClient = document.getElementById('surNameClient').value;
            const putUserNameClient = document.getElementById('userNameClient').value;
            const putEmailClient = document.getElementById('emailClient').value;
            const putRolClient = document.getElementById('rolClient').value;
            const client_id = putIdClient;
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                id: client_id,
                name: putNameClient,
                surName: putSurNameClient,
                userName: putUserNameClient,
                email: putEmailClient,
                rol: putRolClient,
            };
            const url = `http://localhost:3000/admin/clients/${client_id}`;
            const sendData = await axios.put(url, data, { headers });
            console.log(sendData);
        } catch (error) {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al editar el cliente:", error);
            }
        }
    }
    putClient();
    mostrarCarga()
    setTimeout(ocultarCarga, 1000);
}

function addClients(event) {
    event.preventDefault();
    const addClient = async () => {
        try {
            const nameAddClient = document.getElementById('nameAddClient').value;
            const surNameAddClient = document.getElementById('surNameAddClient').value;
            const userNameAddClient = document.getElementById('userNameAddClient').value;
            const emailAddClient = document.getElementById('emailAddClient').value;
            const passwordAddClient = document.getElementById('passwordAddClient').value;
            const rolAddClient = document.getElementById('rolAddClient').value;
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                name: nameAddClient,
                surName: surNameAddClient,
                userName: userNameAddClient,
                email: emailAddClient,
                password: passwordAddClient,
                rol: rolAddClient,
            };
            const url = `http://localhost:3000/admin/clients`;
            const sendData = await axios.post(url, data, { headers });
        } catch (error) {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al agregar el cliente:", error);
            }
        }
    }
    addClient();
    mostrarCarga()
    setTimeout(ocultarCarga, 1000);

}


function deleteClients(event) {
    event.preventDefault();
    const client_id = event.target.id;
    const userConfirmed = window.confirm("¿Estás seguro de que deseas eliminar el cliente #" + client_id + "?");
    if (!userConfirmed) {
        return;
    };
    const deleteClient = async () => {
        try {

            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const url = `http://localhost:3000/admin/clients/${client_id}`;
            const sendData = await axios.delete(url, {
                headers: headers, data: { id: client_id }
            });
        } catch (error) {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = "http://127.0.0.1:5500/pages/login.html";
                    console.log("Token eliminado del localStorage debido a un error 403");
                }
            } else {
                console.error("Error al eliminar el producto:", error);
            }
        }
    }
    deleteClient();
    mostrarCarga()
    setTimeout(ocultarCarga, 1000);
}


//FORMATEA LA FECHA Y HORA QUE VIENE DE LA BASE DE DATOS
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} / ${hours}:${minutes} HORAS`;
}

//MUESTRA EL LOGO DE CARGA UNA VEZ REALIZADO EL SUBMIT
function mostrarCarga() {
    document.getElementById("loading").style.display = "block";
}

//OCULTA EL LOGO DE CARGA
function ocultarCarga(rol_user) {
    document.getElementById("loading").style.display = "none"
    location.reload();
}
