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
const date = document.getElementById('date');
const error_fecha = document.getElementById('error_fecha');

import { tokenData, tokenExpired, userName, alquilarLoguarse, crateToken, horasOcupadas, checkSelectedDate } from "./functions.js";

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


// let selectedDate = date.value;

dropbtn.addEventListener('click', function() {
    checkSelectedDate(date.value, error_fecha); 
});

date.addEventListener('change', async function() {
    error_fecha.classList.toggle("escondido", true);
    var selectedDate = date.value;
    try {
        var busy_hours = await horasOcupadas(tokenRecuperado, selectedDate);
    } catch (error) {
        console.error("Error al obtener horas ocupadas:", error);
    }
    for (let hour = 8; hour <= 26; hour++) {
        let displayHour = hour % 24;
        for (let minute = 0; minute < 60; minute += 30) {
            const option = document.createElement('a');
            option.textContent = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            if (busy_hours.includes(option.textContent)) {
                option.classList.add('ocupado');
            } else {
                option.classList.add('libre');
            }
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
        if (!event.target.closest('.time_dropdown')) {
            const dropdowns = document.getElementsByClassName('dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });   
});


checkSelectedDate();