let cart = [];

loadJson();
populate();

function saveJson() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadJson() {
    const c = localStorage.getItem("cart");
    cart = c ? JSON.parse(c) : [];
}

function populate() {
    if (cart) {
        $("#products-table > tbody").empty();

        let total = 0.0;
        cart.forEach(function (product) {
            appendProduct(product);
            total += Number(product.price);
        });

        $("#total").text(`Total del pedido: Q${total}`);
    }
}

function appendProduct(product) {
    $("#products-table > tbody:last-child").append(
        `
        <tr id="product-${product.code}">
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td><img src="${product.photo}" class="image-table img-fluid img-thumbnail" alt="${product.photo}"></td>
            <td>
                <button class="btn btn-danger form-control" onClick="deleteProduct(${product.code})">Eliminar</button>
            </td>
        </tr> 
        `
    );
}

function deleteProduct(code) {
    const result = confirm(`¿Estas seguro de eliminar el producto: ${code}?`);

    if (result) {
        cart.forEach(function (product, i) {
            if (code == product.code) {
                cart.splice(i, 1);
                console.log('Class: cart', cart);

                saveJson();
                populate();
            }
        });
    }
}

$("#form-cart").submit(function (e) {
    e.preventDefault();
});

$("#form-cart").submit(function () {
    if (cart.length > 0) {
        alert("Tu pedido fue enviado correctamente, pronto te lo estaremos enviado");
    }
});
