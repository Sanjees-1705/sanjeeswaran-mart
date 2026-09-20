const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === "" ||
        role === ""
    ) {
        message.textContent = "Please fill all fields.";
        message.style.color = "red";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "red";
        return;
    }

    try {
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: role
            })
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        message.textContent = "Account created successfully!";
        message.style.color = "green";

        registerForm.reset();

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);

    } catch (error) {
        message.textContent = "Registration failed. Please try again.";
        message.style.color = "red";
        console.error(error);
    }
});

function goToLogin() {
    window.location.href = "login.html";
}