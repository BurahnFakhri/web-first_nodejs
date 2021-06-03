// fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/Indore.json?access_token=pk.eyJ1IjoiYnVyYWhuIiwiYSI6ImNrcDd6bXQ3bTA1Y3cyb254bG9qNTVoNXUifQ.YIyUiJm-HPAbLjP6ooXH6A&limit=1').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     });
// });

fetch('http://localhost:3000/weather?address=!').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        if(data.error)
        {
            console.log(data.error);
        }
        else
        {
            console.log(data.location);
            console.log(data.forcast);
        }

    });
});
