const tokenRecuperado = localStorage.getItem("jwt");
const fechaExpiracionRecuperada = localStorage.getItem("expiracion");
const registerDiv = document.querySelector('.register');
const profile = document.getElementsByClassName("view_profile")[0];

import { tokenData, tokenExpired,userName } from "./functions.js";

var tokenExpiredResults = tokenExpired(tokenRecuperado,fechaExpiracionRecuperada);
if (tokenExpiredResults){
    const tokenDataResult = await tokenData();
    if (tokenDataResult.ok){
        const usuario = tokenDataResult.token;
        const index = true;
        userName(registerDiv, usuario, index);
    }
}   


profile.addEventListener('click', async () => {
    if (tokenExpiredResults) {
        const res = await fetch("http://localhost:3050/api/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: tokenRecuperado,
            })
        });
    }
});

