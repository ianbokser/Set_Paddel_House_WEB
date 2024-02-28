
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
        <p>Ya tienes cuenta? <a class="text_decoration" href="./logIn.html" title="Iniciar sesión">Inicia Sesión</a></p>
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

export function perfilUser(descripcion, tel_perfil, nacimiento_perfil, descripcion_perfil, posicion_perfil){
    if (descripcion.nacimiento_cliente === "0000-00-00"){
        nacimiento_perfil.textContent = "No especificado";
    }
    else{
        nacimiento_perfil.textContent = descripcion.nacimiento_cliente;
    }
    if (descripcion.descripcion === ""){
        descripcion_perfil.textContent = "No especificado";
    }
    else{
        descripcion_perfil.textContent = descripcion.descripcion;
    }
    if (descripcion.posicion === "drive"){
        posicion_perfil.textContent = "Drive";
    }
    if (descripcion.posicion === "reves"){
        posicion_perfil.textContent = "Revés";
    }
    if (descripcion.tel_cliente === 0){
        console.log("No especificado nashei");
        tel_perfil.textContent = "No especificado";
    }
    else{
        tel_perfil.textContent = descripcion.tel_cliente;
    }
}

export function noLogued(registerPageSection){
    registerPageSection.innerHTML = '';
    registerPageSection.innerHTML = '';
    var sectionNoLogued = document.createElement('section');
    sectionNoLogued.classList.add('section_no_logued');
    var noLoguedDiv = document.createElement('div');
    noLoguedDiv.classList.add('no_logued');
    var messageParagraph = document.createElement('p');
    messageParagraph.classList.add('no_logued_p');
    messageParagraph.textContent = 'No estás logueado';
    noLoguedDiv.appendChild(messageParagraph);
    var redirectNoLoguedDiv = document.createElement('div');
    redirectNoLoguedDiv.classList.add('redirect_no_logued');
    var loginLink = document.createElement('a');
    loginLink.href = './logIn.html';
    loginLink.textContent = 'Iniciar Sesión';
    var registerLink = document.createElement('a');
    registerLink.href = './singUp.html';
    registerLink.textContent = 'Registrarse';
    redirectNoLoguedDiv.appendChild(loginLink);
    redirectNoLoguedDiv.appendChild(registerLink);
    sectionNoLogued.appendChild(noLoguedDiv);
    sectionNoLogued.appendChild(redirectNoLoguedDiv);
    registerPageSection.appendChild(sectionNoLogued);
}

export async function horasOcupadas(token, date) {
    try {
        const response = await fetch("http://localhost:3050/api/busy_hours", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
                date: date,
            })
        });
        const horasOcupadas = await response.json();
        if (horasOcupadas.Status === "ok") {
            return horasOcupadas.busy_hours;
        } else {
            throw new Error("Error: " + horasOcupadas.Message);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
}

export function checkSelectedDate(date, error_fecha) {
    if (date === "") {
        error_fecha.classList.toggle("escondido",false);
    } else {
        error_fecha.classList.toggle("escondido",true);
    }
}