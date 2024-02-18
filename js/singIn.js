const mensajeEroor = document.getElementsByClassName("error")[0];
var verPassword = document.querySelector('.ver_password');
var password = document.getElementById('password');
const loader_login = document.getElementById('loader_login');
const botonIniciarSesion = document.querySelector('.boton_registrarse');


import { crateToken } from "./functions.js"

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    loader_login.classList.toggle("escondido",false);
    botonIniciarSesion.textContent = '';
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const res = await fetch("http://localhost:3050/api/login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    }); 
    if (!res.ok) return mensajeEroor.classList.toggle("escondido",false);
    const resJson = await res.json();
    if (resJson.redirect) {
        console.log(resJson);
        const nombre = "jwt";
        crateToken(resJson.token,  nombre);
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