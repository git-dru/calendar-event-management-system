const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  start_date: {
    required: true,
    type: Date
  },
  end_date: {
    required: true,
    type: Date
  },
  notes: {
    required: true,
    type: String,
  },
})

module.exports = mongoose.model('Event', EventSchema)
