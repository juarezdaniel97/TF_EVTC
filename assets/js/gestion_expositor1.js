document.addEventListener("DOMContentLoaded", () => {
    const tablaEventos = document.getElementById("tablaEventos");
    const tablaMaterial = document.getElementById("tablaMaterial");
    const modalEditar = document.getElementById("modalEditar");
    const cerrarModalEditar = document.getElementById("cerrarModalEditar");
    const formularioEditar = document.getElementById("formularioEditar");

    let eventosCargados = [];
    let materialCargado = [];

    // Función para cargar eventos
    const cargarMisEventos = async () => {
        try {
            const response = await fetch("/data/misEventos.json");
            if (!response.ok) throw new Error("No se pudieron cargar los eventos.");
            eventosCargados = await response.json();
            renderMisEventos(eventosCargados);
        } catch (error) {
            console.error("Error cargando eventos:", error);
        }
    };

    // Renderizar eventos en la tabla
    const renderMisEventos = (eventos) => {
        tablaEventos.innerHTML = "";
        if (eventos.length === 0) {
            tablaEventos.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center py-4 text-gray-600">No tienes eventos asignados.</td>
                </tr>`;
            return;
        }

        eventos.forEach(evento => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="px-4 py-2">${evento.nombre}</td>
                <td class="px-4 py-2">${evento.fecha}</td>
                <td class="px-4 py-2">${evento.lugar}</td>
                <td class="px-4 py-2 text-center">
                    <button class="editar bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition" data-id="${evento.id}">Editar</button>
                </td>
            `;
            tablaEventos.appendChild(fila);

            // Agregar funcionalidad al botón "Editar"
            fila.querySelector(".editar").addEventListener("click", () => abrirModalEditar(evento));
        });
    };

    // Función para abrir el modal de edición
    const abrirModalEditar = (evento) => {
        modalEditar.style.display = "flex";
        formularioEditar.dataset.eventoId = evento.id; // Guardar ID del evento en el formulario
        formularioEditar.nombre.value = evento.nombre;
        formularioEditar.fecha.value = evento.fecha;
        formularioEditar.lugar.value = evento.lugar;
    };

    // Función para cerrar el modal
    cerrarModalEditar.addEventListener("click", () => {
        modalEditar.style.display = "none";
    });

    // Enviar datos del formulario
    formularioEditar.addEventListener("submit", (e) => {
        e.preventDefault();
        const idEvento = formularioEditar.dataset.eventoId;
        const eventoEditado = {
            id: idEvento,
            nombre: formularioEditar.nombre.value,
            fecha: formularioEditar.fecha.value,
            lugar: formularioEditar.lugar.value,
            pdf: formularioEditar.pdf.files[0]?.name || "No adjuntado"
        };

        console.log("Evento editado:", eventoEditado);
        alert("¡Evento actualizado con éxito!");

        modalEditar.style.display = "none";
        cargarMisEventos(); // Recargar la lista de eventos
    });

    // Función para cargar material de apoyo
    const cargarMaterialApoyo = async () => {
        try {
            const response = await fetch("/data/materialApoyo.json");
            if (!response.ok) throw new Error("No se pudo cargar el material de apoyo.");
            materialCargado = await response.json();
            renderMaterialApoyo(materialCargado);
        } catch (error) {
            console.error("Error cargando material de apoyo:", error);
        }
    };

    // Renderizar material de apoyo en la tabla
    const renderMaterialApoyo = (material) => {
        tablaMaterial.innerHTML = "";
        if (material.length === 0) {
            tablaMaterial.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center py-4 text-gray-600">No hay material de apoyo disponible.</td>
                </tr>`;
            return;
        }

        material.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="px-4 py-2"><img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 object-cover rounded-lg"></td>
                <td class="px-4 py-2">${item.nombre}</td>
                <td class="px-4 py-2 text-center">
                    <a href="${item.pdf}" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition" target="_blank">Ver PDF</a>
                </td>
            `;
            tablaMaterial.appendChild(fila);
        });
    };

    // Cargar eventos y material al inicio
    cargarMisEventos();
    cargarMaterialApoyo();
});
