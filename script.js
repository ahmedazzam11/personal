// ===== Light / Dark mode =====
// The saved theme is applied in <head> before the page loads.
// Here we only handle the toggle button.
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
    root.setAttribute("data-bs-theme", theme);
    themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
    themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
}

themeToggle.addEventListener("click", function () {
    let next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
        localStorage.setItem("theme", next);
    } catch (e) {
        /* storage not available, ignore */
    }
});

// Set the button text to match the current theme
applyTheme(root.getAttribute("data-bs-theme") || "light");

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Contact form (front end only - nothing is sent anywhere) =====
let contactForm = document.getElementById("contactForm");
let formAlert = document.getElementById("formAlert");

function showAlert(type, message) {
    let box = document.createElement("div");
    box.className = `alert alert-${type} mb-0`;
    box.textContent = message; // textContent prevents HTML injection
    formAlert.replaceChildren(box);
}

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        showAlert("danger", "Please fill in all fields.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAlert("danger", "Please enter a valid email address.");
        return;
    }

    // Later you can connect this form to a real service (for example Formspree)
    showAlert("success", `Thank you, ${name}! Your message was received (demo form only).`);
    contactForm.reset();
});
