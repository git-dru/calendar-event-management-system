const Event = require('../models/event.model')
const moment = require('moment');

async function create(req, res) {
  const { event } = req.body
  try {
    const newEvent = await new Event({
      title: event.title,
      start_date: moment(event.start_date, 'MMMM Do YYYY, h:mm:ss a').toDate(),
      end_date: moment(event.end_date, 'MMMM Do YYYY, h:mm:ss a').toDate(),
      notes: event.notes
    }).save()
    return res.status(200).json({ event: newEvent })
  } catch (err) {
    console.log(err)
  }
}

async function getAll(req, res) {
  try {
    const events = await Event.find()
    return res.status(200).json({ events })
  } catch (err) {
    console.log(err)
  }
}

async function update(req, res) {
}

async function remove(req, res) {
  const eventId = req.params.id
  console.log(eventId)
  try {
    const data = await Event.findByIdAndDelete(eventId);
    return res.status(200).json({ message: "Successfully Deleted" })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  create,
  getAll,
  update,
  remove,
};


