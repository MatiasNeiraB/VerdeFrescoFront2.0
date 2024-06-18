var axios = require('axios');

function getOrdenes() {
    const getOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await axios.get("http://localhost:3000/admin", { headers });
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
                        <td><button type="button" class="button" data-bs-toggle="modal" onclick="seeOrder(event)" data-bs-target="#exampleModal" id="${order.id_cart}">VER</td>
                    </tr>
                `;
                orderDinamicas.appendChild(tr);
            });
        } catch (error) {
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                console.log("Token eliminado del localStorage debido a un error 403");
            } else {
                console.error("Error al obtener las ordenes:", error);
            }
        }
    }
    getOrders();

}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year}- ${hours}:${minutes}`;
}

function seeOrder(event) {
    event.preventDefault();
    const targetElement = event.target.id;
    const order_id = targetElement;
    const seeOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                id_cart: order_id,
            };
            const url = `http://localhost:3000/admin/order/${order_id}`;
            const sendData = await axios.post(url, data, { headers });
            const dataOrder = sendData.data[0];
            const dataOrders = sendData.data;
            const orderDinamicas = document.getElementById('body_modal');
            const titleOrder = document.getElementById('exampleModalLabel');
            const mensajeTexto = "Orden" + " #" + dataOrder.id_cart;
            titleOrder.innerHTML = mensajeTexto;
            dataOrders.forEach((order) => {
                const formatDates = formatDate(order.date);
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
                console.log("Token eliminado del localStorage debido a un error 403");
            } else {
                console.error("Error al obtener la orden:", error);
            }
        }
    }
    seeOrder();
}