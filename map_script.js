document.addEventListener('DOMContentLoaded', (event) => {

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
            `<div class="row">
            <div class="col s12 m6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">${crash.description}</span>
                  <p>${crash.incident_info}</p>
                  <br>
                  <p>(${crash.latitude}, ${crash.longitude})</p>
                  <p>${crash.start_dt}</p>
                  </div>
                  </div>
                  </div>
                  </div>`
                })
            }
        });
        
        
        // <p>${Date.parse(crash.start_dt).toTimeString()}</p>