var map;

document.addEventListener('DOMContentLoaded', (event) => {
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
    console.log(moment())
    const list = document.querySelector('.crash-list')

    fetch('https://data.calgary.ca/resource/35ra-9556.json?$limit=30&$order=start_dt DESC')
    .then((response) => {
        // console.log(response)
        return response.json()
    })
    .then(res => {
        console.log(res)
        createList(res)
    })
    .catch(error => console.log(error))

    let createList = (crashes) => {
        crashes.forEach(crash => {
            list.innerHTML +=
                `<div class="card bg-light mb-3" style="max-width: 20rem;">
                    <div class="card-header">${crash.description}</div>
                    <div class="card-body">
                    <p>${crash.incident_info}</p>
                    <p>${moment(crash.start_dt).fromNow()}</p>
                    </div>
                    
                    </div>`
                    // <br>
                    // <p>(${crash.latitude}, ${crash.longitude})</p>
                })
            }
        });
        
        
        // <p>${Date.parse(crash.start_dt).toTimeString()}</p>