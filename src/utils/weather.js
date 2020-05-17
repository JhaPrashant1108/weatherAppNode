const request = require('request')

const weather = (data , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c6fbc570e83d9ff61c25a3681d9bd018&query='+encodeURIComponent(data.latitude)+
    ','+encodeURIComponent(data.longitude)+'&units=f'
    request({url : url, json : true},(error,response)=>{
        if(error){
            callback('unable to connect to weather services',undefined)
        }else if(response.body.error){
            callback('unable to find the weather of location',undefined)
        }else{
            callback(undefined, response.body.current.weather_descriptions[0]+' currently, with temperature of '+response.body.current.temperature+' f')
        }
    })
}

module.exports = weather