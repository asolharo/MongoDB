const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const { Timestamp } = require("bson");
const path = require('path')
const scheduleContent ="Schedule interview";

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

const Appt = mongoose.model("Appointment", apptSchema)

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
})

app.get('/schedule',function(req,res){
    res.sendFile(__dirname + '/views/schedule.html');
  });


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