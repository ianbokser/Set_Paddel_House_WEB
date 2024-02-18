const mensajeEroor = document.getElementsByClassName("error")[0];
var verPassword = document.querySelector('.ver_password');
var password = document.getElementById('password');
const loader_login = document.getElementById('loader_login');
const botonIniciarSesion = document.querySelector('.boton_registrarse');

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    loader_login.classList.toggle("escondido",false);
    botonIniciarSesion.textContent = '';
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

verPassword.addEventListener("click", () => {
    if (password.type === "password"){
        password.type = "text";
        verPassword.src = "../IMAGES/eye-fill.svg";
    }
    else{
        password.type = "password";
        verPassword.src = "../IMAGES/eye-slash-fill.svg";
    }
});