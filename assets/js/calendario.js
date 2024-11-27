// Eventos para el calendario
const events = [
    { date: "2024-11-03", title: "Charla sobre Inteligencia Artificial" },
    { date: "2024-11-12", title: "Hackatón de Innovación" },
    { date: "2024-11-21", title: "Taller de Desarrollo Web" },
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

        calendarDays.innerHTML += `
        <div class="py-4 relative group">
          <span class="${event ? 'text-blue-500 font-bold' : 'text-gray-800'}">${day}</span>
          ${event ? `<div class="absolute bg-blue-500 text-white text-xs rounded-md px-2 py-1 hidden group-hover:block">${event.title}</div>` : ""}
        </div>
      `;

        // Añadir eventos a la lista
        if (event) {
            eventList.innerHTML += `<li class="mb-2">📅 <strong>${event.date}:</strong> ${event.title}</li>`;
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