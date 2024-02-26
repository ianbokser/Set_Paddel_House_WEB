const tokenRecuperado = localStorage.getItem("jwt");
const fechaExpiracionRecuperada = localStorage.getItem("expiracion");
const registerDiv = document.querySelector('.register');
const register_page = document.querySelector('.register_page');
const error = document.getElementsByClassName("error")[0];
const loader_login = document.getElementById('loader_login');
const botonIniciarSesion = document.querySelector('.boton_registrarse');
const alquiler_exitoso = document.getElementById('alquiler_exitoso');
const timeDropdown = document.getElementById('timeDropdown');
const timeOptions = document.getElementById('timeOptions');
const dropbtn = document.querySelector('.dropbtn');

import { tokenData, tokenExpired, userName, alquilarLoguarse, crateToken, sendEmail } from "./functions.js";

const tokenExpiredResults = tokenExpired(tokenRecuperado, fechaExpiracionRecuperada);
if (tokenExpiredResults) {
    const tokenDataResult = await tokenData();
    if (tokenDataResult.ok) {
        const usuario = tokenDataResult.token;
        const index = false;
        userName(registerDiv, usuario, index);
    } else {
        alquilarLoguarse(register_page);
    }
} else {
    alquilarLoguarse(register_page);
}

document.getElementById("alquilar_form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!tokenExpiredResults) {
        error.classList.toggle("escondido", false);
    } else {
        const formData = new FormData(e.target);
        const date = formData.get("date");
        const hour = dropbtn.textContent;
        loader_login.classList.toggle("escondido", false);
        botonIniciarSesion.textContent = '';
        const res = await fetch("http://localhost:3050/api/alquilar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: tokenRecuperado,
                date: date,
                hour: hour,
            })
        });
        const resJson = await res.json();
        if (resJson.Status === "ok") {
            const nombre = "alquiler";
            crateToken(resJson.tokenAlquiler, nombre);
            const tokenDataResult = await tokenData();
            if (tokenDataResult.ok) {
                loader_login.classList.toggle("escondido", true);
                botonIniciarSesion.classList.toggle("escondido", true);
                alquiler_exitoso.classList.toggle("escondido", false);
            }
        }
    }
});

const user = await tokenData();

for (let hour = 8; hour <= 26; hour++) {
    console.log(date);
    let displayHour = hour % 24;
    for (let minute = 0; minute < 60; minute += 30) {
        const option = document.createElement('a');
        option.classList.add('libre');
        option.textContent = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        option.addEventListener('click', function() {
            dropbtn.textContent = this.textContent;
            timeOptions.classList.remove('show');
        });
        timeOptions.appendChild(option);
    }
}

timeDropdown.addEventListener('click', function() {
    timeOptions.classList.toggle('show');
});

window.addEventListener('click', function(event) {
    if (!isClickedInsideDropdown) {
        event.preventDefault();
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});
