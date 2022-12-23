const express = require("express");
const https = require("https");

const app = express();

app.get("/",function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=b4d526551a06e24f3ab13bce37b959fd&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temperature in Kathmandu is "+temp+"degree celcius</h1>");
            res.write("The weather condition is " + weatherDesc);
            res.write("<img src="+imageURL+">");
            res.send();
        })
    })
})



app.listen(3000,function(){
    console.log("Server is running on port 3000")
})