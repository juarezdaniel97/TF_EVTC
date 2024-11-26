document.addEventListener("DOMContentLoaded", () => {
    const notificacionesToggle = document.getElementById("notificacionesToggle");
    const notificacionesPopUp = document.getElementById("notificacionesPopUp");
    const notificacionesBadge = document.getElementById("notificacionesBadge");
    const notificacionesLista = document.getElementById("notificacionesLista");
    const marcarTodasBtn = document.getElementById("marcarTodas");

    // Ejemplo actualizado de notificaciones dinámicas
    const notificaciones = [
        { id: 1, mensaje: "Evento confirmado: Taller de IA", visto: false, tipo: "info" },
        { id: 2, mensaje: "Nuevo evento: Hackathon 2024", visto: false, tipo: "exito" },
        { id: 3, mensaje: "Evento cancelado: Seminario UX", visto: true, tipo: "error" },
        { id: 4, mensaje: "¡El evento 'Conferencia de Innovación' está a 3 días de distancia!", visto: false, tipo: "advertencia" }
    ];

    const actualizarNotificaciones = () => {
        notificacionesLista.innerHTML = ""; // Limpiar la lista
        let noVistas = 0;

        notificaciones.forEach(notif => {
            if (!notif.visto) noVistas++;

            let bgColor, textColor, icono;
            switch (notif.tipo) {
                case "info":
                    bgColor = "bg-blue-100";
                    textColor = "text-blue-700";
                    icono = "ℹ️";
                    break;
                case "exito":
                    bgColor = "bg-green-100";
                    textColor = "text-green-700";
                    icono = "✔️";
                    break;
                case "error":
                    bgColor = "bg-red-100";
                    textColor = "text-red-700";
                    icono = "❌";
                    break;
                case "advertencia":
                    bgColor = "bg-yellow-100";
                    textColor = "text-yellow-700";
                    icono = "⚠️";
                    break;
                default:
                    bgColor = "bg-gray-100";
                    textColor = "text-gray-700";
                    icono = "🔔";
            }

            notificacionesLista.innerHTML += `
                <li class="flex justify-between items-center p-2 rounded-lg ${bgColor} ${textColor} notificacion-item">
                    <span>${icono} ${notif.mensaje}</span>
                    ${
                        notif.visto
                            ? '<span class="text-green-500 font-bold">Visto</span>'
                            : `<button class="text-sm underline text-blue-500 hover:text-blue-700" data-id="${notif.id}">
                                Marcar como visto
                            </button>`
                    }
                </li>`;
        });

        notificacionesBadge.textContent = noVistas;
        notificacionesBadge.classList.toggle("hidden", noVistas === 0);
    };

    actualizarNotificaciones();

    // Toggle del pop-up
    notificacionesToggle.addEventListener("click", () => {
        notificacionesPopUp.classList.toggle("hidden");
    });

    // Marcar todas como vistas
    marcarTodasBtn.addEventListener("click", () => {
        notificaciones.forEach(notif => (notif.visto = true));
        actualizarNotificaciones();
    });

    // Marcar una notificación como vista
    notificacionesLista.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const id = e.target.dataset.id;
            const notif = notificaciones.find(n => n.id === parseInt(id));
            if (notif) notif.visto = true;
            actualizarNotificaciones();
        }
    });

    // Ocultar pop-up al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!notificacionesPopUp.contains(e.target) && !notificacionesToggle.contains(e.target)) {
            notificacionesPopUp.classList.add("hidden");
        }
    });
});
