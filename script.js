
const map = L.map('map').setView([28.6139, 77.2090], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        
        const stations = [
            {lat: 28.6139, lng: 77.2090, name: "Connaught Place", aqi: 156, status: "Unhealthy"},
            {lat: 28.4595, lng: 77.0266, name: "Gurgaon", aqi: 142, status: "Moderate"},
            {lat: 28.5355, lng: 77.3910, name: "Noida", aqi: 134, status: "Moderate"},
            {lat: 28.4089, lng: 77.3178, name: "Faridabad", aqi: 178, status: "Unhealthy"},
            {lat: 28.7041, lng: 77.1025, name: "Delhi University", aqi: 123, status: "Moderate"}
        ];

        stations.forEach(station => {
            const color = station.aqi > 150 ? '#ff6b6b' : station.aqi > 100 ? '#ffa726' : '#66bb6a';
            const marker = L.circleMarker([station.lat, station.lng], {
                color: color,
                fillColor: color,
                fillOpacity: 0.7,
                radius: 10
            }).addTo(map);
            
            marker.bindPopup(`
                <strong>${station.name}</strong><br>
                AQI: ${station.aqi}<br>
                Status: ${station.status}
            `);
        });


        const ctx = document.getElementById('pollutionChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
                datasets: [{
                    label: 'AQI',
                    data: [145, 156, 134, 142, 167, 178],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 100,
                        max: 200
                    }
                }
            }
        });

    function toggleMenu() {
            document.querySelector(".nav-links").classList.toggle("view");
			console.log("clicked");
        }
        const closeBtn = document.querySelector(".remove");
        closeBtn.addEventListener('click', () => {
      document.querySelector(".nav-links").classList.remove('view');
    });
       

    
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
const submitBtn=document.querySelector(".submitBtn");
function lang(){
let searchBar=document.querySelector(".search-bar").value;
const currentAQI=document.querySelector("#currentAQI");
const APIKEY = "208820849d23370b25eca042f1d31e16394efcf9"
 
fetch(`https://api.waqi.info/feed/${searchBar}/?token=${APIKEY}`)
.then((res)=>{
    return res.json();
}).then((data)=>{
    if(data.status==="ok"){
         console.log(data.data.aqi);
     currentAQI.innerText=data.data.aqi;
    }else{
        console.log("city level data not found, using geo API");
fetch(`https://nominatim.openstreetmap.org/search?city=${searchBar}&format=json&limit=1`)
.then((res)=>{
    return res.json();
}).then((data)=>{
 console.log(data[0].name);
    let LAT = data[0].lat;
    let LON = data[0].lon;
    fetch(`https://api.waqi.info/feed/geo:${LAT};${LON}/?token=${APIKEY}`).then((res)=>{
    return res.json();
}).then((data)=>{
     currentAQI.innerText=data.data.aqi;
})
    }
    )
}
})
}
function selectLocation(event){
 const currentAQI=document.querySelector("#currentAQI");
const APIKEY = "208820849d23370b25eca042f1d31e16394efcf9"
let searchBar=document.querySelector(".search-bar");
searchBar.value=event;
fetch(`https://api.waqi.info/feed/${event}/?token=${APIKEY}`).then((res)=>{
    return res.json();
}).then((data)=>{
    console.log(data.data.aqi);
     currentAQI.innerText=data.data.aqi;
})   
}

submitBtn.addEventListener("click",lang)