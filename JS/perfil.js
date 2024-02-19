const tokenRecuperado = localStorage.getItem("jwt");
const fechaExpiracionRecuperada = localStorage.getItem("expiracion");
const registerDiv = document.querySelector('.register');
var registerPageSection = document.querySelector('.Sing_Up');
const nombre_perfil = document.getElementById('nombre_perfil');
const mail_perfil = document.getElementById('mail_perfil');
var tel_perfil = document.getElementById('tel_perfil');
const nacimiento_perfil = document.getElementById('nacimiento_perfil');
const descripcion_perfil = document.getElementById('descripcion_perfil');
const posicion_perfil = document.getElementById('posicion_perfil');
editar_perfil_img



import { tokenData, tokenExpired,userName, description, perfilUser,noLogued } from "./functions.js";

const tokenExpiredResults = tokenExpired(tokenRecuperado,fechaExpiracionRecuperada);
if (tokenExpiredResults){
    const tokenDataResult = await tokenData();
    if (tokenDataResult.ok){
        const usuario = tokenDataResult.token;
        const index = false;
        userName(registerDiv, usuario, index);
    }
    const descripcion = await description();
    console.log(descripcion);
    if (descripcion.ok){
        nombre_perfil.textContent = descripcion.name;
        mail_perfil.textContent = descripcion.mail;
        perfilUser(descripcion, tel_perfil, nacimiento_perfil, descripcion_perfil, posicion_perfil);
    }
}
else{
    noLogued(registerPageSection);
}
