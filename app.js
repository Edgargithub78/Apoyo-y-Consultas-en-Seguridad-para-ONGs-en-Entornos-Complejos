document.getElementById('openFileBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert("Por favor, selecciona un archivo de Excel primero.");
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const tableBody = document.querySelector('#newsTable tbody');
        tableBody.innerHTML = ""; // Limpia la tabla antes de agregar nuevos datos

        jsonData.forEach(row => {
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).innerText = row.Titulo || "Sin título"; // Cambia 'Titulo' según tu archivo
            newRow.insertCell(1).innerText = row.Fecha || "Sin fecha";   // Cambia 'Fecha'
            newRow.insertCell(2).innerText = row.Contenido || "Sin contenido"; // Cambia 'Contenido'
        });
    };

    reader.onerror = function() {
        alert("Error al leer el archivo. Por favor, verifica el formato.");
    };

    reader.readAsArrayBuffer(file);
});

// Inicializa el mapa con marcadores
function initMap() {
    var map = L.map('map').setView([8.4, -73.4], 8); // Ajusta la posición inicial y el zoom
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Añade un marcador
    var marker = L.marker([8.45, -73.25]).addTo(map);
    marker.bindPopup("<b>Localización Importante</b><br>Catatumbo.").openPopup();
}

window.onload = initMap;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
