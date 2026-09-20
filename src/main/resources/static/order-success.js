const orderId =
    localStorage.getItem("lastOrderId");

const orderTotal =
    localStorage.getItem("lastOrderTotal");


document.getElementById(
    "orderId"
).textContent =
    "Order ID: " + orderId;


document.getElementById(
    "orderTotal"
).textContent =
    "Total Amount: ₹" + orderTotal;


/*
    Continue Shopping
*/
function continueShopping() {

    window.location.href =
        "buyer.html";

}