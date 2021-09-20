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
        });
    }
}

function appendProduct(product) {
    $("#tickets-table > tbody:last-child").append(
        `
        <tr id="product-${product.code}">
            <td>${product.product}</td>
            <td>${product.date}</td>
            <td>${product.amount}</td>

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
