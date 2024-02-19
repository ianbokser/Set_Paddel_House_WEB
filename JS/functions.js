export function crateToken(token, nombre){
    const tiempoExpiracion = 3600 * 1000;
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + tiempoExpiracion);
    localStorage.setItem(nombre, token);
    if (nombre !== "alquiler"){
        localStorage.setItem("expiracion", fechaExpiracion.getTime().toString());
    }
};

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
};

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
};

export function userName(registerDiv, usuario, index){
    const userNameParagraph = document.createElement('p');
    userNameParagraph.classList.add('user');
    userNameParagraph.textContent = usuario;
    registerDiv.classList.remove('register');
    registerDiv.classList.remove('flex');
    registerDiv.classList.add('user_class')

    const viewProfileLink = document.createElement('a');
    viewProfileLink.classList.add('view_profile');
    viewProfileLink.textContent = 'ver perfil';
    if (index){
        viewProfileLink.href = './pages/perfil.html';
    }else{
        viewProfileLink.href = './perfil.html';
    }
    
    const cerrarsesion = document.createElement('button');
    cerrarsesion.classList.add('cerrarsesion');
    cerrarsesion.onclick = function(){
        localStorage.removeItem("jwt");
        localStorage.removeItem("expiracion");
        localStorage.removeItem("alquiler");
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
};

export function alquilarLoguarse(register_page,error){
    const nuevosElementosHTML = `
    <div class="ya_tiene_cuenta">
        <p>No tienes cuenta? <a class="text_decoration" href="./singUp.html" title="Ir a la página de registro">Registrarse</a></p>
    </div>
    <div class="ya_tiene_cuenta">
        <p>Ya tienes cuenta? <a class="text_decoration" href="./logIn" title="Iniciar sesión">Inicia Sesión</a></p>
    </div>
    `;-

    register_page.insertAdjacentHTML('beforeend', nuevosElementosHTML);
};

export function sendEmail(qrImageUrl, date, usuario) {
    var templateParams = {
        to_name: usuario,
        fecha_hora_reserva: date,
        qrImageUrl: qrImageUrl,
    };
    emailjs.send("Set_paddle","template_a7p9onv", templateParams)
        .then(function(response) {
            console.log('Correo electrónico enviado correctamente!', response);
        }, function(error) {
            console.error('Error al enviar el correo electrónico:', error);
        });
};

export async function description(){
    var jwt = localStorage.getItem('jwt');
    const res = await fetch("http://localhost:3050/api/user_description",{
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
};