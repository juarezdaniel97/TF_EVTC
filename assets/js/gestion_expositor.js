document.addEventListener("DOMContentLoaded", () => {
    const tablaEventos = document.getElementById("tablaEventos");
    const materialApoyoSection = document.getElementById("materialApoyo");

    // Función para cargar y renderizar eventos del expositor
    const cargarMisEventos = async () => {
        try {
            const response = await fetch("/data/misEventos.json");
            if (!response.ok) throw new Error("No se pudieron cargar los eventos.");
            const eventos = await response.json();
            renderMisEventos(eventos);
        } catch (error) {
            console.error("Error cargando eventos:", error);
        }
    };

    const renderMisEventos = (eventos) => {
        tablaEventos.innerHTML = "";
        if (eventos.length === 0) {
            tablaEventos.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center py-4 text-gray-600">No tienes eventos asignados.</td>
                </tr>`;
            return;
        }

        eventos.forEach(evento => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td class="px-4 py-2">${evento.nombre}</td>
                <td class="px-4 py-2">${evento.fecha}</td>
                <td class="px-4 py-2">${evento.lugar}</td>
                <td class="px-4 py-2 text-center">
                    <button class="editar bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition" data-id="${evento.id}">Editar</button>
                </td>
            `;
            tablaEventos.appendChild(fila);

            fila.querySelector(".editar").addEventListener("click", () => {
                alert(`Editar evento: ${evento.nombre}`);
            });
        });
    };

    // Función para cargar y renderizar material de apoyo
    const cargarMaterialApoyo = async () => {
        try {
            const response = await fetch("/data/materialApoyo.json");
            if (!response.ok) throw new Error("No se pudo cargar el material de apoyo.");
            const materiales = await response.json();
            renderMaterialApoyo(materiales);
        } catch (error) {
            console.error("Error cargando material de apoyo:", error);
        }
    };

    const renderMaterialApoyo = (materiales) => {
        materialApoyoSection.innerHTML = "";
        if (materiales.length === 0) {
            materialApoyoSection.innerHTML = `
                <p class="text-center text-gray-600 py-4">No hay material de apoyo disponible.</p>`;
            return;
        }

        materiales.forEach(material => {
            const card = document.createElement("div");
            card.className = "bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300";

            card.innerHTML = `
                <div class="relative">
                    <img src="${material.imagen}" alt="Imagen de ${material.titulo}" class="w-full h-48 object-cover">
                    <div class="absolute bottom-0 bg-gradient-to-t from-black to-transparent text-white px-4 py-2 w-full">
                        <h3 class="font-bold text-lg">${material.titulo}</h3>
                    </div>
                </div>
                <div class="p-4">
                    <p class="text-gray-700 mb-4">${material.descripcion}</p>
                    <a href="${material.enlace}" target="_blank" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">Descargar</a>
                </div>
            `;
            materialApoyoSection.appendChild(card);
        });
    };

    // Lógica para determinar qué sección cargar
    if (tablaEventos) {
        cargarMisEventos();
    } else if (materialApoyoSection) {
        cargarMaterialApoyo();
    }
});
