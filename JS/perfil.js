const tokenRecuperado = localStorage.getItem("jwt");
const fechaExpiracionRecuperada = localStorage.getItem("expiracion");
const registerDiv = document.querySelector('.register');

import { tokenData, tokenExpired,userName, description } from "./functions.js";

const tokenExpiredResults = tokenExpired(tokenRecuperado,fechaExpiracionRecuperada);
if (tokenExpiredResults){
    const tokenDataResult = await tokenData();
    if (tokenDataResult.ok){
        const usuario = tokenDataResult.token;
        const index = false;
        userName(registerDiv, usuario, index);
    }
    const descripcion = await description();
    if (descripcion.ok){
        console.log(descripcion);
    }
}
