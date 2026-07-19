const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login Successful");

      // Save JWT Token
      localStorage.setItem("token", data.token);

      // Go to dashboard
      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Server Error");
    console.log(error);
  }
});