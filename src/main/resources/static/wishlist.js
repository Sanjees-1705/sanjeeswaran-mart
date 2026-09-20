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

        wishlistItem.innerHTML = `

            <h3>
                ${item.name}
            </h3>

            <p>
               Price: ₹${item.price}
            </p>

            <button
                class="cart-button"
                onclick="addWishlistItemToCart(${index})"
            >
                🛒 Add to Cart
            </button>

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

function addWishlistItemToCart(index) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const item = wishlist[index];

    const existingProduct =
        cart.find(function (cartItem) {
            return cartItem.name === item.name;
        });

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: item.name,
            price: item.price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(
        item.name +
        " added to cart."
    );
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