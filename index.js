const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const path = require('path')
const ejs = require('ejs');
const req = require("express/lib/request");

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


//route to main page
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

app.get('/update_appt',function(req,res){
    Appt.findById("62a01256f60cc62825de413d", (error, data) => {
        if(error){
            console.log(error)
        } else {
            console.log(data)
        }
    })
})

app.delete("/:id", (req, res) => {
    let id = req.params.id
    Appt.findById(id, (err, interview) => {
        if(err) res.status(500).send({message: "Error deleting record"})
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