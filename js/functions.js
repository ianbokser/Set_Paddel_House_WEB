
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

export function dropdown(busy_hours){
    if (busy_hours === "") {
        console.log(busy_hours);
    }
    var horasContainer = document.getElementById("horas");
    for (var i = 8; i <= 26; i++) {
        var hora = i % 24;
        var horaFormato = hora < 10 ? "0" + hora : hora;
        var horaString = horaFormato + ":00";
        var nuevoDiv = document.createElement("div");
        var ocupado = false;
        for (var j = 0; j < busy_hours.length; j++) {
            if (busy_hours[j].trim() === horaString) {
                ocupado = true;
                break;
            }
        }
        if (ocupado) {
            nuevoDiv.classList.add("horas_time", "ocupado");
        } else {
            nuevoDiv.classList.add("horas_time", "libre");
        }
        var nuevoParrafo = document.createElement("p");
        nuevoParrafo.classList.add("horarios");
        nuevoParrafo.textContent = horaString;
        nuevoDiv.appendChild(nuevoParrafo);
        horasContainer.appendChild(nuevoDiv);
    }
    const cantHorasDiv = document.createElement('div');
    cantHorasDiv.classList.add('cant_horas');
    cantHorasDiv.id = 'cant_horas';
    const pCuantasHoras = document.createElement('p');
    pCuantasHoras.classList.add('p_cuantas_horas');
    pCuantasHoras.textContent = 'Cuantas horas deseas jugar?';
    cantHorasDiv.appendChild(pCuantasHoras);
    const cantHorariosSection = document.createElement('section');
    cantHorariosSection.classList.add('cant_horarios');
    const horasArray = ['1:00 hora', '1:30 hora', '2:00 horas'];
    horasArray.forEach(hora => {
    const horariosTimeDiv = document.createElement('div');
    horariosTimeDiv.classList.add('horarios_time');

    const cantidadHorasJugarP = document.createElement('p');
    cantidadHorasJugarP.classList.add('cantidad_horas_jugar');
    cantidadHorasJugarP.textContent = hora;

    horariosTimeDiv.appendChild(cantidadHorasJugarP);
    cantHorariosSection.appendChild(horariosTimeDiv);
    });
    cantHorasDiv.appendChild(cantHorariosSection);
    const horasDiv = document.getElementById('horas');
    horasDiv.insertAdjacentElement('afterend', cantHorasDiv);
}
    export function checkSelectedDate(date, error_fecha) {
        if (date === "") {
            error_fecha.classList.toggle("escondido",false);
        }
}

export function fechaAnterior(){
    if (date.value < new Date().toISOString().split('T')[0]){
        return true;
    }else{
        return false;
    }
}

export function eliminarHoras() {
    var horasContainer = document.getElementById("horas");
    while (horasContainer.firstChild) {
        horasContainer.removeChild(horasContainer.firstChild);
    }
    const container = document.getElementById('cant_horas');
    container.innerHTML = '';
}


let horaSeleccionadaGlobal = "";
export function horaSeleccionada() {
    var horasTimeElements = document.querySelectorAll(".horas_time");
    horasTimeElements.forEach(function(element) {
        element.addEventListener("click", function() {
            horasTimeElements.forEach(function(el) {
                el.classList.remove("seleccionada");
            });
            element.classList.add("seleccionada");
            horaSeleccionadaGlobal = element.querySelector(".horarios").textContent;
        });
    });
    return horaSeleccionadaGlobal;
}

export function scrollHoras(){
    let isDown = false;
    let startX;
    let scrollLeft;
    const horas = document.getElementById('horas');
    horas.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - horas.offsetLeft;
        scrollLeft = horas.scrollLeft;
    });
    horas.addEventListener('mouseleave', () => {
        isDown = false;
    });
    horas.addEventListener('mouseup', () => {
        isDown = false;
    });
    horas.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - horas.offsetLeft;
        const walk = (x - startX) * 1;
        horas.scrollLeft = scrollLeft - walk;
    });
}

let cantHorasSeleccionadasGlobal = "";
export function cantHorasSeleccionadas(horaSeleccionada, busy_hours) {
    var horarios_time = document.querySelectorAll(".horarios_time");
    horarios_time.forEach(function(element) {
        element.addEventListener("click", function() {
            horarios_time.forEach(function(el) {
                el.classList.remove("seleccionada");
            });
            element.classList.add("seleccionada");
            cantHorasSeleccionadasGlobal = element.querySelector(".cantidad_horas_jugar").textContent;
        });
    });
    return horaSeleccionadaGlobal;
}