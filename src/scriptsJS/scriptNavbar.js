//Script para abrir o cerrar los mabvars

//Funcion para abrirlo
function openNavbarAlgoritmos() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Cierra el dropdown cuando el usuario clicka fuera del el
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
