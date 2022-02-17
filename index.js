const APIKEY = "at_LTc8vhyejx5tCvFpAyfQQqAnLDgtI"

let obj = {
    ip: "8.8.8.8",
    location: {
        country: "US",
        region: "California",
        city: "Mountain View",
        lat: 37.40599,
        lng: -122.078514,
        postalCode: "94043",
        timezone: "-07:00",
        geonameId: 5375481
    },
    domains: [
        "0d2.net",
        "003725.com",
        "0f6.b0094c.cn",
        "007515.com",
        "0guhi.jocose.cn"
    ],
    as: {
        asn: 15169,
        name: "Google LLC",
        route: "8.8.8.0/24",
        domain: "https://about.google/intl/en/",
        type: "Content"
    },
    isp: "Google LLC"
}

var map = L.map('map').setView([obj.location.lat, obj.location.lng], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
{attribution: 
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([obj.location.lat, obj.location.lng]).addTo(map)
    

    document.getElementById("resp-isp").innerHTML = obj.isp
    document.getElementById("resp-location").innerHTML = `${obj.location.city}, ${obj.location.region} ${obj.location.postalCode}`
    document.getElementById("resp-timezone").innerHTML = `UTC ${obj.location.timezone}`
    document.getElementById("resp-ip").innerHTML = obj.ip

const button = document.getElementById('button');

button.addEventListener("click", fetcheo)

async function fetcheo(){

    try{
        const URL = document.getElementById("ip").value

        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${APIKEY}&ipAddress=${URL}`)
        const data = await res.json()


        if(data.code === 422){
            //data = obj
            console.log ("error")
        }else{
            obj = data
            console.log(obj)
        }
        

        document.getElementById("resp-isp").innerHTML = obj.isp
        document.getElementById("resp-location").innerHTML = `${obj.location.city}, ${obj.location.region} ${obj.location.postalCode}`
        document.getElementById("resp-timezone").innerHTML = `UTC ${obj.location.timezone}`
        document.getElementById("resp-ip").innerHTML = obj.ip
        updateMap(obj.location.lat, obj.location.lng)
    }catch(error){
        console.log(error)
    }

}

function updateMap(latitude, longitude) {

    map.panTo(new L.LatLng(latitude, longitude));
    marker.setLatLng([latitude, longitude]).update();
}





