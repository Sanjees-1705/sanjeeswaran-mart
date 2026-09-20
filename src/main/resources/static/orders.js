/*
    Load Orders
*/

function loadOrders() {

    const ordersList =
        document.getElementById("ordersList");


    const orderId =
        localStorage.getItem("lastOrderId");

    const orderTotal =
        localStorage.getItem("lastOrderTotal");

    const orderItems =
        JSON.parse(
            localStorage.getItem("lastOrderItems")
        ) || [];


    /*
        Check if order exists
    */

    if (!orderId || orderItems.length === 0) {

        ordersList.innerHTML = `

            <div class="empty-orders">

                <h3>
                    No orders yet.
                </h3>

                <p>
                    Your placed orders will appear here.
                </p>

            </div>

        `;

        return;
    }


    /*
        Create order card
    */

    const orderCard =
        document.createElement("div");

    orderCard.className =
        "order-card";


    let itemsHTML = "";


    orderItems.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;


        itemsHTML += `

            <div class="order-item">

                <strong>
                    ${item.name}
                </strong>

                <p>
                    Price: ₹${item.price}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <p>
                    Item Total: ₹${itemTotal}
                </p>

            </div>

        `;

    });


    orderCard.innerHTML = `

        <h3>
            Order ID: ${orderId}
        </h3>

        <p>
            Status:
            <strong>Order Placed</strong>
        </p>

        <div class="order-items">

            <h4>
                Ordered Products
            </h4>

            ${itemsHTML}

        </div>

        <p class="order-total">
            Total Amount: ₹${orderTotal}
        </p>

    `;


    ordersList.appendChild(
        orderCard
    );

}


/*
    Back to Buyer Page
*/

function goBack() {

    window.location.href =
        "buyer.html";

}


/*
    Load orders when page opens
*/

window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadOrders();

    }
);