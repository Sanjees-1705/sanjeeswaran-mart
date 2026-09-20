/*
    Show Products
*/
function showProducts() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

    loadProducts();
}


/*
    Load Products from Database
*/
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
                "<p>No products available yet.</p>";

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
                        border-radius: 8px;
                    "
                >

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <p class="price">
                    ₹${product.price}
                </p>

                <p>
                    Stock: ${product.stock}
                </p>

                <button
                    onclick="addToCart(
                        ${product.id},
                        '${product.name.replace(/'/g, "\\'")}',
                        ${product.price}
                    )"
                    ${product.stock <= 0 ? "disabled" : ""}
                >
                    ${product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                <button
                    onclick="addToWishlist(
                        '${product.name.replace(/'/g, "\\'")}',
                         ${product.price}
                    )"
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


/*
    Add Product to Cart
*/
function addToCart(
    productId,
    productName,
    price
) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const existingProduct =
        cart.find(function (item) {

            return item.id === productId;

        });


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: productId,

            name: productName,

            price: price,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        productName +
        " added to cart."
    );

}


/*
    Open Cart
*/
function showCart() {

    window.location.href =
        "cart.html";

}


/*
    Wishlist
*/
function showWishlist() {

    window.location.href =
        "wishlist.html";

}


/*
    Add to Wishlist
*/
function addToWishlist(
    productName,
    productPrice
) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    const existingProduct =
        wishlist.find(function (item) {
            return item.name === productName;
        });

    if (existingProduct) {

        alert(
            productName +
            " is already in wishlist."
        );

        return;
    }

    wishlist.push({
        name: productName,
        price: productPrice
    });

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert(
        productName +
        " added to wishlist."
    );

}


/*
    Logout
*/
function logout() {

    window.location.href =
        "login.html";

}

function showOrders() {

    window.location.href =
        "orders.html";

}


/*
    Automatically load products
*/
window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProducts();

    }
);