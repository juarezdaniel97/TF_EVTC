document.addEventListener("DOMContentLoaded", () => {
    const formRegistrarUsuario = document.getElementById("formRegistrarUsuario");
    const tablaUsuarios = document.getElementById("tablaUsuarios");
    const buscarUsuario = document.getElementById("buscarUsuario");

    let usuarios = []; // Lista de usuarios

    // Cargar usuarios desde JSON
    async function cargarUsuarios() {
        try {
            const respuesta = await fetch("../data/usuarios.json");
            usuarios = await respuesta.json();
            renderUsuarios();
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    }

    // Renderizar usuarios en la tabla
    function renderUsuarios(filtro = "") {
        tablaUsuarios.innerHTML = ""; // Limpiar tabla
        usuarios
            .filter(usuario => usuario.nombre.toLowerCase().includes(filtro.toLowerCase()))
            .forEach(usuario => {
                tablaUsuarios.insertAdjacentHTML("beforeend", crearFilaHTML(usuario));
            });
    }

    // Crear HTML para cada fila de usuario
    function crearFilaHTML(usuario) {
        return `
            <tr>
                <td class="border border-gray-300 px-4 py-2">${usuario.nombre}</td>
                <td class="border border-gray-300 px-4 py-2">${usuario.correo}</td>
                <td class="border border-gray-300 px-4 py-2">${usuario.rol}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                    <button class="editar text-green-500" data-id="${usuario.id}">✏️</button>
                    <button class="eliminar text-red-500" data-id="${usuario.id}">🗑️</button>
                </td>
            </tr>`;
    }

    // Delegación de eventos para editar/eliminar
    tablaUsuarios.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        if (e.target.classList.contains("editar")) {
            editarUsuario(id);
        } else if (e.target.classList.contains("eliminar")) {
            eliminarUsuario(id);
        }
    });

    // Editar usuario
    function editarUsuario(id) {
        const usuario = usuarios.find(u => u.id === Number(id));
        if (usuario) {
            alert(`Editar usuario: ${usuario.nombre}`);
            // Aquí puedes abrir un formulario modal para editar
        }
    }

    // Eliminar usuario
    function eliminarUsuario(id) {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            usuarios = usuarios.filter(u => u.id !== Number(id));
            renderUsuarios(buscarUsuario.value); // Actualizar la tabla
        }
    }

    // Registrar nuevo usuario
    if (formRegistrarUsuario) {
        formRegistrarUsuario.addEventListener("submit", (e) => {
            e.preventDefault();

            const nuevoUsuario = {
                id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre: formRegistrarUsuario.nombre.value.trim(),
                correo: formRegistrarUsuario.email.value.trim(),
                rol: formRegistrarUsuario.rol.value.trim(),
            };

            // Validación básica
            if (!nuevoUsuario.nombre || !nuevoUsuario.correo || !nuevoUsuario.rol) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            usuarios.push(nuevoUsuario);
            alert("Usuario registrado exitosamente.");
            formRegistrarUsuario.reset();
            renderUsuarios();
        });
    }

    // Filtro de búsqueda
    if (buscarUsuario) {
        buscarUsuario.addEventListener("input", () => {
            renderUsuarios(buscarUsuario.value);
        });
    }

    // Cargar usuarios al iniciar
    cargarUsuarios();
});
