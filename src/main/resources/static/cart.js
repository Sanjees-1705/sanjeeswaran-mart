/*
    Load Cart
*/
function loadCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.innerHTML = "";

        return;
    }


    let total = 0;


    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <h3>
                ${item.name}
            </h3>

            <p>
                Price: ₹${item.price}
            </p>

            <div class="quantity-controls">

                <button
                    onclick="decreaseQuantity(${index})"
                >
                    −
                </button>

                <span>
                    Quantity: ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})"
                >
                    +
                </button>

            </div>

            <p>
                Item Total: ₹${itemTotal}
            </p>

            <button
                class="remove-button"
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.innerHTML =
        "Total: ₹" + total;

}


/*
    Increase Quantity
*/
function increaseQuantity(index) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart[index].quantity += 1;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();
}


/*
    Decrease Quantity
*/
function decreaseQuantity(index) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();
}


/*
    Remove Product
*/
function removeFromCart(index) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();
}


/*
    Continue Shopping
*/
function continueShopping() {

    window.location.href =
        "buyer.html";

}


/*
    Load cart when page opens
*/
window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadCart();

    }
);

/*
    Place Order
*/
function placeOrder() {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    let total = 0;


    cart.forEach(function (item) {

        total +=
            item.price * item.quantity;

    });


    const orderId =
        "ORD" +
        Date.now();


    localStorage.setItem(
        "lastOrderId",
        orderId
    );


    localStorage.setItem(
        "lastOrderTotal",
        total
    );


    localStorage.setItem(
        "lastOrderItems",
        JSON.stringify(cart)
    );


    /*
        Clear cart
    */
    localStorage.removeItem("cart");


    /*
        Go to order success page
    */
    window.location.href =
        "order-success.html";

}