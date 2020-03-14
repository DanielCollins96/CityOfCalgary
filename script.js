document.addEventListener('DOMContentLoaded', (event) => {

    // traffic cameras https://data.calgary.ca/resource/k7p9-kppz.json 
    let feed = document.querySelector('#feed');
    let cameraInput = document.querySelector('#number');
    let streetInput = document.querySelector('#streets');
    let form = document.querySelector('form')
    let cameras = [];

    fetch('https://data.calgary.ca/resource/k7p9-kppz.json')
    .then((response) => {
        console.log(response)
        return response.json();
    })
    .then((res) => {
        console.log(res)
        cameras = res;
        mainArea(cameras);
        // sideCamInput();
        sideStreetInput();
    })

    let mainArea = function (cams){
        feed.innerHTML = "";
        for (cam of cams){
            console.log(cam.camera_url.url)
            let box = document.createElement('div');  
            let h4 = document.createElement('h4');
            h4.innerText = cam.camera;
            let p = document.createElement('p');
            p.innerText = cam.camera_location;
            let img = document.createElement('img');
            // console.l
            img.width = "200";
            img.src = cam.camera_url.url;
            box.appendChild(h4);
            box.appendChild(p);
            box.appendChild(img);
            feed.appendChild(box);
        }
    }
    let sideCamInput = function(){
        for (num of cameras){
            let camName = num.camera;
            camName = camName.substring(camName.length - 2, camName.length).trim()
            let camOpt = document.createElement('option');
            camOpt.text = camName;
            cameraInput.appendChild(camOpt)
        }
    }

    let sideStreetInput = function(){

        for (loc of cameras){
            let streetOpt = document.createElement('option');
            streetOpt.text = loc.camera_location;
            streetInput.appendChild(streetOpt);
        }
    }
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(streetInput)
        console.log(streetInput.value)
        if (streetInput.value == "all"){
            mainArea(cameras)
        } else {

            let filteredCam = cameras.filter((element) => {
                return element.camera_location == streetInput.value
            })
            mainArea(filteredCam);
        }
    })

    cameraInput.addEventListener('keyup', (event) => {

    })



})