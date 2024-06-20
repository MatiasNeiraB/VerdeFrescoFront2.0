window.onload = function getProduct() {
    const getProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await axios.get("http://localhost:3000/admin/products", { headers });
            const products = response.data;
            const productsDinamicos = document.getElementById('productsAdmin');
            products.forEach((product) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <tr>
                        <th scope="row">#${product.id}</th>
                        <td><img class="img" src="${product.img}" alt="Imagen del producto: ${product.name}"></td>
                        <td>${product.name}</td>
                        <td>${product.descriptions}</td>
                        <td>$${product.price}</td>
                        <td><button type="button" data-bs-toggle="modal" onclick="seeProductAdmin(event)" data-bs-target="#modal-product" id="${product.id}""
                        data-bs-whatever="@mdo">EDITAR</button></td>

                    </tr>
                `;
                productsDinamicos.appendChild(tr);
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
    getProducts();

}
var axios = require('axios');

function seeProductAdmin(event) {
    event.preventDefault();
    const product_id = event.target.id;
    const seeProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const data = {
                id: product_id,
            };
            const url = `http://localhost:3000/admin/products/${product_id}`;
            const sendData = await axios.post(url, data, { headers });
            const product = sendData.data[0];
            const nameProductDinamico = document.getElementById('name_product');
            const divName = document.createElement('div');
            divName.innerHTML = `
                    <div>
                        <label for="recipient-name"  class="col-form-label">Nombre:</label>
                        <input type="text" class="form-control" value="${product.name}" id="nameProduct">
                    </div>
                `;
            nameProductDinamico.appendChild(divName);
            const descriptionDinamico = document.getElementById('description_product');
            const divDescription = document.createElement('div');
            divDescription.innerHTML = `
                    <div>
                        <label for="message-text" class="col-form-label">Descripción:</label>
                        <textarea class="form-control" id="descriptionProduct">${product.descriptions}</textarea>
                    </div>
                `;
            descriptionDinamico.appendChild(divDescription);
            const priceDinamico = document.getElementById('price_product');
            const divPrice = document.createElement('div');
            divPrice.innerHTML = `
                    <div>
                        <label for="message-text" class="col-form-label">Precio:</label>
                        <input class="form-control" value="${product.price}" id="priceProduct" type="number">
                    </div>
                `;
            priceDinamico.appendChild(divPrice);
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
    seeProduct();
}