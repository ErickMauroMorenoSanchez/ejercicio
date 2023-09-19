const urlObtenerUsuarios = 'http://localhost/crud_empleados_puestos/api/obtenerUsuarios.php';
const urlAgregarUsuario = 'http://localhost/crud_empleados_puestos/api/agregarUsuario.php';
const urlEditarUsuario = 'http://localhost/crud_empleados_puestos/api/editarUsuario.php';
const urlBorrarUsuario = 'http://localhost/crud_empleados_puestos/api/borrarUsuario.php';

let listaEmpleados = [];

const empleadoSeleccionado = {
    Id_emp: '',
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Telefono: '',
    Id_puesto: '',
};

let editando = false;

const formulario = document.querySelector('#formulario');

const nombreEmpleado = document.querySelector('#nombre');
const apellidoEmpleado = document.querySelector('#apellido');
const direccionEmpleado = document.querySelector('#direccion');
const telefonoEmpleado = document.querySelector('#telefono');
const id_puestoEmpleado = document.querySelector('#id_puesto');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    if([nombreEmpleado.value, apellidoEmpleado.value, direccionEmpleado.value, telefonoEmpleado.value, 
        id_puestoEmpleado.value].includes('')){
        alert('Completa los datos');
        return;
    }

    if(editando){
        editarEmpleado();
        editando = false;
    } else {
        console.log('Date.now() ', Date.now());
        empleadoSeleccionado.Id_emp = Date.now();
        console.log('empleadoSeleccionado.Id_emp ', empleadoSeleccionado.Id_emp);
        empleadoSeleccionado.Nombre = nombreEmpleado.value;
        empleadoSeleccionado.Apellido = apellidoEmpleado.value;
        empleadoSeleccionado.Direccion = direccionEmpleado.value;
        empleadoSeleccionado.Telefono = telefonoEmpleado.value;
        empleadoSeleccionado.Id_puesto = id_puestoEmpleado.value;
        console.log('empleadoSeleccionado ', empleadoSeleccionado);

        console.log('nombreEmpleado.value ', nombreEmpleado.value);
        console.log('apellidoEmpleado.value ', apellidoEmpleado.value);
        console.log('direccionEmpleado.value ', direccionEmpleado.value);
        console.log('telefonoEmpleado.value ', telefonoEmpleado.value);
        console.log('id_puestoEmpleado.value ', id_puestoEmpleado.value);
        agregarEmpleado();
    }

}

async function obtenerEmpleados() {
    listaEmpleados = await fetch(urlObtenerUsuarios)
    .then(respuesta => respuesta.json())
    .then(datos => datos)
    .catch(error => console.log(error));

    mostrarEmpleados();
}

obtenerEmpleados();

function mostrarEmpleados() {
    const divEmpleados = document.querySelector('.div-empleados');

    listaEmpleados.forEach(empleado => {
        const {Id_emp, Nombre, Apellido, Direccion, Telefono, Id_puesto} = empleado;

        const parrafo = document.createElement('p');

        parrafo.textContent = `${Id_emp} - ${Nombre} - ${Apellido} - ${Direccion} - ${Telefono} - ${Id_puesto} `;
        parrafo.dataset.id = Id_emp;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-info', 'btn-sm');

        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(Id_emp);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-danger', 'btn-sm');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

async function agregarEmpleado() {
    const res = await fetch(urlAgregarUsuario,
        {
            method: 'POST',
            body: JSON.stringify(empleadoSeleccionado)
        })
        .then(respuesta => respuesta.json())
        .then(data => data)
        .catch(error => alert(error));

        if(res.msg === 'OK') {
            alert('Se registró exitosamente');
            limpiarHTML();
            obtenerEmpleados();

            formulario.reset();
            limpiarObjeto();
        }
}

async function editarEmpleado() {
    empleadoSeleccionado.Nombre = nombreEmpleado.value;
    empleadoSeleccionado.Apellido = apellidoEmpleado.value;
    empleadoSeleccionado.Direccion = direccionEmpleado.value;
    empleadoSeleccionado.Telefono = telefonoEmpleado.value;
    empleadoSeleccionado.Id_puesto = id_puestoEmpleado.value;

    const res = await fetch(urlEditarUsuario,
        {
            method: 'POST',
            body: JSON.stringify(empleadoSeleccionado)
        })
        .then(respuesta => respuesta.json())
        .then(data => data)
        .catch(error => alert(error));

        if(res.msg === 'OK') {
            alert('Se actualizó correctamente');

            limpiarHTML();
            obtenerEmpleados();
            formulario.reset();

            limpiarObjeto();
        }

        formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

        editando = false;
}

async function eliminarEmpleado(id) {
    if (confirm("¿Estás seguro de que deseas eliminar a éste usuario?")) {
    console.log('Se eliminará el usuario');
    console.log('ID: ', id);
    const res = await fetch(urlBorrarUsuario,
        {
            method: 'POST',
            body: JSON.stringify({'Id_emp': id})
        })
        .then(respuesta => respuesta.json())
        .then(data => data)
        .catch(error => alert(error));

        if(res.msg === 'OK') {
            alert('Se borró exitosamente');

            limpiarHTML();
            obtenerEmpleados();
            limpiarObjeto();
        }
    }
}

function cargarEmpleado(empleado){
    const {Id_emp, Nombre, Apellido, Direccion, Telefono, Id_puesto} = empleado;
    console.log("Empleado: ", empleado);

    nombreEmpleado.value = Nombre;
    apellidoEmpleado.value = Apellido;
    direccionEmpleado.value = Direccion;
    telefonoEmpleado.value = Telefono;
    id_puestoEmpleado.value = Id_puesto;

    empleadoSeleccionado.Id_emp = Id_emp;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild){
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

function limpiarObjeto() {
    empleadoSeleccionado.Id_emp = '';
    empleadoSeleccionado.Nombre = '';
    empleadoSeleccionado.Apellido = '';
    empleadoSeleccionado.Direccion = '';
    empleadoSeleccionado.Telefono = '';
    empleadoSeleccionado.Id_puesto = '';
}
