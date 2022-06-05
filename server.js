const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const path = require('path')
const ejs = require('ejs')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://asolharo:UDvmMlRCyaaC0lft@cluster0.9nll8ek.mongodb.net/appointments")

//create data schema
const apptSchema = {
    interviewer: String,
    date: Date,
    time: String,
    name: String,
    reason: String,
}

//create Appt model
const Appt = mongoose.model("Appointment", apptSchema)

//path for css and images
app.use(express.static(path.join(__dirname, 'public')));


//render main page
app.get("/", (req, res) => {
    Appt.find({}, function(err, interviews) {
        res.render('index',{
            interviewsList: interviews
        });
    })
})


//go to scheduler page
app.get('/schedule',function(req,res){
    res.sendFile(__dirname + '/views/schedule.html');
})

app.get('/update_appt',(req, res) => {
    res.render('update_appt')
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

app.listen(1987, function() {
    console.log("server connected and running")
})