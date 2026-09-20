const productForm =
    document.getElementById("productForm");


const productMessage =
    document.getElementById("productMessage");



/*
    Add Product
*/

productForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();



        const name =
            document
                .getElementById("productName")
                .value
                .trim();



        const price =
            document
                .getElementById("productPrice")
                .value;



        const description =
            document
                .getElementById("productDescription")
                .value
                .trim();



        const stock =
            document
                .getElementById("productStock")
                .value;



        const image =
            document
                .getElementById("productImage")
                .files[0];



        /*
            Check all fields
        */

        if (
            name === "" ||
            price === "" ||
            description === "" ||
            stock === "" ||
            !image
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


        formData.append(
            "image",
            image
        );



        /*
            Send product to backend
        */

        try {

            productMessage.textContent =
                "Adding product...";

            productMessage.style.color =
                "black";



            const response =
                await fetch(
                    "/api/products/add",
                    {
                        method: "POST",
                        body: formData
                    }
                );



            if (!response.ok) {

                throw new Error(
                    "Product could not be added"
                );

            }



            const product =
                await response.json();



            console.log(
                "Product saved:",
                product
            );



            /*
                Success message
            */

            productMessage.textContent =
                "✅ Product added successfully!";

            productMessage.style.color =
                "green";



            /*
                Clear form
            */

            productForm.reset();



            /*
                After 1 second go to seller page
            */

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
                "❌ Failed to add product. Please try again.";

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