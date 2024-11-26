const tablaEventos = document.getElementById('tablaEventos').querySelector('tbody');
const modal = document.getElementById('modalEvento');
const buscarEvento = document.getElementById('buscarEvento');
const cerrarModal = document.getElementById('cerrarModal');
const botonesFiltro = document.querySelectorAll('.filtro');

let eventos = []; // Se llenará dinámicamente desde el JSON

// Cargar eventos desde JSON
async function cargarEventos() {
    try {
        const response = await fetch('/data/eventos.json'); // Cambia la ruta según tu configuración
        if (!response.ok) throw new Error('Error al cargar eventos.');
        eventos = await response.json();
        renderEventos(); // Renderizar una vez cargados
    } catch (error) {
        console.error('No se pudieron cargar los eventos:', error);
    }
}

// Renderizar eventos
// Renderizar eventos
function renderEventos(filtro = 'todos', textoBusqueda = '') {
    tablaEventos.innerHTML = '';
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const anioActual = hoy.getFullYear();

    // Rango para "próximos"
    const inicioProximos = new Date(anioActual, mesActual, 1); // Primer día del mes actual
    const finProximos = new Date(anioActual, mesActual + 2, 0); // Último día del próximo mes

    // Rango para "futuros"
    const inicioFuturos = new Date(anioActual, mesActual + 3, 1); // Primer día de dentro de 3 meses

    let eventosFiltrados = eventos.filter(evento => evento.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()));

    if (filtro === 'proximos') {
        // Eventos entre el mes actual y el siguiente
        eventosFiltrados = eventosFiltrados.filter(evento => {
            const fechaEvento = new Date(evento.fecha);
            return fechaEvento >= inicioProximos && fechaEvento <= finProximos;
        });
    } else if (filtro === 'pasados') {
        // Eventos antes de hoy
        eventosFiltrados = eventosFiltrados.filter(evento => new Date(evento.fecha) < hoy);
    } else if (filtro === 'futuros') {
        // Eventos a partir de dentro de 3 meses
        eventosFiltrados = eventosFiltrados.filter(evento => {
            const fechaEvento = new Date(evento.fecha);
            return fechaEvento >= inicioFuturos;
        });
    }

    eventosFiltrados.forEach(evento => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="px-4 py-2 cursor-pointer" data-id="${evento.id}">${evento.nombre}</td>
            <td class="px-4 py-2">${evento.fecha}</td>
            <td class="px-4 py-2">${evento.lugar}</td>
            <td class="px-4 py-2 text-center">
                <button class="editar text-green-500" data-id="${evento.id}">
                    ✏️
                </button>
                <button class="eliminar text-red-500" data-id="${evento.id}">
                    🗑️
                </button>
            </td>
        `;
        tablaEventos.appendChild(fila);

        // Mostrar modal
        fila.querySelector('[data-id]').addEventListener('click', () => mostrarModal(evento));
    });
}


// Mostrar modal
function mostrarModal(evento) {
    document.getElementById('modalTitulo').textContent = evento.nombre;
    document.getElementById('modalFecha').textContent = `Fecha: ${evento.fecha}`;
    document.getElementById('modalLugar').textContent = `Lugar: ${evento.lugar}`;
    document.getElementById('modalDescripcion').textContent = evento.descripcion;

    modal.style.display = 'flex';
}

// Cerrar modal
cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Filtrar por categoría
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        const filtro = boton.getAttribute('data-filtro');
        renderEventos(filtro, buscarEvento.value);
    });
});

// Búsqueda dinámica
buscarEvento.addEventListener('input', () => {
    renderEventos(document.querySelector('.filtro.bg-blue-500')?.getAttribute('data-filtro') || 'todos', buscarEvento.value);
});

// Cargar eventos al iniciar
cargarEventos();
