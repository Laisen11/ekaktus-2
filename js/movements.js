let details = [];
let orders = [];
let products = [];
let orderProduct = [];

loadJson();

function saveJson() {
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("order_product", JSON.stringify(orderProduct));
}

function loadJson() {
    let aux = localStorage.getItem("orders");
    orders = aux ? JSON.parse(aux) : [];

    aux = localStorage.getItem("products");
    products = aux ? JSON.parse(aux) : [];

    aux = localStorage.getItem("order_product");
    orderProduct = aux ? JSON.parse(aux) : [];
}

function populate() {
    if (details) {
        $("#table-detail > tbody").empty();

        let total = 0.0;
        details.forEach(function (detail) {
            appendProduct(detail);
            total += Number(detail.price * detail.amount);
        });

        $("#total").text(`Total: Q ${total}`);
    }
}

function appendProduct(detail) {
    $("#table-detail > tbody:last-child").append(
        `
        <tr id="detail-${detail.code}">
            <td>${detail.name}</td>
            <td>${detail.code}</td>
            <td>${detail.amount}</td>
            <td>${detail.price}</td>
            <td>${detail.amount * detail.price}</td>
            <td>
                <button class="btn btn-danger form-control" onClick="deleteProduct('${detail.code}')">Eliminar</button>
            </td>
        </tr> 
        `
    );
}

$("form#form-detail").submit(function (e) {
    e.preventDefault();
    const values = {};

    $.each($("#form-detail").serializeArray(), function (i, field) {
        values[field.name] = field.value;
    });

    addProduct(values);
    clearDetailForm();
});

function addProduct(detail) {
    details.push(detail);
    populate();
}

function clearDetailForm() {
    $("#form-detail").trigger("reset");
}

function clearMasterForm() {
    $("#form-master").trigger("reset");
}

function deleteProduct(code) {
    const result = confirm("¿Estas seguro de eliminar?");

    if (result) {
        details.forEach(function (detail, i) {
            if (code === detail.code) {
                details.splice(i, 1);
                populate();
            }
        });
    }
}

$("form#form-master").submit(function (e) {
    e.preventDefault();
    if (details.length > 0) {
        const values = {};

        $.each($("#form-master").serializeArray(), function (i, field) {
            values[field.name] = field.value;
        });

        createOrder(values);
    }
});

function createOrder(values) {
    if (products.length > 0) {
        details.forEach(function (detail) {
            let find = false;

            products.forEach(function (product) {
                if (product.code === detail.code) {
                    find = true;
                    const productAmount = Number(product.amount);
                    const detailAmount = Number(detail.amount);

                    if (values.type === '1') {
                        product.amount = productAmount + detailAmount;
                    } else {
                        if (productAmount >= detailAmount) {
                            product.amount = productAmount - detailAmount;
                        } else {
                            console.log('El producto no tiene suficiente cantidad');
                        }
                    }
                }
            });

            if (!find) {
                if (values.type === '1') {
                    products.push({
                        'code': detail.code,
                        'name': detail.name,
                        'description': detail.name,
                        'price': detail.price,
                        'amount': detail.amount,
                        'photo': '',
                    });
                } else {
                    console.log('Producto no encontrado');
                }
            }
        });
    } else {
        details.forEach(function (detail) {
            products.push({
                'code': detail.code,
                'name': detail.name,
                'description': detail.name,
                'price': detail.price,
                'amount': detail.amount,
                'photo': '',
            })
        });
    }

    if (details.length > 0 && products.length > 0) {
        details.forEach(function (d) {
            orderProduct.push({
                'order': values.order,
                'product': d.code,
                'amount': d.amount,
                'price': d.price,
            });
        });
    }

    orders.push(values);
    details = [];

    saveJson();

    clearDetailForm();
    clearMasterForm();

    populate();
}
