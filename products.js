var axios = require('axios');

function products() {
    const getProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await axios.get("http://localhost:3000/products", { headers });
            const products = response.data;
            const productosDinamicos = document.getElementById('products');
            products.forEach((product) => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <div class="product" data-product-id="${product.id}">
                        <img src="${product.img}" alt="${product.name}" />
                        <h3>${product.name}</h3>
                        <p class="descriptions">${product.descriptions}<p/>
                        <button class="btn-cart" onclick="decrementButton(event)" id="${product.id}">-</button>
                        <input type="number" class="numberInput" id="numberInput-${product.id}" value="0" />
                        <button class="btn-cart" onclick="incrementButton(event)" id="${product.id}">+</button>
                        <p>$${product.price}</p>
                        <button type="submit" id="${product.id}" onclick="addProductCart(event)" class="buy-button">Comprar</button>
                    </div>
                `;
                productosDinamicos.appendChild(div);
            });
        } catch (error) {
            if (error.response.status === 403) {
                localStorage.removeItem('token');
                console.log("Token eliminado del localStorage debido a un error 403");
            } else {
                console.error("Error al obtener los productos:", error);
            }
        }
    }
    getProducts();

}

function addProductCart(event) {
    event.preventDefault();
    const targetElement = event.target.id;
    const inputId = "numberInput-" + targetElement;
    let productId = targetElement;
    let quantityProduct = document.getElementById(inputId).value;
    if (quantityProduct > 0) {
        const addCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                };
                const data = {
                    product_id: productId,
                    quantity: quantityProduct
                };
                const sendDataCart = await axios.post("http://localhost:3000/products", data, { headers });
                console.log(sendDataCart);
                if (sendDataCart.status === 403) {
                    localStorage.removeItem('token');
                } else
                    if (sendDataCart.status === 201) {
                        console.log("addCart exitoso");
                    } else {
                        console.log("Error al hacer addCart");
                    }
            } catch (error) {
                console.log(error);
            }
        };
        addCart();
    } else {
        console.log("No se puede agregar al carrito 0 unidades");
    }
}

function decrementButton(event) {
    const targetElement = event.target.id;
    const id_boton = "numberInput-" + targetElement;
    let numberInput = document.getElementById(id_boton);
    let currentValue = parseInt(numberInput.value, 10);
    numberInput.value = currentValue - 1;
    if (currentValue === 0) {
        numberInput.value = 0;
    }
};

function incrementButton(event) {
    const targetElement = event.target.id;
    const id_boton = "numberInput-" + targetElement;
    let numberInput = document.getElementById(id_boton);
    let currentValue = parseInt(numberInput.value, 10);
    numberInput.value = currentValue + 1;
};

