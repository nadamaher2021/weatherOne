let todayName=document.getElementById('today_date_day_name')
let todayNumber=document.getElementById('today_date_day_number')
let todayMonth=document.getElementById('today_date_month')
let todayLocation=document.getElementById('today_location ')
let todayTemp=document.getElementById('today_temp')
let humidity=document.getElementById('humidity')
let windDirection=document.getElementById('wind_direction')
let todayConditionImg=document.getElementById('today_condition_img')
let todayConditionText=document.getElementById('today_condition_text')
let searchInput=document.getElementById('search')
let wind=document.getElementById('wind')
let tomorrow_date=document.getElementById('tomorrow_date')
let nextDay=document.getElementsByClassName('next_day_name')
let tomorrow =document.getElementById('tomorrow')
let next_condition_img=document.getElementsByClassName('next_condition_img')
let next_condition_text=document.getElementsByClassName('next_condition_text')
let nextMaxTemp=document.getElementsByClassName('next_max_temp')
let next_min_temp=document.getElementsByClassName('next_min_temp')

let date=new Date()


async function getWeatherData(cityName){
    let weatherResponse=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=db0c2f4606eb4cd0b35200820240107&q=${cityName}&days=3`);
    let weatherData=await weatherResponse.json()
   return weatherData;
}
function displayTodayData(data) {
  let todayDate=new Date()
  todayName.innerHTML=todayDate.toLocaleDateString("en-Us",{weekday:"long"})
  todayNumber.innerHTML=todayDate.getDate()
  todayMonth.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"})
todayLocation.innerHTML=data.location.name
todayTemp.innerHTML=data.current.temp_c
todayConditionImg.setAttribute("src","https:"+data.current.condition.icon)
todayConditionText.innerHTML=data.current.condition.text
humidity.innerHTML=data.current.humidity+"%"
wind.innerHTML=data.current.wind_kph+"km/h"
windDirection.innerHTML=data.current.wind_dir
}
function displayNextData(data) {
  let forecastData=data.forecast.forecastday
  
for (let i = 0; i < 2; i++) {
  let nextDate=new Date(forecastData[i+1].date)
  nextDay[i].innerHTML=nextDate.toLocaleDateString("en-US",{weekday:"long"})
  nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c
  next_min_temp[i].innerHTML=forecastData[i+1].day.mintemp_c
  next_condition_img[i].setAttribute("src","https:"+forecastData[i+1].day.condition.icon) 
  next_condition_text[i].innerHTML=forecastData[i+1].day.condition.text
}
}

async function startApp(city="london") {
  let weatherData= await getWeatherData(city)
  if(!weatherData.error){
    displayTodayData(weatherData)
    displayNextData(weatherData)
  }

}
startApp()

searchInput.addEventListener("input",function () {
startApp(searchInput.value)
})