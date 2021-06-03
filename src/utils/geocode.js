const request = require('request'); 
const geocode=(address,callback)=>{
    mapBoxUrl ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYnVyYWhuIiwiYSI6ImNrcDd6bXQ3bTA1Y3cyb254bG9qNTVoNXUifQ.YIyUiJm-HPAbLjP6ooXH6A&limit=1";
    request({url:mapBoxUrl,json:true},(error,response)=>{
        if(error)
        {
            callback("Unable To Connect Weather Api",undefined);
        }
        else if(response.body.error)
        {
            callback("Unable To Find Location.",undefined);
        }
        else
        {
            if(response.body.features.length > 0)
            {
                callback( undefined,{
                    longitude : response.body.features[0].center[0],
                    latitude : response.body.features[0].center[1],
                    location : response.body.features[0].place_name
                });
            }
            else
            {
                callback("Unable To Find Location.",undefined);
            }
        }
        
    });
}
module.exports = geocode;