document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const toggleButton = document.getElementById("menu-toggle"); // Botón de hamburguesa
    const rol = localStorage.getItem("rolUsuario");

    // Función para generar el menú dependiendo del rol
    const generarMenu = () => {
        menu.innerHTML = ""; // Limpiar el menú existente
        menu.classList.add("hidden", "lg:flex", "lg:flex-row"); // Asegurar que el menú esté oculto en pantallas pequeñas y visible en pantallas grandes

        if (!rol) {
            // Menú para usuarios no autenticados
            menu.innerHTML = `
                <a href="#event_container" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Eventos</a>
                <a href="#testimonios" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Testimonios</a>
                <a href="#contacto" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Contactar</a>
                <a href="login.html" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Iniciar Sesión</a>
            `;
        } else if (rol === "administrador") {
            // Menú para administrador
            menu.innerHTML = `
            <a href="/../" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Inicio</a>
            <!-- Menú desplegable Gestión de Eventos -->
            <div class="relative" id="gestionEventos">
            <button class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Gestión de Eventos</button>
            <div class="hidden lg:absolute left-0 bg-white text-black shadow-lg mt-2 w-full lg:w-48 flex-col space-y-2 z-10" id="submenuEventos">
            <a href="/admin/ListaEventos.html" class="block px-4 py-2 text-lg hover:bg-orange-400">Listar</a>
            <a href="/admin/RegistrarEvento.html" class="block px-4 py-2 text-lg hover:bg-orange-400">Registrar</a>
            </div>
            </div>
            <!-- Menú desplegable Gestión de Usuarios -->
            <div class="relative" id="gestionUsuarios">
            <button class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Gestión de Usuarios</button>
            <div class="hidden lg:absolute left-0 bg-white text-black shadow-lg mt-2 w-full lg:w-48 flex-col space-y-2 z-10" id="submenuUsuarios">
                    <a href="/admin/ListaUsuario.html" class="block px-4 py-2 text-lg hover:bg-orange-400">Listar</a>
                    <a href="/admin/RegistrarUsuario.html" class="block px-4 py-2 text-lg hover:bg-orange-400">Registrar</a>
                    </div>
                    </div>
            <a href="/../index.html" id="cerrarSesion" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Cerrar Sesión</a>
        `;
        } else if (rol === "expositor") {
            // Menú para expositor
            menu.innerHTML = `
                <a href="/expositor/miseventos.html" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Mis Eventos</a>
                <a href="/expositor/material.html" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Material de Apoyo</a>
                <a href="/../login.html" id="cerrarSesion" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Cerrar Sesión</a>
            `;
        } else if (rol === "participante") {
            // Menú para participante
            menu.innerHTML = `
            <a href="/participante/MisInscripciones.html" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Mis Inscripciones</a>
            <a href="/participante/MaterialDeApoyo.html" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Material</a>
            <a href="/participante/Historial.html" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Historial</a>
            <div class="relative" id="notificaciones">
                <button id="notificacionesToggle" class="relative flex items-center justify-center text-white hover:text-orange-400 text-lg transition duration-300 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 7 8.388 7 11v3.159c0 .538-.214 1.055-.595 1.436L5 17h5m4 0a3.001 3.001 0 01-6 0" />
                        </svg>
                        <span id="notificacionesBadge" class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 hidden">0</span>
                    </button>
                    <div id="notificacionesPopUp" class="hidden absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg p-4 w-72 z-20">
                    <h3 class="font-bold text-lg mb-2">Notificaciones</h3>
                    <ul id="notificacionesLista" class="space-y-2">
                    </ul>
                    <button id="marcarTodas" class="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Marcar todas como vistas
                    </button>
                    </div>
                </div>
            <a href="/../login.html" id="cerrarSesion" class="block text-white hover:text-orange-400 text-lg font-medium transition duration-300 ease-in-out">Cerrar Sesión</a>
        `;
        }
    };

    // Función para cerrar sesión
    const cerrarSesion = () => {
        localStorage.removeItem("rolUsuario");
        window.location.reload();
    };

    // Función para mostrar/ocultar submenús
    const configurarSubmenuToggle = (menuItemId, submenuId) => {
        const menuItem = document.getElementById(menuItemId);
        const submenu = document.getElementById(submenuId);

        menuItem.addEventListener("click", () => {
            submenu.classList.toggle("hidden");
            submenu.classList.toggle("flex");
        });

        document.addEventListener("click", (event) => {
            if (!menuItem.contains(event.target) && !submenu.contains(event.target)) {
                submenu.classList.add("hidden");
                submenu.classList.remove("flex");
            }
        });
    };

    // Generar el menú basado en el rol
    generarMenu();

    // Configuración de submenús solo si hay submenú
    if (rol === "administrador") {
        configurarSubmenuToggle("gestionEventos", "submenuEventos");
        configurarSubmenuToggle("gestionUsuarios", "submenuUsuarios");
    }

    // Agregar evento al botón de hamburguesa
    toggleButton.addEventListener("click", () => {
        // Alternar visibilidad del menú en pantallas pequeñas
        menu.classList.toggle("hidden");
        menu.classList.toggle("lg:flex"); // Asegurarse de que en pantallas grandes esté visible
    });

    // Agregar evento de cerrar sesión
    const cerrarSesionBtn = document.getElementById("cerrarSesion");
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", cerrarSesion);
    }
});
