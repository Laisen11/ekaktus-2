let products = [];

loadJson();
populate();

function saveJson() {
    localStorage.setItem("products", JSON.stringify(products));
}

function loadJson() {
    const aux = localStorage.getItem("products");
    products = aux ? JSON.parse(aux) : [];
}

function populate() {
    if (products) {
        $("#tickets-table > tbody").empty();

        products.forEach(function (product) {
            appendProduct(product);
        });
    }
}

function appendProduct(product) {
    $("#tickets-table > tbody:last-child").append(
        `
        <tr id="product-${product.code}">
            <td>${product.name}</td>
            <td>${product.amount}</td>

        </tr> 
        `
    );
}

