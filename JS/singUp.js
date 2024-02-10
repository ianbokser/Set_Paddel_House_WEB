const mensajeEroor = document.getElementsByClassName("error")[0];

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = formData.get("user");
    const email = formData.get("email");
    const password = formData.get("password");
    const res = await fetch("http://localhost:3050/api/register", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            user: user,
            email: email,
            password: password,
        })
    });
    if (!res.ok) return mensajeEroor.classList.toggle("escondido",false);
    const resJson = await res.json();
    if (resJson.redirect) {
        window.location.href = resJson.redirect;
    }  
});