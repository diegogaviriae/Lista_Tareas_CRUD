let listaTareas = [];

const objTarea = {
    id: '',
    nombre_tarea: '',
    descripcion_tarea: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombre_tareaInput = document.querySelector('#nombre_tarea');
const descripcion_tareaInput = document.querySelector('#descripcion_tarea');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombre_tareaInput.value === '' || descripcion_tareaInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarTarea();
        editando = false;
    } else {
        objTarea.id = Date.now()
        objTarea.nombre_tarea = nombre_tareaInput.value;
        objTarea.descripcion_tarea = descripcion_tareaInput.value;

        agregarTarea();
    }
}

function agregarTarea() {

    listaTareas.push({...objTarea});

    mostrarTareas();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objTarea.id = '';
    objTarea.nombre_tarea = '';
    objEmpleado.descripcion_tarea = '';
}

function mostrarTareas() {
    limpiarHTML();

    const divTareas = document.querySelector('.div_tareas');
    
    listaTareas.forEach(tarea => {
        const {id, nombre_tarea, descripcion_tarea} = tarea;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre_tarea} - ${descripcion_tarea} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarTarea(tarea);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarTarea(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divTareas.appendChild(parrafo);
        divTareas.appendChild(hr);
    });
}

function cargarTarea(tarea) {
    const {id, nombre_tarea, descripcion_tarea} = tarea;

    nombre_tareaInput.value = nombre_tarea;
    descripcion_tareaInput.value = descripcion_tarea;

    objTarea.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarTarea() {

    objTarea.nombre_tarea = nombre_tareaInput.value;
    objTarea.descripcion_tarea = descripcion_tareaInput.value;

    listaTareas.map(tarea => {

        if(tarea.id === objTarea.id) {
            tarea.id = objTarea.id;
            tarea.nombre_tarea = objTarea.nombre_tarea;
            tarea.descripcion_tarea = objTarea.descripcion_tarea;

        }

    });

    limpiarHTML();
    mostrarTareas();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarTarea(id) {

    listaTareas = listaTareas.filter(tarea => tarea.id !== id);

    limpiarHTML();
    mostrarTareas();
}

function limpiarHTML() {
    const divTareas = document.querySelector('.div_tareas');
    while(divTareas.firstChild) {
        divTareas.removeChild(divTareas.firstChild);
    }
}