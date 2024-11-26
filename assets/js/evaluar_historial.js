document.addEventListener("DOMContentLoaded", () => {
    const tablaEvaluar = document.getElementById("tablaEvaluar");
    const tablaHistorial = document.getElementById("tablaHistorial");
    const modalEvaluar = document.getElementById("modalEvaluar");
    const cerrarModal = document.getElementById("cerrarModal");
    const formEvaluar = document.getElementById("formEvaluar");
    const buscarEvaluar = document.getElementById("buscarEvaluar");
    const buscarHistorial = document.getElementById("buscarHistorial");
    const modalDetalles = document.getElementById("modalDetalles");
    const cerrarModalDetalles = document.getElementById("cerrarModalDetalles");

    // Datos de ejemplo de eventos
    let eventosEvaluar = [
        { id: 1, nombre: "Conferencia A", fecha: "2024-11-25", estado: "pendiente", tipo: "Técnico", lugar: "Auditorio A", modalidad: "Presencial", expositores: "Juan Pérez, Ana García", descripcion: "Una conferencia técnica sobre el futuro de la programación." },
        { id: 2, nombre: "Taller B", fecha: "2024-11-20", estado: "pendiente", tipo: "Innovación", lugar: "Sala B", modalidad: "Virtual", expositores: "Carlos Gómez, María López", descripcion: "Un taller de innovación en el mundo digital." },
        { id: 3, nombre: "Seminario C", fecha: "2024-11-18", estado: "pendiente", tipo: "Desarrollo", lugar: "Sala C", modalidad: "Presencial", expositores: "Laura Martínez, Pedro Sánchez", descripcion: "Seminario sobre desarrollo de software ágil." },
    ];

    let eventosHistorial = [
        { id: 4, nombre: "Charla D", fecha: "2024-10-05", estado: "calificado", tipo: "Liderazgo", lugar: "Auditorio D", modalidad: "Presencial", expositores: "Raúl Díaz, Elena Ramos", descripcion: "Charla sobre liderazgo y gestión de equipos." },
        { id: 5, nombre: "Conferencia E", fecha: "2024-09-10", estado: "calificado", tipo: "Tecnología", lugar: "Auditorio E", modalidad: "Virtual", expositores: "Luis Hernández, Carla Díaz", descripcion: "Conferencia sobre las últimas tendencias en tecnología." },
        { id: 6, nombre: "Seminario F", fecha: "2024-08-20", estado: "calificado", tipo: "Ciencia", lugar: "Laboratorio F", modalidad: "Presencial", expositores: "Sergio Torres, María Fernández", descripcion: "Seminario sobre investigaciones científicas recientes." },
    ];

    // Función para renderizar tabla de Evaluar
    const renderEvaluar = (filtro = "") => {
        const eventosFiltrados = eventosEvaluar.filter((evento) =>
            evento.nombre.toLowerCase().includes(filtro.toLowerCase())
        );

        tablaEvaluar.innerHTML = eventosFiltrados
            .map(
                (evento) => `
            <tr>
                <td class="border border-gray-300 px-4 py-2">${evento.nombre}</td>
                <td class="border border-gray-300 px-4 py-2">${evento.fecha}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
                        evento.estado === "calificado" ? "opacity-50 cursor-not-allowed" : ""
                    }" data-id="${evento.id}" ${
                    evento.estado === "calificado" ? "disabled" : ""
                }>
                        Evaluar
                    </button>
                </td>
            </tr>`
            )
            .join("");

        // Botones de evaluación
        document.querySelectorAll("button[data-id]").forEach((btn) => {
            btn.addEventListener("click", () => openModal(btn.dataset.id));
        });
    };

    // Función para renderizar tabla de Historial
    const renderHistorial = (filtro = "") => {
        const eventosFiltrados = eventosHistorial.filter((evento) =>
            evento.nombre.toLowerCase().includes(filtro.toLowerCase())
        );

        tablaHistorial.innerHTML = eventosFiltrados
            .map(
                (evento) => `
            <tr data-id="${evento.id}" class="cursor-pointer">
                <td class="border border-gray-300 px-4 py-2">${evento.nombre}</td>
                <td class="border border-gray-300 px-4 py-2">${evento.fecha}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">${evento.estado}</td>
            </tr>`
            )
            .join("");

        // Mostrar detalles del evento al hacer click en una fila
        document.querySelectorAll("tr[data-id]").forEach((row) => {
            row.addEventListener("click", () => {
                const eventoId = row.getAttribute("data-id");
                openModalDetalles(eventoId);
            });
        });
    };

    // Abrir modal de evaluación
    const openModal = (id) => {
        modalEvaluar.dataset.id = id;
        modalEvaluar.classList.remove("hidden");
    };

    // Abrir modal de detalles del evento
    const openModalDetalles = (id) => {
        const evento = eventosHistorial.find((evento) => evento.id == id);

        if (evento) {
            document.getElementById("modalTituloEvento").textContent = evento.nombre;
            document.getElementById("modalTipo").textContent = `Tipo: ${evento.tipo}`;
            document.getElementById("modalLugar").textContent = `Lugar: ${evento.lugar}`;
            document.getElementById("modalModalidad").textContent = `Modalidad: ${evento.modalidad}`;
            document.getElementById("modalExpositores").textContent = `Expositores: ${evento.expositores}`;
            document.getElementById("modalDescripcion").textContent = `Descripción: ${evento.descripcion}`; // Mostrar descripción

            modalDetalles.classList.remove("hidden");
        }
    };

    // Cerrar modales
    cerrarModal.addEventListener("click", () => {
        modalEvaluar.classList.add("hidden");
    });

    cerrarModalDetalles.addEventListener("click", () => {
        modalDetalles.classList.add("hidden");
    });

    // Enviar formulario de evaluación
    formEvaluar.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = modalEvaluar.dataset.id;
        const index = eventosEvaluar.findIndex((evento) => evento.id == id);

        if (index > -1) {
            eventosEvaluar[index].estado = "calificado";
            eventosHistorial.push(eventosEvaluar[index]);
            eventosEvaluar.splice(index, 1);
        }

        modalEvaluar.classList.add("hidden");
        renderEvaluar(buscarEvaluar.value);
        renderHistorial(buscarHistorial.value);
    });

    // Buscar eventos
    buscarEvaluar.addEventListener("input", (e) => {
        renderEvaluar(e.target.value);
    });

    buscarHistorial.addEventListener("input", (e) => {
        renderHistorial(e.target.value);
    });

    renderEvaluar();
    renderHistorial();
});
