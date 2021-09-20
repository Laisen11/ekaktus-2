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

        let total = 0.0;
        products.forEach(function (product) {
            appendProduct(product);
            total += Number(product.total);
        });

        $("#total").text(`Total de movimientos: Q${total}`);
    }
}

function appendProduct(product) {
    $("#tickets-table > tbody:last-child").append(
        `
        <tr id="product-${product.code}">
            <td>${product.supplier}</td>
            <td>${product.date}</td>
            <td>${product.type}</td>
            <td>${product.code}</td>
            <td>${product.product}</td>
            <td>${product.amount}</td>
            <td>${product.price}</td>
            <td>${product.total}</td>
        </tr> 
        `
    );
}

$("form").submit(function (e) {
    e.preventDefault();
});

$("form#form-ticket").submit(function () {
    const values = {};

    $.each($("#form-ticket").serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });

    addProduct(values);
    clearForm();
});

function addProduct(product) {
    products.push(product);
    saveJson();
    populate();
}

function clearForm() {
    $("#form-ticket").trigger("reset");
}
