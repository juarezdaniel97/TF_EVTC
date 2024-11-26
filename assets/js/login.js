document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();
    const rol = document.getElementById("rol").value;
    localStorage.setItem("rolUsuario", rol);
    window.location.href = "index.html";
});
