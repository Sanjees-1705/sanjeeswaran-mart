function showProducts() {
    const productsSection = document.getElementById("productsSection");

    productsSection.scrollIntoView({
        behavior: "smooth"
    });

    loadProducts();
}

function showCart() {
    window.location.href = "cart.html";
}

function showWishlist() {
    window.location.href = "wishlist.html";
}

function showOrders() {
    window.location.href = "orders.html";
}

function logout() {
    localStorage.removeItem("loggedInUserId");
    window.location.href = "login.html";
}

async function loadProducts() {

    const productContainer =
        document.querySelector(".product-container");

    try {

        const response =
            await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products =
            await response.json();

        productContainer.innerHTML = "";

        if (products.length === 0) {

            productContainer.innerHTML =
                "<p>No products available.</p>";

            return;
        }

        products.forEach(function (product) {

            const productCard =
                document.createElement("div");

            productCard.className =
                "product-card";

            productCard.innerHTML = `

                <img
                    src="${product.imagePath}"
                    alt="${product.name}"
                    style="
                        width: 200px;
                        height: 200px;
                        object-fit: cover;
                    "
                >

                <h3>${product.name}</h3>

                <p>
                    ${product.description}
                </p>

                <p>
                    Price: ₹${product.price}
                </p>

                <p>
                    Stock: ${product.stock}
                </p>

                <button
                    onclick="addToCart(${product.id}, '${product.name}', ${product.price})"
                >
                    🛒 Add to Cart
                </button>

                <button
                    onclick="addToWishlist(${product.id}, '${product.name}', ${product.price})"
                >
                    ❤️ Wishlist
                </button>

            `;

            productContainer.appendChild(productCard);

        });

    } catch (error) {

        console.error(error);

        productContainer.innerHTML =
            "<p>Failed to load products.</p>";

    }
}


function addToCart(id, name, price) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct =
        cart.find(function (item) {
            return item.id === id;
        });

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(name + " added to cart.");
}


function addToWishlist(id, name, price) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const existingProduct =
        wishlist.find(function (item) {
            return item.id === id;
        });

    if (existingProduct) {

        alert(name + " is already in wishlist.");

        return;
    }

    wishlist.push({
        id: id,
        name: name,
        price: price
    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert(name + " added to wishlist.");
}


window.addEventListener(
    "DOMContentLoaded",
    function () {
        loadProducts();
    }
);