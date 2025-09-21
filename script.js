
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
        function selectLocation(location) {
            document.querySelectorAll('.location-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            const aqiData = {
                'Delhi': {aqi: 156, status: 'Unhealthy', color: '#ff6b6b'},
                'Gurgaon': {aqi: 142, status: 'Moderate', color: '#ffa726'},
                'Noida': {aqi: 134, status: 'Moderate', color: '#ffa726'},
                'Faridabad': {aqi: 178, status: 'Unhealthy', color: '#ff6b6b'}
            };
            
            const data = aqiData[location];
            document.getElementById('currentAQI').textContent = data.aqi;
            document.getElementById('currentAQI').style.color = data.color;
            document.getElementById('aqiStatus').textContent = data.status;
        }

    
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

const KEY = '579b464db66ec23bdd0000014ee736473f594fbd6cc37df5678f0a69';

const AQI_RESOURCE_ID = '3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69';
const url = fetch(`https://api.data.gov.in/resource/${AQI_RESOURCE_ID}?api-key=${KEY}&format=json`);

url.then((res)=>{
    return res.json();
}).then((data)=>{
    console.log(data);
})

}
submitBtn.addEventListener("click",lang)