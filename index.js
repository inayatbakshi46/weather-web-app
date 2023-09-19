const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);


const app = express();
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/weather", (req, res) => {

  const city = req.body.city;
  const apiKey = process.env.KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey+"&units=metric";


  https.get(url,(response) => {
    response.on("data", (data) => {
    const weatherInfo = JSON.parse(data);
      const temp = weatherInfo.main.temp;
      const des = weatherInfo.weather[0].description;
const low = weatherInfo.main.temp_min;
      const high = weatherInfo.main.temp_max;
      const country = weatherInfo.sys.country
      res.render("weather", {weatherCity: city, temperature: temp, weatherDes: des, date: formattedDate, higher: high, lower: low, country: country});

  });


  });

});
// opening server
app.listen(process.env.PORT || 3000, () => {
  console.log("server is up and running.")
});