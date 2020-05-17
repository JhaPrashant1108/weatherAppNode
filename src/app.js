const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000


const pathDirectory = path.join(__dirname,'..','public')
const templateDirectory = path.join(__dirname,'..','templates','views')
const partialsDirectory = path.join(__dirname,'..','templates','partials')

app.set('view engine','hbs')
app.set('views',templateDirectory)
hbs.registerPartials(partialsDirectory)


app.use(express.static(pathDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        developer: 'Prashant jha'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        developer: 'Prashant jha'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        developer: 'Prashant jha'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide a valid address'
        })
    } 
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error
            })
        }
        weather(data,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'help 404',
        developer:'Prashant Jha',
        errorMessage:'Help Page Not Found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        developer:'Prashant Jha',
        errorMessage:'Page Not Found'
    })
})


app.listen(port,()=>{
    console.log('server is up and running at '+ port)
})