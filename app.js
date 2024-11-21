// Inicializa el mapa interactivo
function initMap() {
    var map = L.map('map').setView([8.4, -73.4], 8); // Ajusta la posición y el zoom inicial
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
}
window.onload = initMap; // Asegúrate de inicializar el mapa cuando la página cargue

// Función para cargar las noticias desde un archivo Excel
document.getElementById('openFileBtn').addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx';
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const newsData = XLSX.utils.sheet_to_json(sheet); // Convierte la hoja en JSON
            displayNews(newsData);
        };
        reader.readAsArrayBuffer(file);
    });
    input.click(); // Abre el cuadro de selección de archivo
});

// Muestra las noticias cargadas desde el archivo Excel
function displayNews(newsData) {
    const container = document.getElementById('newsContainer');
    container.innerHTML = ''; // Limpia el contenedor de noticias antes de mostrar nuevas

    newsData.forEach((item, index) => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <h3>${item.Titulo || 'Sin Título'}</h3>
            <p>${item.Descripcion || 'Sin Descripción'}</p>
        `;
        container.appendChild(newsItem);
    });
}
