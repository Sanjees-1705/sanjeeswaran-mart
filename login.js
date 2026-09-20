const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (email === "" || password === "" || role === "") {
        message.textContent = "Please fill all fields.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Login successful!";
    message.style.color = "green";

    setTimeout(function () {
        if (role === "buyer") {
            window.location.href = "buyer.html";
        } else if (role === "seller") {
            window.location.href = "seller.html";
        }
    }, 1000);
});

function registerUser() {
    window.location.href = "register.html";
}