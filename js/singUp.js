const mensajeEroor = document.getElementsByClassName("error")[0];
const mensajeExito = document.getElementById("exito");
const mensajeExito2 = document.getElementById("exito2");

var verPassword = document.querySelector('.ver_password');
var password = document.getElementById('password');
const loader_login = document.getElementById('loader_login');
const botonIniciarSesion = document.querySelector('.boton_registrarse');

import { emailconfirmacion } from "./functions.js";


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
    const resJson = await res.json();
    if (!res.ok) {
        mensajeExito.classList.toggle("escondido",true);
        mensajeExito2.classList.toggle("escondido",true);
        mensajeEroor.classList.toggle("escondido",false);
        loader_login.classList.toggle("escondido",true);
        botonIniciarSesion.textContent = 'Registrarse';
    }
    else{
        mensajeEroor.classList.toggle("escondido",true);
        mensajeExito.classList.toggle("escondido",false);
        mensajeExito2.classList.toggle("escondido",false);
        loader_login.classList.toggle("escondido",true);
        botonIniciarSesion.textContent = 'Registrarse';
        const formData = {
            name: user,
            verification_link: 'http://localhost:3050/api/confirm_email?unique=' + resJson.unique+"&user="+user,
            reply_to: email,
        };
        emailconfirmacion(formData);
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