function loadWishlist() {

    const wishlistItems =
        document.getElementById("wishlistItems");

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <h3>❤️ Wishlist is empty</h3>
                <p>Add products to your wishlist.</p>
            </div>
        `;

        return;
    }

    wishlist.forEach(function (item, index) {

        const wishlistItem =
            document.createElement("div");

        wishlistItem.className =
            "wishlist-item";

        wishlistItem.innerHTML = `

            <h3>
                ${item.name}
            </h3>

            <p>
                Price: ₹${item.price}
            </p>

            <button
                class="remove-button"
                onclick="removeFromWishlist(${index})"
            >
                Remove
            </button>

        `;

        wishlistItems.appendChild(
            wishlistItem
        );

    });
}


function removeFromWishlist(index) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    loadWishlist();
}


function goBack() {

    window.location.href =
        "buyer.html";

}


window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadWishlist();

    }
);