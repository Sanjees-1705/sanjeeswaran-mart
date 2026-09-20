async function showProducts() {

    const productsSection =
        document.getElementById("productsSection");

    productsSection.scrollIntoView({
        behavior: "smooth"
    });

    await loadProducts();
}


/*
    Open separate Add Product page
*/
function addProduct() {

    window.location.href = "add-product.html";

}


/*
    Load all products from database
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
                "<p>No products added yet.</p>";

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

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <p>
                    Stock: ${product.stock}
                </p>

                <button
                    onclick="editProduct(${product.id})"
                >
                    Edit
                </button>

                <button
                    onclick="deleteProduct(${product.id})"
                >
                    Delete
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
    Edit Product
*/

function editProduct(id) {

    window.location.href =
        "edit-product.html?id=" + id;

}


/*
    Delete Product
*/
async function deleteProduct(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this product?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                "/api/products/" + id,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        alert(
            "Product deleted successfully!"
        );


        await loadProducts();


    } catch (error) {

        console.error(error);

        alert(
            "Failed to delete product."
        );

    }

}


/*
    Logout
*/
function logout() {

    window.location.href =
        "login.html";

}


/*
    Automatically load products
    when seller page opens
*/
window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProducts();

    }
);