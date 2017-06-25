const request = require('request');

var geocode = (address) =>{
  return new Promise((resolve,reject)=>{
    request({
      url : `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
      json:true
    },(error,response,body)=>{
      if(error){
        reject('Unable to connect');
      }else{
        resolve({
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    })
  });
}

module.exports = {getGeocode : geocode};
