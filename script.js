document.addEventListener('DOMContentLoaded', (event) => {

    // traffic cameras https://data.calgary.ca/resource/k7p9-kppz.json 
    let feed = document.querySelector('#feed');
    let cameraInput = document.querySelector('#number');
    let streetInput = document.querySelector('#streets');
    let form = document.querySelector('form');
    let modal = document.querySelector('#myModal');
    let close = document.querySelector('span');
    let cameras = [];

    fetch('https://data.calgary.ca/resource/k7p9-kppz.json')
    .then((response) => {
        console.log(response)
        return response.json();
    })
    .then((res) => {
        console.log(res)
        console.log(res[0].camera.slice(7))
        //whoa nelly this is a big one
        res.sort(function(a,b) {return (Number(a.camera.slice(7)) > Number(b.camera.slice(7))) ? 1 : ((Number(b.camera.slice(7)) > Number(a.camera.slice(7))) ? -1 : 0);} );

        cameras = res;
        mainArea(cameras);
        // sideCamInput();
        sideStreetInput();
    })

    let mainArea = function (cams){
        feed.innerHTML = "";
        for (cam of cams){
            let box = document.createElement('div');  
            let h4 = document.createElement('h4');
            h4.innerText = cam.camera;
            let p = document.createElement('p');
            p.innerText = cam.camera_location;
            let img = document.createElement('img');
            // console.log(cam.camera.slice(7))
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

    feed.addEventListener('click', (e) => {
        if(e.target && e.target.nodeName == "IMG"){
            console.log(e.target.src)
            document.querySelector('#img01').src = e.target.src
            modal.style.display = "block";

        }
    })

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
            filteredCam = filteredCam.sort(function(a, b){return a.camera_location - b.camera_location});
            mainArea(filteredCam);
        }
    })

    close.addEventListener('click', (e) => {
        modal.style.display = "none";
    })

    cameraInput.addEventListener('keyup', (event) => {

    })



})