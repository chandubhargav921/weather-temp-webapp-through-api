const express =require("express");
const app = express();
const https =require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
// const url=`https://api.openweathermap.org/data/2.5/weather?q=${req.params.country || India}&appid=1705fa8d266353cc74d9170df031aaa3&units=metric`;
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
const query=req.body.cityName;
// console.log(query);
const apiId = "1705fa8d266353cc74d9170df031aaa3";
const unit = "metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiId+"&units="+unit;
https.get(url,function(response){
  response.on("data",function(data){
  const weatherData=JSON.parse(data);
  console.log(weatherData);
  const tempe=weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;
  console.log(weatherDescription);
  const place = weatherData.name;
  const icon= weatherData.weather[0].icon;

    res.write("<h1>the temperature in "+place+" is "+tempe+"</h1>"+"<em>the weather is currently "+weatherDescription+"</em>");
    res.write("<br>")
    res.write("<img src=http://openweathermap.org/img/wn/"+icon+"@2x.png>");

    res.send();
});
});
});
app.listen(3000,function(){
  console.log("server listening on port 3000");
})
