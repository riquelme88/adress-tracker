//Inital Data

var map;  // Declare a variável do mapa globalmente
var locationEl = document.querySelector('#location');
var ipEl = document.querySelector('#ip');
var timezoneEl = document.querySelector('#timezone');
var isp = document.querySelector('#isp');

document.querySelector('.arrow').addEventListener('click', () => {
    addInformation();
});

document.querySelector('#input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addInformation();
    }
});

//Functions

async function apiKey() {
    const url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_lxck7E6AjWzqFCbPNZzLfrzPNYqOx';
    let response = await fetch(url);
    let json = await response.json();

    // Obtenha as coordenadas da localização atual do usuário
    const userCoordinates = [json.location.lat, json.location.lng];

    // Atualize as informações na página
    updateInformation(json);

    // Adicione o mapa usando as coordenadas da localização atual do usuário
    addMap(userCoordinates);

    // Chame addInformation() aqui se quiser que seja chamado também ao carregar a página
    // addInformation();
}

// Adicione a função updateInformation para atualizar as informações na página
function updateInformation(json) {
    ipEl.innerHTML = json.ip;
    locationEl.innerHTML = `${json.location.city}, ${json.location.region} ${json.as.asn}`;
    timezoneEl.innerHTML = `UTC ${json.location.timezone}`;
    isp.innerHTML = json.isp;
}

async function addMap(coordinates) {
    if (!map) {
        // Se o mapa ainda não foi inicializado, crie um novo
        map = L.map('map').setView(coordinates, 14);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 15,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } else {
        // Se o mapa já foi inicializado, apenas ajuste a visualização para as novas coordenadas
        map.setView(coordinates, 14);
    }

    // Adicione ou mova o marcador
    var marker = L.marker(coordinates);
    marker.addTo(map);
}

// Adicione a função addInformation para obter informações com base no IP inserido
 function addInformation() {
    const ipAddress = document.querySelector('#input').value;
    
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_lxck7E6AjWzqFCbPNZzLfrzPNYqOx&ipAddress=${ipAddress}`)
        .then(response => response.json())
        .then(json => {
            updateInformation(json);
            addMap([json.location.lat, json.location.lng]);
        })
        .catch(error => {
            console.error('Erro ao obter informações do IP:', error);
        });
}

// Chame apiKey() apenas ao carregar a página
apiKey();
