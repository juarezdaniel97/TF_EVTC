document.addEventListener("DOMContentLoaded", () => {
    const tablaInscripciones = document.getElementById("tablaInscripciones");
    const selectEstado = document.getElementById("selectEstado");
    const modalConsulta = document.getElementById("modalConsulta");
    const cerrarModal = document.getElementById("cerrarModal");
    const enviarConsulta = document.getElementById("enviarConsulta");

    // Datos simulados de inscripciones
    const eventosInscritos = [
        { id: 1, nombre: "Conferencia Tecnología", fecha: "2024-11-25", lugar: "Auditorio", estado: "aprobada", certificado: true },
        { id: 2, nombre: "Taller de Innovación", fecha: "2024-12-15", lugar: "Sala 3", estado: "pendiente", certificado: false },
        { id: 3, nombre: "Seminario de Inteligencia Artificial", fecha: "2024-12-01", lugar: "Aula Magna", estado: "rechazada", certificado: true },
        { id: 4, nombre: "Curso de Machine Learning", fecha: "2024-11-30", lugar: "Laboratorio 2", estado: "aprobada", certificado: false },
        { id: 5, nombre: "Charla sobre Ciberseguridad", fecha: "2024-12-05", lugar: "Auditorio", estado: "rechazada", certificado: false },
    ];

    // Función para filtrar eventos según el estado
    const filtrarEventos = () => {
        const estadoSeleccionado = selectEstado.value;
        let eventosFiltrados = eventosInscritos;

        if (estadoSeleccionado !== "todos") {
            eventosFiltrados = eventosInscritos.filter(evento => evento.estado === estadoSeleccionado);
        }

        renderEventos(eventosFiltrados);
    };

    // Renderizar eventos en la tabla
    const renderEventos = (eventos) => {
        tablaInscripciones.innerHTML = "";

        if (eventos.length === 0) {
            tablaInscripciones.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center py-4 text-gray-600">No tienes inscripciones registradas para este filtro.</td>
                </tr>`;
            return;
        }

        eventos.forEach(evento => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="px-4 py-2">${evento.nombre}</td>
                <td class="px-4 py-2">${evento.fecha}</td>
                <td class="px-4 py-2">${evento.lugar}</td>
                <td class="px-4 py-2 flex flex-col gap-2 justify-center md:flex-row md:gap-4 text-center">
                    ${evento.estado === "aprobada" ? 
                        `<button class="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition" data-id="${evento.id}">
                            ${evento.certificado ? 'Descargar Certificado' : 'Certificado no disponible'}
                        </button>` : 
                        evento.estado === "rechazada" ? 
                        `<button class="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition" data-id="${evento.id}">
                            Consultar
                        </button>` : 
                        ""}
                    ${evento.estado === "aprobada" ? 
                        `<button class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition" data-id="${evento.id}">
                            Cancelar Inscripción
                        </button>` : 
                        ""}
                </td>
            `;
            tablaInscripciones.appendChild(fila);

            // Lógica para Descargar Certificado
            const botonCertificado = fila.querySelector("button.bg-green-500");
            if (botonCertificado) {
                botonCertificado.addEventListener("click", () => {
                    descargarCertificado(evento);
                });
            }

            // Lógica para Consultar Inscripción (estado rechazada)
            const botonConsultar = fila.querySelector("button.bg-blue-500");
            if (botonConsultar) {
                botonConsultar.addEventListener("click", () => {
                    abrirModalConsulta(evento);
                });
            }

            // Lógica para Cancelar Inscripción
            const botonCancelar = fila.querySelector("button.bg-red-500");
            if (botonCancelar) {
                botonCancelar.addEventListener("click", () => {
                    cancelarInscripcion(evento);
                });
            }
        });
    };

    // Función para descargar certificado
    const descargarCertificado = (evento) => {
        alert(`Descargando certificado para "${evento.nombre}"...`);
        // Aquí iría la lógica para descargar el archivo.
    };

    // Función para cancelar inscripción
    const cancelarInscripcion = (evento) => {
        if (confirm(`¿Estás seguro de cancelar tu inscripción a "${evento.nombre}"?`)) {
            // Eliminamos el evento del array
            const index = eventosInscritos.findIndex(e => e.id === evento.id);
            if (index !== -1) {
                eventosInscritos.splice(index, 1);
                alert(`Inscripción cancelada para "${evento.nombre}".`);
                renderEventos(eventosInscritos); // Actualizamos la tabla
            }
        }
    };

    // Función para abrir el modal de consulta
    const abrirModalConsulta = (evento) => {
        modalConsulta.classList.remove("hidden");
    };

    // Cerrar el modal
    cerrarModal.addEventListener("click", () => {
        modalConsulta.classList.add("hidden");
    });

    // Enviar consulta
    enviarConsulta.addEventListener("click", () => {
        alert(`Consulta enviada para el evento: "${document.getElementById("consultaMensaje").value}"`);
        modalConsulta.classList.add("hidden");
    });

    // Filtrar eventos al cambiar el estado seleccionado
    selectEstado.addEventListener("change", filtrarEventos);

    // Renderizar los eventos al cargar la página
    renderEventos(eventosInscritos);
});
