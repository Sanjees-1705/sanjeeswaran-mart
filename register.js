const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", function (event) {
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

    message.textContent = "Account created successfully!";
    message.style.color = "green";

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1500);
});

function goToLogin() {
    window.location.href = "login.html";
}