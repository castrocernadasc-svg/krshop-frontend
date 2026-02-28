document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    // Leer las cuentas desde el archivo JSON
    fetch('db.json')
        .then(response => response.json())
        .then(cuentas => {
            const cuentaValida = cuentas.find(cuenta => cuenta.correo === correo && cuenta.contraseña === contraseña);
            const resultadoDiv = document.getElementById('resultado');

            if (cuentaValida) {
                // Si las credenciales son correctas, ocultamos el formulario de inicio de sesión
                document.getElementById('loginFormContainer').style.display = 'none';
                // Mostramos la bandeja de entrada
                document.getElementById('bandejaEntrada').style.display = 'block';
                mostrarCorreos(cuentas); // Mostrar los correos en la bandeja de entrada
            } else {
                resultadoDiv.innerHTML = "<p>Correo o contraseña incorrectos.</p>";
            }
        });
});

// Mostrar los correos en la bandeja de entrada
function mostrarCorreos(cuentas) {
    const correosList = document.getElementById('correos');
    correosList.innerHTML = ''; // Limpiar la lista de correos antes de agregar los nuevos

    cuentas.forEach((cuenta, index) => {
        const li = document.createElement('li');
        li.textContent = cuenta.correo; // Mostrar el correo
        li.onclick = () => mostrarDetallesCorreo(cuenta, index); // Hacer clic en un correo para verlo
        correosList.appendChild(li);
    });
}

// Mostrar detalles de un correo
function mostrarDetallesCorreo(cuenta, index) {
    // Ocultar la bandeja de entrada y mostrar los detalles del correo
    document.getElementById('bandejaEntrada').style.display = 'none';
    document.getElementById('detalleCorreo').style.display = 'block';

    const contenidoCorreo = document.getElementById('contenidoCorreo');
    contenidoCorreo.textContent = `Correo: ${cuenta.correo}\nContraseña: ${cuenta.contraseña}\n\nContenido del mensaje: \nEste es un mensaje de prueba.`; // Ejemplo de contenido de correo
}

// Volver a la bandeja de entrada
document.getElementById('volver').addEventListener('click', function () {
    document.getElementById('detalleCorreo').style.display = 'none';
    document.getElementById('bandejaEntrada').style.display = 'block';
});