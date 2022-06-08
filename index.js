const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const path = require('path')
const {config, engine} = require('express-edge')
const Appt = require('./database/Model/Appts')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://asolharo:UDvmMlRCyaaC0lft@cluster0.9nll8ek.mongodb.net/appointments")

app.use(engine);
app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//path for css and images
app.use(express.static(path.join(__dirname, 'public')));


//route to main page
app.get("/", async (req, res) => {
    const appts = await Appt.find({})
    //console.log(appts)
    res.render('index', {
        appts
    })
})

app.post('/deleteAll', (req, res) => {
    Appt.deleteMany(function(err){
        if(err){
            res.send(err)
        } else {
            console.log('Deleted all the appointments successfully')
            res.redirect('/')
        }
    })
})


//route to scheduler page
app.get('/schedule', (req,res) => {
    res.render('schedule')
})

app.post('/schedule', (req, res) => {
    Appt.create(req.body, (err, appointment) => {
        res.redirect('/schedule')
        console.log('Appointment registered successfully')
    })
})

//route to update_appt page
app.get('/update_appt_:id', async (req,res) => {
    const appt = await Appt.findById(req.params.id)
    res.render('update_appt', {
        appt
    })
})

app.post('/update_appt/save_:id', (req, res) => {
    const apptID = req.params.id
    console.log(apptID)

    Appt.findByIdAndUpdate(apptID, {
        interviewer: req.body.interviewer,
        date: req.body.date,
        name: req.body.name,
        reason: req.body.reason
    }, (err, appt) => {
        console.log(err, apptID)
        res.redirect('/')
        console.log('Successfull modification')
    })
})

app.get('/delete_:id', async (req,res) => {
    const appt = await Appt.findById(req.params.id)
    res.render('delete', {
        appt
    })
})

app.post('/delete_:id', (req, res) => {
    const apptID = req.params.id
    console.log(apptID)
    Appt.findByIdAndRemove(apptID, function(err){
        if(err){
            res.send(err)
        } else {
            console.log('Deleted successfully')
            res.redirect('/')
        }
    })
})


//create new object for database
app.post("/", function(req, res) {
    let newAppt = new Appt({
        interviewer: req.body.interviewer,
        date: req.body.date,
        time: req.body.time,
        name: req.body.name,
        reason: req.body.reason,
    })
    newAppt.save()
    res.redirect('/')
})

app.listen(3000, function() {
    console.log("server connected and running on 3000")
})