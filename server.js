const express = require('express');
const hbs = require('hbs');
const moment = require('moment');
const mensa = require('./mensa/mensa.js')
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
  var theDate = moment(date).format('dddd');
  return theDate;
})


app.get('/',(req,res)=>{
  mensa.getMensaOptions().then((result)=>{
    if(result.today.length === 0){
      res.render('home.hbs',{
        closed : result.mensaClosedMsg.de_DE
      });
    }else{
      res.render('home.hbs',{
        options : result.today
      })
    }
  },(error)=>{
    res.send('error');
  })
});
app.get('/future',(req,res)=>{
  mensa.getMensaOptions().then((result)=>{
    res.render('future_dates.hbs',{
      days : result.nextDates
    })
  })
});

app.listen(port, ()=>{
  console.log('Listening on port',port);
});
