const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const form = document.getElementById("postForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    try {

        const response = await fetch("http://localhost:5000/api/posts", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                title,
                content
            })

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {
            window.location.href = "index.html";
        }

    } catch (error) {

        alert("Error creating post");
        console.log(error);

    }

});