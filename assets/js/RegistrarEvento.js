// Manejo del formulario
document.getElementById("eventForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Capturar datos del formulario
    const formData = new FormData(e.target);
    const eventDetails = Object.fromEntries(formData.entries());

    // Simular registro
    console.log("Evento registrado:", eventDetails);
    alert("El evento ha sido registrado exitosamente.");
    e.target.reset(); // Limpiar el formulario
});