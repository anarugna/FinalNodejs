// Espera a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    const registrarseLink = document.getElementById('registrarse');
    const iniciarSesionLink = document.getElementById('iniciarSesion');
    const adminPeliculasLink = document.getElementById('adminPeliculas');

    // Función para cerrar sesión
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        alert('Sesión cerrada correctamente');
        window.location.href = '/';
    };

    // Verifica si el usuario está logueado
    const token = localStorage.getItem('token');
    if (token) {
        // Cambia los enlaces de "Registrarse" y "Iniciar Sesión"
        registrarseLink.textContent = 'Cargar Película';
        registrarseLink.href = './pages/cargar_pelicula.html'; // Ajusta la URL según tu estructura

        iniciarSesionLink.textContent = 'Cerrar Sesión';
        iniciarSesionLink.href = '#';
        iniciarSesionLink.addEventListener('click', (event) => {
            event.preventDefault();
            cerrarSesion();
        });

        // Muestra el enlace de "Administrador Peliculas"
        adminPeliculasLink.style.display = 'block';
    } else {
        // Oculta el enlace de "Administrador Peliculas"
        adminPeliculasLink.style.display = 'none';
    }
});