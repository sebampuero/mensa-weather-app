const request = require('request');

var getMensaOptions = () =>{
  return new Promise((resolve,reject)=>{
    request({
      url : 'https://icampus.th-wildau.de/services.php?service=Canteen',
      json:true
    },(error,response,body)=>{
      if(error){
        reject('Unable to connect');
      }else{
        resolve({
          today : body.response.today.options,
          nextDates : body.response.future_dates,
          mensaClosedMsg : body.response.message
        });
      }
    })
  });
}

getMensaOptions().then((result)=>{
  console.log(result.mensaClosedMsg!=null);
},(error)=>{
  console.log(error);
})

module.exports = {
  getMensaOptions
}
