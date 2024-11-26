document.addEventListener("DOMContentLoaded", () => {
    const verEventosButton = document.getElementById("verEventos");
    const eventosSection = document.getElementById("eventosDestacados");
    const eventosGrid = document.getElementById("eventosGrid");
    let eventosDestacados = [];

    // Función para cargar eventos desde JSON
    const cargarEventos = async () => {
        try {
            const response = await fetch("/data/eventos_destacados.json");
            if (!response.ok) throw new Error("Error al cargar eventos.");
            eventosDestacados = await response.json();
            renderEventos();
        } catch (error) {
            console.error("Error cargando eventos:", error);
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
                <img src="${evento.imagen}" alt="${evento.nombre}" class="w-full h-40 object-cover rounded-md mb-4">
                <h4 class="text-lg font-bold mb-2">${evento.nombre}</h4>
                <p class="text-sm text-gray-600 mb-4">${evento.fecha} | ${evento.lugar}</p>
                <p class="text-gray-700 mb-4">${evento.descripcion}
                    <a href="/Eventos.html" class="text-blue-500 hover:underline">Más detalles</a>
                </p>
                <div class="flex justify-center">
                    <button
                        class="inscribirme bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        data-id="${evento.id}">
                        Inscribirme
                    </button>
                </div>
            `;
            eventosGrid.appendChild(eventoCard);
        });

        // Asignar evento al botón de inscripción
        document.querySelectorAll(".inscribirme").forEach(button => {
            button.addEventListener("click", (e) => {
                const eventoId = e.target.dataset.id;
                mostrarFormularioInscripcion(eventoId);
            });
        });
    };

    // Mostrar modal con formulario de inscripción
    const mostrarFormularioInscripcion = (id) => {
        const evento = eventos.find(ev => ev.id == id);
        if (!evento) return;

        const modal = document.createElement("div");
        modal.className = "fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50";
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 p-6">
                <h2 class="text-2xl font-bold text-blue-900 mb-4">Inscripción - ${evento.nombre}</h2>
                <form id="formularioInscripcion">
                    <div class="mb-4">
                        <label for="nombre" class="block text-gray-700 font-bold mb-2">Nombre completo</label>
                        <input type="text" id="nombre" name="nombre" class="w-full border border-gray-300 rounded-lg p-2" required>
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 font-bold mb-2">Correo electrónico</label>
                        <input type="email" id="email" name="email" class="w-full border border-gray-300 rounded-lg p-2" required>
                    </div>
                    <div class="mb-4">
                        <label for="telefono" class="block text-gray-700 font-bold mb-2">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" class="w-full border border-gray-300 rounded-lg p-2" required>
                    </div>
                    <div class="flex justify-end space-x-4">
                        <button 
                            type="button" 
                            id="cerrarModal" 
                            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Cerrar modal
        document.getElementById("cerrarModal").addEventListener("click", () => {
            modal.remove();
        });

        // Procesar formulario de inscripción
        document.getElementById("formularioInscripcion").addEventListener("submit", (e) => {
            e.preventDefault();
            alert(`¡Te has inscrito exitosamente en el evento: ${evento.nombre}!`);
            modal.remove();
        });
    };

    // Cargar eventos al iniciar
    cargarEventos();

    //Botón de Preguntas Frecuentes
    const preguntas_frecuentes = document.querySelectorAll('#faq button');
    preguntas_frecuentes.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.classList.toggle('hidden');
        });
    });
});
