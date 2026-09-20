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
    Place Order
*/
async function placeOrder() {

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


    const userId =
        localStorage.getItem(
            "loggedInUserId"
        );


    if (!userId) {

        alert(
            "Please login before placing an order."
        );

        window.location.href =
            "login.html";

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


    const orderData = {

        orderId: orderId,

        userId: Number(userId),

        totalAmount: total,

        status: "Order Placed"

    };


    try {

        const response =
            await fetch(
                "/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            orderData
                        )
                }
            );


        if (!response.ok) {

            throw new Error(
                "Order failed"
            );

        }


        const savedOrder =
            await response.json();


        localStorage.setItem(
            "lastOrderId",
            savedOrder.orderId
        );

        localStorage.setItem(
            "lastOrderTotal",
            savedOrder.totalAmount
        );

        localStorage.setItem(
            "lastOrderItems",
            JSON.stringify(cart)
        );


        localStorage.removeItem(
            "cart"
        );


        window.location.href =
            "order-success.html";


    } catch (error) {

        console.error(error);

        alert(
            "Failed to place order. Please try again."
        );

    }

}


window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadCart();

    }
);