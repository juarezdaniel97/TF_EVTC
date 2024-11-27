document.addEventListener("DOMContentLoaded", () => {
    const tablaInscripciones = document.getElementById("tablaInscripciones");

    // Datos simulados de eventos inscritos
    const eventosInscritos = [
        { id: 1, nombre: "Conferencia Tecnología", fecha: "2024-11-25", lugar: "Auditorio", certificado: true },
        { id: 2, nombre: "Taller de Innovación", fecha: "2024-12-15", lugar: "Sala 3", certificado: false },
        { id: 3, nombre: "Seminario de Inteligencia Artificial", fecha: "2024-12-01", lugar: "Aula Magna", certificado: true },
        { id: 4, nombre: "Curso de Machine Learning", fecha: "2024-11-30", lugar: "Laboratorio 2", certificado: false },
        { id: 5, nombre: "Charla sobre Ciberseguridad", fecha: "2024-12-05", lugar: "Auditorio", certificado: true },
    ];

    // Renderizar eventos inscritos
    const renderEventos = () => {
        tablaInscripciones.innerHTML = "";

        if (eventosInscritos.length === 0) {
            tablaInscripciones.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center py-4 text-gray-600">No tienes inscripciones registradas.</td>
                </tr>`;
            return;
        }

        eventosInscritos.forEach(evento => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="px-4 py-2">${evento.nombre}</td>
                <td class="px-4 py-2">${evento.fecha}</td>
                <td class="px-4 py-2">${evento.lugar}</td>
                <td class="px-4 py-2 flex flex-col gap-2 justify-center md:flex-row md:gap-4 text-center">
                    ${evento.certificado ? 
                        `<button class="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition" data-id="${evento.id}">
                            Descargar Certificado
                        </button>` : 
                        `<span class="text-gray-500">Certificado no disponible</span>`}
                    <button class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition" data-id="${evento.id}">
                        Cancelar Inscripción
                    </button>
                </td>
            `;
            tablaInscripciones.appendChild(fila);

            // Descargar certificado
            const botonCertificado = fila.querySelector("button.bg-green-500");
            if (botonCertificado) {
                botonCertificado.addEventListener("click", () => {
                    descargarCertificado(evento);
                });
            }

            // Cancelar inscripción
            fila.querySelector("button.bg-red-500").addEventListener("click", () => {
                cancelarInscripcion(evento);
            });
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
                renderEventos(); // Actualizamos la tabla
            }
        }
    };

    // Renderizar los eventos al cargar la página
    renderEventos();
});
