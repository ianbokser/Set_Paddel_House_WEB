export function crateToken(token){
    const tiempoExpiracion = 3600 * 1000;
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + tiempoExpiracion);
    localStorage.setItem("jwt", token);
    localStorage.setItem("expiracion", fechaExpiracion.getTime().toString());
}

export function tokenExpired(tokenRecuperado,fechaExpiracionRecuperada){
    if (tokenRecuperado && fechaExpiracionRecuperada) {
        const fechaExpiracion = new Date(parseInt(fechaExpiracionRecuperada, 10));
        if (fechaExpiracion < new Date()) {
            console.log("El token ha expirado");
            localStorage.removeItem("jwt");
            localStorage.removeItem("expiracion");
            return;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export async function tokenData(){
    var jwt = localStorage.getItem('jwt');
    const res = await fetch("http://localhost:3050/api/user",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            token: jwt,
        })
    });
    const resJson = await res.json();
    return resJson;
}

export function userName(registerDiv, usuario){
    const userNameParagraph = document.createElement('p');
    userNameParagraph.classList.add('user');
    userNameParagraph.textContent = usuario;
    registerDiv.classList.remove('register');
    registerDiv.classList.remove('flex');
    registerDiv.classList.add('user_class')

    const viewProfileLink = document.createElement('a');
    viewProfileLink.classList.add('view_profile');
    viewProfileLink.href = './pages/perfil.html';
    viewProfileLink.textContent = 'ver perfil';

    const cerrarsesion = document.createElement('button');
    cerrarsesion.classList.add('cerrarsesion');
    cerrarsesion.onclick = function(){
        localStorage.removeItem("jwt");
        localStorage.removeItem("expiracion");
        window.location.href = '../index.html';
    }
    cerrarsesion.textContent = 'Cerrar Sesión';
    const links = registerDiv.querySelectorAll('a');
    links.forEach(link => {
        link.remove();
    });
    registerDiv.appendChild(userNameParagraph);
    registerDiv.appendChild(viewProfileLink);
    registerDiv.appendChild(cerrarsesion);
}