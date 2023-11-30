let locationEl = document.querySelector('#location')
let ipEl = document.querySelector('#ip')
let timezoneEl = document.querySelector('#timezone')
let isp = document.querySelector('#isp')


document.querySelector('.arrow').addEventListener('click', ()=>{
   addInformation()
})

async function apiKey(){
    const url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_73RrbbeBPPPz8QCmlMuwpgJ9KHIPQ'
    let response = await fetch(url)
    let json = await response.json()
    ipEl.innerHTML = json.ip
    locationEl.innerHTML = `${json.location.city}, ${json.location.region} ${json.as.asn}`
    timezoneEl.innerHTML = `UTC ${json.location.timezone}`
    isp.innerHTML = json.isp;
    addMap()
}

async function addInformation(){
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_73RrbbeBPPPz8QCmlMuwpgJ9KHIPQ&ipAddress=${document.querySelector('#input').value}`
    let response = await fetch(url)
    let json = await response.json()
    if(response.status == 200){
        ipEl.innerHTML = json.ip
        locationEl.innerHTML = `${json.location.city}, ${json.location.region} ${json.as.asn}`
        timezoneEl.innerHTML = `UTC ${json.location.timezone}`
        isp.innerHTML = json.isp;
        addMap()
    }
}

async function addMap(){
    const url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_73RrbbeBPPPz8QCmlMuwpgJ9KHIPQ'
    let response = await fetch(url)
    let json = await response.json()
    var map = L.map('map').setView([json.location.lat, json.location.lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
    var marker = L.marker([json.location.lat, json.location.lng]).addTo(map);
    

}




apiKey()








