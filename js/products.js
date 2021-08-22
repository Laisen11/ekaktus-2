let products = [];
let cart = [];

loadJson();
populate();

function saveJson() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadJson() {
    const p = localStorage.getItem("products");
    products = p ? JSON.parse(p) : [];

    const c = localStorage.getItem("cart");
    cart = c ? JSON.parse(c) : [];
}


function populate() {
    products.forEach(function (product) {
        appendProduct(product);
    });
}

function appendProduct(product) {
    $("#list-products:last-child").append(
        `
        <div class="card" id="product-${product.code}">
            <img src="${product.photo}" alt="${product.photo}" class="img">
            <div class="container">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
            </div>
            <div class="purchase">
                <button class="card-button" onClick="addToCart(${product.code})">
                    <span class="price">Q${product.price}</span>
                    <span class="buy">Add car</span>
                </button>
            </div>
        </div>
        `
    );
}

function addToCart(code) {
    let aux = null;

    products.forEach(function (product) {
        if (code == product.code) {
            aux = product;
        }
    });

    console.log('Class: addToCart', aux);

    if (aux) {
        cart.push(aux);
        saveJson();
    }
}
