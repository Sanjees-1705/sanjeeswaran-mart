const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (email === "" || password === "" || role === "") {
        message.textContent = "Please fill all fields.";
        message.style.color = "red";
        return;
    }

    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                role: role
            })
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const user = await response.json();

        if (!user || !user.id) {
            message.textContent = "Invalid email, password or role.";
            message.style.color = "red";
            return;
        }

        message.textContent = "Login successful!";
        message.style.color = "green";

        setTimeout(function () {
            if (user.role === "buyer") {
                window.location.href = "buyer.html";
            } else if (user.role === "seller") {
                window.location.href = "seller.html";
            }
        }, 1000);

    } catch (error) {
        message.textContent = "Login failed. Please try again.";
        message.style.color = "red";
        console.error(error);
    }
});

function registerUser() {
    window.location.href = "register.html";
}