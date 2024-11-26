

document.addEventListener("DOMContentLoaded", () => {
    const verEventosButton = document.getElementById("verEventos");
    const eventosSection = document.getElementById("eventosDestacados");
    const eventosGrid = document.getElementById("eventosGrid");
    let eventosDestacados = [];

    // Función para cargar eventos desde JSON
    const cargarEventos = async () => {
        try {
            const response = await fetch("/data/eventos.json");
            if (!response.ok) throw new Error("Error al cargar eventos.");
            eventosDestacados = await response.json();
            renderEventos();
        } catch (error) {
            console.error(error);
        }
    };

    // Mostrar eventos destacados
    verEventosButton.addEventListener("click", () => {
        eventosSection.classList.remove("hidden");
        eventosSection.scrollIntoView({ behavior: "smooth" });
        if (eventosDestacados.length === 0) cargarEventos();
    });

    // Renderizar eventos destacados
    const renderEventos = () => {
        eventosGrid.innerHTML = ""; // Limpiar contenido
        eventosDestacados.forEach(evento => {
            const eventoCard = document.createElement("div");
            eventoCard.className = "bg-white p-6 rounded-lg shadow-md";
            eventoCard.innerHTML = `
                <img src="/assets/img/evento1.jfif" alt="Evento 1" class="w-full h-40 object-cover rounded-md mb-4">
                <h4 class="text-lg font-bold mb-2">${evento.nombre}</h4>
                <p class="text-sm text-gray-600 mb-4">${evento.fecha} | ${evento.lugar}</p>
                <p class="text-gray-700 mb-4">${evento.descripcion}</p>
                <button
                    class="verDetalle bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    data-id="${evento.id}">
                    Ver Más
                </button>
            `;
            eventosGrid.appendChild(eventoCard);
        });

        
        // Agregar eventos a botones Ver Más
        document.querySelectorAll(".verDetalle").forEach(button => {
            button.addEventListener("click", (e) => {
                const eventoId = e.target.dataset.id;
                mostrarModal(eventoId);
            });
        });
    };

    // Mostrar modal con detalles del evento
    const mostrarModal = (id) => {
        const evento = eventosDestacados.find(ev => ev.id == id);
        if (!evento) return;

        const modal = document.createElement("div");
        modal.className = "fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50";
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 p-6">
                <h2 class="text-2xl font-bold text-blue-900">${evento.nombre}</h2>
                <p class="text-gray-600 mt-2">Fecha: ${evento.fecha}</p>
                <p class="text-gray-600">Lugar: ${evento.lugar}</p>
                <p class="text-gray-700 mt-4">${evento.descripcion}</p>
                <div class="mt-6 flex justify-end space-x-4">
                    <button 
                        id="cerrarModal" 
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Cerrar modal
        document.getElementById("cerrarModal").addEventListener("click", () => {
            modal.remove();
        });
    };
});
