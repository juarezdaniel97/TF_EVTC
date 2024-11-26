    // Capturamos los elementos
    const btnAbrirModal = document.getElementById('btnAbrirModal');
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const modalFormulario = document.getElementById('modalFormulario');

    // Abrir el modal
    btnAbrirModal.addEventListener('click', () => {
        modalFormulario.classList.remove('hidden');
    });

    // Cerrar el modal
    btnCerrarModal.addEventListener('click', () => {
        modalFormulario.classList.add('hidden');
    });

    // Cerrar el modal al hacer clic fuera de él
    modalFormulario.addEventListener('click', (e) => {
        if (e.target === modalFormulario) {
            modalFormulario.classList.add('hidden');
        }
    });
