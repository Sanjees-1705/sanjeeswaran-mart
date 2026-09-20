const editProductForm =
    document.getElementById("editProductForm");

const productMessage =
    document.getElementById("productMessage");

const currentImage =
    document.getElementById("currentImage");


/*
    Get product ID from URL
*/

const urlParams =
    new URLSearchParams(window.location.search);

const productId =
    urlParams.get("id");


/*
    Check product ID
*/

if (!productId) {

    productMessage.textContent =
        "Product ID not found.";

    productMessage.style.color =
        "red";

} else {

    loadProduct();

}


/*
    Load product details
*/

async function loadProduct() {

    try {

        const response =
            await fetch(
                "/api/products/" + productId
            );


        if (!response.ok) {

            throw new Error(
                "Product not found"
            );

        }


        const product =
            await response.json();


        /*
            Fill existing product details
        */

        document.getElementById(
            "productName"
        ).value = product.name;


        document.getElementById(
            "productPrice"
        ).value = product.price;


        document.getElementById(
            "productDescription"
        ).value = product.description;


        document.getElementById(
            "productStock"
        ).value = product.stock;


        /*
            Show current image
        */

        currentImage.src =
            product.imagePath;


    } catch (error) {

        console.error(error);

        productMessage.textContent =
            "Failed to load product.";

        productMessage.style.color =
            "red";

    }

}


/*
    Update Product
*/

editProductForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "productName"
            ).value.trim();


        const price =
            document.getElementById(
                "productPrice"
            ).value;


        const description =
            document.getElementById(
                "productDescription"
            ).value.trim();


        const stock =
            document.getElementById(
                "productStock"
            ).value;


        const image =
            document.getElementById(
                "productImage"
            ).files[0];


        /*
            Validate fields
        */

        if (
            name === "" ||
            price === "" ||
            description === "" ||
            stock === ""
        ) {

            productMessage.textContent =
                "Please fill all product details.";

            productMessage.style.color =
                "red";

            return;

        }


        /*
            Create FormData
        */

        const formData =
            new FormData();


        formData.append(
            "name",
            name
        );


        formData.append(
            "price",
            price
        );


        formData.append(
            "description",
            description
        );


        formData.append(
            "stock",
            stock
        );


        /*
            Image is optional
        */

        if (image) {

            formData.append(
                "image",
                image
            );

        }


        try {

            productMessage.textContent =
                "Updating product...";

            productMessage.style.color =
                "black";


            const response =
                await fetch(
                    "/api/products/" + productId,
                    {
                        method: "PUT",
                        body: formData
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Product update failed"
                );

            }


            const updatedProduct =
                await response.json();


            console.log(
                "Updated product:",
                updatedProduct
            );


            productMessage.textContent =
                "✅ Product updated successfully!";

            productMessage.style.color =
                "green";


            setTimeout(
                function () {

                    window.location.href =
                        "seller.html";

                },
                1000
            );


        } catch (error) {

            console.error(error);


            productMessage.textContent =
                "❌ Failed to update product. Please try again.";

            productMessage.style.color =
                "red";

        }

    }
);


/*
    Back button
*/

function goBack() {

    window.location.href =
        "seller.html";

}