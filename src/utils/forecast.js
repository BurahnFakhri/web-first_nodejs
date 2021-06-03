const request = require('request');
const weather =(lat,lon,callback)=>{
    const weatherUrl ="http://api.weatherstack.com/current?access_key=e611cbce283032f075fa6774548ff6b6&query="+lat+","+lon+"&units=f";
    request({url:weatherUrl,json:true},(error,response)=>{
        if(error)
        {
            callback("Unable To Connect Weather Api",undefined);
        }
        else if(response.body.error)
        {
            callback("Unable To Fetch Weather Data",undefined);
        }
        else
        {
            forcastdata=response.body.current.weather_descriptions[0] +" It Is Currently "+ response.body.current.temperature + " Degrres Out. It Feels Like "+response.body.current.feelslike + " Degrres Out";
            callback(undefined,{
               forecast:forcastdata,
               location:response.body.location.name,
               address : response.body.location.region,
            });
        }
    });
};
module.exports=weather;