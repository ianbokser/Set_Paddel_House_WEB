const tokenRecuperado = localStorage.getItem("jwt");
const fechaExpiracionRecuperada = localStorage.getItem("expiracion");
const registerDiv = document.querySelector('.register');
const register_page = document.querySelector('.register_page');
const error = document.getElementsByClassName("error")[0];
const loader_login = document.getElementById('loader_login');
const botonIniciarSesion = document.querySelector('.boton_registrarse');
const qrcode = document.getElementById('qrcode');
const alquiler_exitoso = document.getElementById('alquiler_exitoso');



import { tokenData, tokenExpired,userName, alquilarLoguarse, crateToken, sendEmail } from "./functions.js";

const tokenExpiredResults = tokenExpired(tokenRecuperado,fechaExpiracionRecuperada);
if (tokenExpiredResults){
    const tokenDataResult = await tokenData();
    if (tokenDataResult.ok){
        const usuario = tokenDataResult.token.name;
        const index = false;
        userName(registerDiv, usuario, index);
    }
    else{
        alquilarLoguarse(register_page);
    }
}
else{
    alquilarLoguarse(register_page);
}

document.getElementById("alquilar_form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!tokenExpiredResults){
        error.classList.toggle("escondido",false);
    }
    else{
        const formData = new FormData(e.target);
        const date = formData.get("date");
        loader_login.classList.toggle("escondido",false);
        botonIniciarSesion.textContent = '';
        const res = await fetch("http://localhost:3050/api/alquilar", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                token: tokenRecuperado,
                date: date,
            })
        });
        const resJson = await res.json();
        if (resJson.Status === "ok"){
            const nombre = "alquiler";
            crateToken(resJson.tokenAlquiler, nombre);

            const tokenDataResult = await tokenData();
            if (tokenDataResult.ok){
                const usuario = tokenDataResult.token.name;
                var qr = new QRCode(document.createElement("div"), {
                    token_alquiler: resJson.tokenAlquiler,
                });
                const qrImageUrl = qr._el.firstChild.toDataURL("image/png");
                sendEmail(qrImageUrl, date, usuario);
                loader_login.classList.toggle("escondido",true);
                botonIniciarSesion.classList.toggle("escondido",true);
                alquiler_exitoso.classList.toggle("escondido",false);
            }
        }
    }
});

const user = await tokenData();