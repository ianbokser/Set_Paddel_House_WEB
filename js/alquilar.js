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
const error_fecha_anterior = document.getElementById('error_fecha_anterior');
const horasContainer = document.getElementById('.horas');
var horasTimeElements = document.querySelectorAll(".horas_time");

import { tokenData, tokenExpired, userName, alquilarLoguarse, crateToken, horasOcupadas, checkSelectedDate, fechaAnterior, dropdown, eliminarHoras, horaSeleccionada, scrollHoras, cantHorasSeleccionadas } from "./functions.js";

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
        if (fechaAnterior(error_fecha_anterior)) {
            error_fecha_anterior.classList.toggle("escondido",false);
        }else{
            let hour = horaSeleccionada();
            if (hour === undefined || hour === "") {
                error_fecha.classList.toggle("escondido", false);
            } else {
                if (busy_hours.includes(hour)) {
                    error_fecha_anterior.classList.toggle("escondido",false);
                } else {
                    error_fecha_anterior.classList.toggle("escondido",true);
                    const formData = new FormData(e.target);
                    const date = formData.get("date");
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
            }
        }
    }
});

var busy_hours = [];
dropdown(busy_hours);
checkSelectedDate();
horaSeleccionada();
cantHorasSeleccionadas();
scrollHoras();

date.addEventListener('change', async function() {
    if (fechaAnterior(error_fecha_anterior)) {
        error_fecha_anterior.classList.toggle("escondido",false);
    }else{
        eliminarHoras();
        error_fecha_anterior.classList.toggle("escondido",true);
        error_fecha.classList.toggle("escondido", true);
        var selectedDate = date.value;
        try {
            busy_hours = await horasOcupadas(tokenRecuperado, selectedDate);
        } catch (error) {
            console.error("Error al obtener horas ocupadas:", error);
        }
        dropdown(busy_hours);
        horaSeleccionada();
        cantHorasSeleccionadas();
    }
});
