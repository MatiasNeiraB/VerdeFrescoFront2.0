
window.onload = function getOrdenes() {
    const getOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await axios.get("http://localhost:3000/admin/orders", { headers });
            const orders = response.data;
            const orderDinamicas = document.getElementById('order');
            orders.forEach((order) => {
                const formatDates = formatDate(order.date);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <tr>
                        <th scope="row">${order.id_cart}</th>
                        <td>${order.name} ${order.surName}</td>
                        <td>${formatDates}</td>
                        <td>${order.status_cart}</td>
                        <td>$${order.totalOrder}</td>
                        <td><button class="btn btn-danger" id="${order.id_cart}" onclick="deleteOrders(event)">ELIMINAR</button></td>
                        <td><button type="button" class="btn btn-success" data-bs-toggle="modal" onclick="seeOrders(event)" data-bs-target="#modal-orders" id="${order.id_cart}">VER</td>
                    </tr>
                `;
                orderDinamicas.appendChild(tr);
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
    getOrders();

}
var axios = require('axios');


function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} / ${hours}:${minutes} HORAS`;
}

function seeOrders(event) {
    event.preventDefault();
    const order_id = event.target.id;
    const seeOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                id_cart: order_id,
            };
            const url = `http://localhost:3000/admin/orders/${order_id}`;
            const sendData = await axios.post(url, data, { headers });
            const dataOrder = sendData.data[0];
            const dataOrders = sendData.data;
            const orderDinamicas = document.getElementById('body_modal');
            const titleOrder = document.getElementById('orderId');
            const mensajeTexto = order_id;
            titleOrder.innerHTML = mensajeTexto;
            orderDinamicas.innerHTML = '';
            dataOrders.forEach((order) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <tr>
                        <td>${order.product_name}</td>
                        <td>${order.quantity}</td>
                        <td>$${order.subtotal}</td>
                        </tr>
                    </tr>
                `;
                orderDinamicas.appendChild(tr);
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
                console.error("Error al obtener la orden:", error);
            }
        }
    }
    seeOrder();
}

function putOrders(event) {
    const putOrder = async () => {
        try {
            const orderId = document.getElementById('orderId').innerText;
            const putStatusOrder = document.getElementById('statusOrder').value;
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                status_cart: putStatusOrder
            };
            const url = `http://localhost:3000/admin/orders/${orderId}`;
            const sendData = await axios.put(url, data, { headers });
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
                console.error("Error al editar el producto:", error);
            }
        }
    }
    putOrder();
    mostrarCarga()
    setTimeout(ocultarCarga, 1000);
}


function deleteOrders(event) {
    event.preventDefault();
    const order_id = event.target.id;
    const userConfirmed = window.confirm("¿Estás seguro de que deseas eliminar la orden #" + order_id + "?");
    if (!userConfirmed) {
        return;
    };

    const deleteOrder = async () => {
        try {

            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const url = `http://localhost:3000/admin/orders/${order_id}`;
            const sendData = await axios.delete(url, {
                headers: headers, data: { id_cart: order_id }
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
                console.error("Error al eliminar el producto:", error);
            }
        }
    }
    deleteOrder();
    mostrarCarga()
    setTimeout(ocultarCarga, 1000);
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
