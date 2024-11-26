

document.addEventListener("DOMContentLoaded", () => {
    const tablaInscripciones = document.getElementById("tablaInscripciones");

    // Simulamos datos obtenidos del JSON
    const eventosInscritos = [
        { id: 1, nombre: "Conferencia Tecnología", fecha: "2024-11-25", lugar: "Auditorio", certificado: true },
        { id: 2, nombre: "Taller de Innovación", fecha: "2024-12-15", lugar: "Sala 3", certificado: false },
    ];

    // Renderizar eventos inscritos
    const renderEventos = () => {
        tablaInscripciones.innerHTML = "";
        eventosInscritos.forEach(evento => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="px-4 py-2">${evento.nombre}</td>
                <td class="px-4 py-2">${evento.fecha}</td>
                <td class="px-4 py-2">${evento.lugar}</td>
                <td class="px-4 py-2 flex gap-4 justify-center">
                    ${evento.certificado ? 
                        `<button class="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600" data-id="${evento.id}">
                            Descargar Certificado
                        </button>` : 
                        `<span class="text-gray-500">Certificado no disponible</span>`}
                    <button class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600" data-id="${evento.id}">
                        Cancelar Inscripción
                    </button>
                </td>
            `;
            tablaInscripciones.appendChild(fila);

            // Descargar certificado
            fila.querySelector("button.bg-green-500")?.addEventListener("click", () => {
                alert(`Descargando certificado para ${evento.nombre}`);
                // Lógica de descarga...
            });

            // Cancelar inscripción
            fila.querySelector("button.bg-red-500").addEventListener("click", () => {
                if (confirm(`¿Estás seguro de cancelar tu inscripción a "${evento.nombre}"?`)) {
                    alert(`Inscripción cancelada para ${evento.nombre}`);
                    // Actualizar lógica...
                }
            });
        });
    };

    renderEventos();
});
