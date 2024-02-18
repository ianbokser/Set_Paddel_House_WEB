const tokenRecuperado = localStorage.getItem("jwt");
const fechaExpiracionRecuperada = localStorage.getItem("expiracion");
const registerDiv = document.querySelector('.register');

import { tokenData, tokenExpired,userName } from "./functions.js";

const tokenExpiredResults = tokenExpired(tokenRecuperado,fechaExpiracionRecuperada);
if (tokenExpiredResults){
    const tokenDataResult = await tokenData();
    if (tokenDataResult.ok){
        const usuario = tokenDataResult.token.name;
        const index = false;
        userName(registerDiv, usuario, index);
    }
}   

const user = await tokenData();