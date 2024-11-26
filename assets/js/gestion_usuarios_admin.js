document.addEventListener("DOMContentLoaded", () => {
    const formRegistrarUsuario = document.getElementById("formRegistrarUsuario");
    const tablaUsuarios = document.getElementById("tablaUsuarios");
    const buscarUsuario = document.getElementById("buscarUsuario");

    // Lista de usuarios (simulada desde un archivo JSON)
    let usuarios = [];

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
        tablaUsuarios.innerHTML = "";
        usuarios
            .filter(usuario => usuario.nombre.toLowerCase().includes(filtro.toLowerCase()))
            .forEach(usuario => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td class="border border-gray-300 px-4 py-2">${usuario.nombre}</td>
                    <td class="border border-gray-300 px-4 py-2">${usuario.correo}</td>
                    <td class="border border-gray-300 px-4 py-2">${usuario.rol}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                        <button class="editar text-green-500" data-id="${usuario.id}">✏️</button>
                        <button class="eliminar text-red-500" data-id="${usuario.id}">🗑️</button>
                    </td>
                `;
                tablaUsuarios.appendChild(fila);

                // Eventos para editar y eliminar
                fila.querySelector(".editar").addEventListener("click", () => {
                    alert(`Editar usuario: ${usuario.nombre}`);
                });
                fila.querySelector(".eliminar").addEventListener("click", () => {
                    usuarios = usuarios.filter(u => u.id !== usuario.id);
                    renderUsuarios(buscarUsuario.value);
                });
            });
    }

    // Registrar nuevo usuario
    if (formRegistrarUsuario) {
        formRegistrarUsuario.addEventListener("submit", (e) => {
            e.preventDefault();

            const nuevoUsuario = {
                id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre: formRegistrarUsuario.nombre.value,
                email: formRegistrarUsuario.email.value,
                rol: formRegistrarUsuario.rol.value,
            };

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
