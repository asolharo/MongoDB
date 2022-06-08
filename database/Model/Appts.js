const mongoose = require('mongoose')

//create data schema
const apptSchema = {
    interviewer: String,
    date: Date,
    name: String,
    reason: String,
}

//create Appt model
const Appt = mongoose.model("Appointment", apptSchema)

module.exports = Appt