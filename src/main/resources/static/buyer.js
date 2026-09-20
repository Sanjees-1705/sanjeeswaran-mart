function showProducts() {
    document.getElementById("productsSection").scrollIntoView({
        behavior: "smooth"
    });
}

function showCart() {
    alert("Cart page will be added next.");
}

function showWishlist() {
    alert("Wishlist page will be added next.");
}

function addToCart(productName, price) {
    alert(productName + " added to cart. Price: ₹" + price);
}

function addToWishlist(productName) {
    alert(productName + " added to wishlist.");
}

function logout() {
    window.location.href = "login.html";
}