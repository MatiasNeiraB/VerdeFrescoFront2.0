window.onload = function () {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
    };

    axios.get('http://localhost:3000/cart', { headers })
        .then(response => {
            const cartItems = response.data;
            const cartContainer = document.getElementById('cart');
            const totalCart = response.data[0];
            const total = totalCart.totalOrder;
            document.getElementById('total-amount').innerText = total;
            cartItems.forEach(item => {
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <h3>${item.product_name}</h3>
                    <p>Cantidad: <span id="quantity-${item.product_id}">${item.quantity}</span></p>
                    <p>Precio: $${item.price}</p>
                    <p>Subtotal: $${item.subtotal}</p>
                    <button class="btn btn-success" onclick="decrementQuantity(${item.product_id})">-</button>
                    <button class="btn btn-success" onclick="incrementQuantity(${item.product_id})">+</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${item.product_id})">Eliminar</button>
                `;
                cartContainer.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error al obtener el carrito:', error);
        });
};

var axios = require('axios');

function incrementQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    updateQuantity(productId, quantity);
}

function decrementQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
        updateQuantity(productId, quantity);
    }
}

function updateQuantity(productId, quantity) {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const data = {
        product_id: productId,
        quantity: quantity
    };
    axios.put(`http://localhost:3000/cart/${productId}`, data, { headers })
        .then(response => {
            console.log('Cantidad actualizada:', response.data);
        })
        .catch(error => {
            console.error('Error al actualizar la cantidad:', error);
        });
}

function deleteProduct(productId) {
    const token = localStorage.getItem('token');
    const userConfirmed = window.confirm("¿Estás seguro de que deseas eliminar el producto?");
    if (!userConfirmed) {
        return;
    };
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    axios.delete(`http://localhost:3000/cart/${productId}`, { headers })
        .then(response => {
            console.log('Producto eliminado del carrito:', response.data);
        })
        .catch(error => {
            console.error('Error al eliminar el producto del carrito:', error);
        });
    location.reload();
}


function buyCarts() {
    const buyCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const sendData = await axios.put("http://localhost:3000/cart", { headers });
            if (response.status === 200) {
                alert('GRACIAS POR TU COMPRA');
                window.location.href = "http://127.0.0.1:5500/index.html";
            } else {
                console.log("Error al procesar la compra");
            }

        } catch (error) {
            console.log(error);
        }
    }
    buyCart();
}

function buyCarts() {
    const buyCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await axios.put("http://localhost:3000/cart", {}, { headers });

            if (response.status === 201) {
                alert('GRACIAS POR TU COMPRA');
                window.location.href = "http://127.0.0.1:5500/index.html";
            } else {
                console.error('Error al procesar la compra:', response.statusText);
                alert('Hubo un problema al procesar tu compra. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error en la solicitud de compra:', error);
            alert('Hubo un problema al procesar tu compra. Inténtalo de nuevo.');
        }
    }
    buyCart();
}
