const tokenRecuperado = localStorage.getItem("jwt");
const fechaExpiracionRecuperada = localStorage.getItem("expiracion");
const registerDiv = document.querySelector('.register');

import { tokenData, tokenExpired,userName } from "./functions.js";

const tokenExpiredResults = tokenExpired(tokenRecuperado,fechaExpiracionRecuperada);

if (tokenExpiredResults){
    const tokenDataResult = await tokenData();
    if (tokenDataResult.ok){
        console.log(tokenDataResult);
        const usuario = tokenDataResult.token;
        const index = false;
        userName(registerDiv, usuario, index);
    }
}   

const user = await tokenData();