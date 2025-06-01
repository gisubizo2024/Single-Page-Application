// Dummy users (you can extend this)
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
];

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  const session = JSON.parse(localStorage.getItem("session"));
  if (session) {
    showNavbar();
    renderPage("home");
  } else {
    renderLogin();
  }
});

function renderLogin() {
  hideNavbar();
  document.getElementById("app").innerHTML = `
    <h2>Login</h2>
    <form onsubmit="login(event)">
      <input type="text" id="username" placeholder="Username" required><br><br>
      <input type="password" id="password" placeholder="Password" required><br><br>
      <button type="submit">Login</button>
    </form>
  `;
}

function login(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("session", JSON.stringify(user));
    showNavbar();
    renderPage("home");
  } else {
    alert("Invalid credentials");
  }
}

function renderPage(page) {
  const session = JSON.parse(localStorage.getItem("session"));
  if (!session) return renderLogin();

  const app = document.getElementById("app");

  if (page === "home") {
    app.innerHTML = `<h2>Welcome, ${session.username} (${session.role})</h2>
                     <p>This is the Home Page.</p>`;
  } else if (page === "dashboard") {
    if (session.role === "admin") {
      app.innerHTML = `<h2>Admin Dashboard</h2>
                       <p>Manage users, view reports, and more.</p>`;
    } else {
      app.innerHTML = `<h2>User Dashboard</h2>
                       <p>View your profile, data, etc.</p>`;
    }
  }
}

function logout() {
  localStorage.removeItem("session");
  hideNavbar();
  renderLogin();
}

function showNavbar() {
  document.getElementById("navbar").classList.remove("hidden");
}

function hideNavbar() {
  document.getElementById("navbar").classList.add("hidden");
}
