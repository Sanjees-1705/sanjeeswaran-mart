/*
    Load Orders
*/
async function loadOrders() {

    const ordersList =
        document.getElementById("ordersList");

    const userId =
        localStorage.getItem(
            "loggedInUserId"
        );

    if (!userId) {

        ordersList.innerHTML = `
            <div class="empty-orders">
                <h3>Please login first.</h3>
            </div>
        `;

        return;
    }


    try {

        const response =
            await fetch(
                "/api/orders/user/" + userId
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load orders"
            );

        }


        const orders =
            await response.json();


        ordersList.innerHTML = "";


        if (orders.length === 0) {

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


        orders.forEach(function (order) {

            const orderCard =
                document.createElement("div");

            orderCard.className =
                "order-card";


            orderCard.innerHTML = `

                <h3>
                    Order ID: ${order.orderId}
                </h3>

                <p>
                    Status:
                    <strong>
                        ${order.status}
                    </strong>
                </p>

                <p class="order-total">
                    Total Amount:
                    ₹${order.totalAmount}
                </p>

            `;


            ordersList.appendChild(
                orderCard
            );

        });


    } catch (error) {

        console.error(error);

        ordersList.innerHTML = `

            <div class="empty-orders">

                <h3>
                    Failed to load orders.
                </h3>

                <p>
                    Please try again.
                </p>

            </div>

        `;

    }

}


/*
    Back to Products
*/
function goBack() {

    window.location.href =
        "buyer.html";

}


/*
    Automatically Load Orders
*/
window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadOrders();

    }
);