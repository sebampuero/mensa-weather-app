const express = require('express');
const hbs = require('hbs');
const moment = require('moment');
const mensa = require('./mensa/mensa.js')
const weather = require('./weather/weather.js')
const geocode = require('./weather/geocode.js')
var app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getDate',()=>{
  return moment().format('LL');
});
hbs.registerHelper('formatDate',(date)=>{
  moment.locale('de');
  var theDate = moment(date).format('dddd DD');
  return theDate;
})


app.get('/',(req,res)=>{
  mensa.getMensaOptions().then((mensa)=>{
    geocode.getGeocode('15745 Wildau').then((geo)=>{
      weather.getWeather(geo.latitude,geo.longitude).then((weather)=>{
        if(mensa.today.length === 0){
          res.render('home.hbs',{
            closed : mensa.mensaClosedMsg.de_DE,
            weather
          });
        }else{
          res.render('home.hbs',{
            options : mensa.today,
            weather
          })
        }
      },(error)=>{//we still need the mensa service even if weather is down
        //so we need to abstract this
        console.log(JSON.stringify(error));
        res.send('UNABLE TO FETCH WEATHER');
      })
    },(error)=>{ //same as above
      console.log(JSON.stringify(error));
    })
  },(error)=>{
    res.send('error');
  })
});
app.get('/future',(req,res)=>{
  mensa.getMensaOptions().then((mensa)=>{
    geocode.getGeocode('15745 Wildau').then((geo)=>{
      weather.getWeather(geo.latitude,geo.longitude).then((weather)=>{
        res.render('future_dates.hbs',{
          days : mensa.nextDates,
          weather
        })
      },(weatherError)=>{
        console.log(JSON.stringify(weatherError));
        res.send('UNABLE TO FETCH WEATHER');
      })
    },(geoCodeError)=>{
      console.log(JSON.stringify(geoCodeError));
    })
  },(mensaError)=>{
    res.send('error');
  })
});

app.listen(port, ()=>{
  console.log('Listening on port',port);
});
