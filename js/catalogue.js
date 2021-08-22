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
        $("#products-table > tbody").empty();

        products.forEach(function (product) {
            appendProduct(product);
        });
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
                <button class="btn btn-primary form-control" onClick="editProduct(${product.code})">Editar</button>
                <button class="btn btn-danger form-control" onClick="deleteProduct(${product.code})">Eliminar</button>
            </td>
        </tr> 
        `
    );
}

$("form").submit(function (e) {
    e.preventDefault();
});

$("form#form-product").submit(function () {
    const values = {};

    $.each($("#form-product").serializeArray(), function (i, field) {
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
    $("#form-product").trigger("reset");
}

function deleteProduct(code) {
    const result = confirm("¿Estas seguro de eliminar?");

    if (result) {
        products.forEach(function (product, i) {
            if (code == product.code) {
                products.splice(i, 1);
                saveJson();
                populate();
            }
        });
    }
}

function editProduct(code) {
    let aux = null;

    products.forEach(function (product) {
        if (code == product.code) {
            aux = product;
        }
    });

    if (aux) {
        $(".modal-body").empty().append(
            `
            <form id="form-update">
                <div class="mb-3">
                    <label for="code" class="form-label">Código</label>
                    <input type="number" class="form-control" id="code" name="code" value="${aux.code}" required>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="name" name="name" value="${aux.name}" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Descripción</label>
                    <input type="text" class="form-control" id="description" name="description" value="${aux.description}" required>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Precio</label>
                    <input type="number" class="form-control" id="price" name="price" value="${aux.price}"required>
                </div>
                <div class="mb-3">
                    <label for="photo" class="form-label">Foto</label>
                    <input type="text" class="form-control" id="photo" name="photo" value="${aux.photo}"required>
                </div>
            </form>
            `
        );

        $(".modal-footer").empty().append(
            `
                <button type="button" class="btn btn-primary" onClick="updateProduct(${code})">Guardar</button>
            `
        );

        $("#product-edit").modal('toggle');
    }
}

function updateProduct(code) {
    let aux = null;
    let position = -1;

    products.forEach(function (product, i) {
        if (code == product.code) {
            aux = product;
            position = i;
        }
    });

    if (aux) {
        const values = {};

        $.each($("#form-update").serializeArray(), function (i, field) {
            values[field.name] = field.value;
        });

        products.splice(position, 1, values);
        saveJson();
        populate();

        $(".modal").modal("toggle");
    }
}
