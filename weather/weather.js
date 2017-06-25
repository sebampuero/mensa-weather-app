const request = require('request');


var getWeather = (latitude,longitude)=>{
  return new Promise((resolve,reject)=>{
    request({
    url : 'https://api.darksky.net/forecast/df77b6724244bf14f71bd8bb723e4fe4/'+
    latitude+','+longitude+'?units=auto',
    json : true
  },(error,response,body)=>{
    if(!error && response.statusCode === 200){
      resolve({
        temperature : body.currently.temperature,
        apparentTemperature : body.currently.apparentTemperature
      });
    }else{
      reject({
        response
      })
    }
  })
  });
}

module.exports = {getWeather}
