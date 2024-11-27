// Eventos para el calendario
const events = [
    { date: "2024-11-03", title: "Charla sobre Inteligencia Artificial" },
    { date: "2024-11-12", title: "Hackatón de Innovación" },
    { date: "2024-11-30", title: "Taller de Desarrollo Web" },
    { date: "2024-12-05", title: "Conferencia de Ciberseguridad" },
    { date: "2024-12-10", title: "Curso de Machine Learning" },
];

const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const eventList = document.getElementById("eventList");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar() {
    calendarDays.innerHTML = "";
    eventList.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Actualizar encabezado del calendario
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Obtener el primer y último día del mes
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Generar días vacíos antes del inicio del mes
    for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += `<div class="py-4"></div>`;
    }

    // Generar días del mes
    for (let day = 1; day <= lastDate; day++) {
        const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const event = events.find(e => e.date === date);
        const currentDateObj = new Date();
        const eventDateObj = new Date(date);

        // Determinar si el evento es futuro o pasado
        let eventClass = "";
        if (event) {
            if (eventDateObj > currentDateObj) {
                eventClass = 'bg-green-500'; // Verde para eventos futuros
            } else {
                eventClass = 'bg-red-500'; // Rojo para eventos pasados
            }
        }

        calendarDays.innerHTML += `
        <div class="py-4 relative group">
          <span class="${event ? eventClass : 'text-gray-800'}">${day}</span>
          ${event ? `<div class="absolute ${eventClass} text-white text-xs rounded-md px-2 py-1 hidden group-hover:block">${event.title}</div>` : ""}
        </div>
      `;

        // Añadir eventos a la lista
        if (event) {
            eventList.innerHTML += `<li class="mb-2 ${eventClass === 'bg-green-500' ? 'text-green-500' : 'text-red-500'}">📅 <strong>${event.date}:</strong> ${event.title}</li>`;
        }
    }
}

// Cambiar mes
prevMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Renderizar calendario inicial
renderCalendar();
