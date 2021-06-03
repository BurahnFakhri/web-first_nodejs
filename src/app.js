const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const geocode =require('./utils/geocode');
const forecast =require('./utils/forecast');

//Define Paths For Express Config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../views');
const partialsPath = path.join(__dirname,'../views/partials');

// Setup Handlebars Engine & View Location  
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
//Setup Static Directory To Server 
app.use(express.static(publicDirectoryPath));
app.get('',(req,res)=>{
    res.render('index',{ 
        title : 'Weather App asd',
        name : 'Burhan'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Burhan',
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Us',
        name : 'Burhan',
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send('Address Required');
    }
    geocode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error)
        {
            return res.send({error}); 
        }
        else
        {
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error)
                {
                    return res.send('error'); 
                }
                else
                {            
                    res.send({
                        forcast:forecastData.forecast,
                        location : forecastData.location,
                        address : forecastData.address
                    });
                }
            });
        }

    });
});

app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        return res.send('Product Name Required ');
    }
    res.send(req.query);
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message : 'Help Article Not Found'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        message : 'Page Not Found'
    });
});

app.listen(3000,()=>{
    console.log("server Is Runinng On Port 3000");
});

