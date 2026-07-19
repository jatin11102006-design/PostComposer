const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

async function loadPosts() {

    try {

        const response = await fetch("http://localhost:5000/api/posts");

        const data = await response.json();

        const postContainer = document.getElementById("posts");

        postContainer.innerHTML = "";

        data.posts.forEach(post => {

    postContainer.innerHTML += `
<div class="post">

<h3>${post.title}</h3>

<p>${post.content}</p>

<p><b>Author:</b> ${post.author?.name || "Unknown"}</p>

<div class="actions">

<button class="edit-btn"
onclick="window.location.href='edit-post.html?id=${post._id}'">

✏ Edit

</button>

<button class="delete-btn"
onclick="deletePost('${post._id}')">

🗑 Delete

</button>

</div>

</div>
`;
});

    } catch (error) {

        console.log(error);

    }

}

async function deletePost(id){

    if(!confirm("Delete this post?")) return;

    const response = await fetch(`http://localhost:5000/api/posts/${id}`,{

        method:"DELETE",

        headers:{
            Authorization:`Bearer ${token}`
        }

    });

    const data = await response.json();

    alert(data.message);

    loadPosts();

}

function logout(){

    localStorage.removeItem("token");

    window.location.href="login.html";

}

loadPosts();