const Event = require('../models/event.model')
const moment = require('moment');

const overlapExists = async (newEvent, events) => {
  const newEventStart = moment(newEvent.start_date, 'MMMM Do YYYY, h:mm:ss a');
  const newEventEnd = moment(newEvent.end_date, 'MMMM Do YYYY, h:mm:ss a');

  return events.some(event => {
    const eventStart = moment(event.start_date, 'MMMM Do YYYY, h:mm:ss a');
    const eventEnd = moment(event.end_date, 'MMMM Do YYYY, h:mm:ss a');

    // Check if the new event's time interval overlaps with the existing event's time interval
    return (
      newEventStart.isBefore(eventEnd) && newEventEnd.isAfter(eventStart)
    );
  });
}
async function create(req, res) {
  const { event } = req.body
  try {
    const newEventStart = moment(event.start_date, 'MMMM Do YYYY, h:mm:ss a');
    const newEventEnd = moment(event.end_date, 'MMMM Do YYYY, h:mm:ss a');

    const events = await Event.find()

    if (await overlapExists(event, events)) {
      return res.status(400).json({ error: 'Event overlaps with an existing event.' });
    }

    const newEvent = await new Event({
      title: event.title,
      start_date: newEventStart.toDate(),
      end_date: newEventEnd.toDate(),
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
  const { event } = req.body
  try {
    const newEventStart = moment(event.start_date, 'MMMM Do YYYY, h:mm:ss a');
    const newEventEnd = moment(event.end_date, 'MMMM Do YYYY, h:mm:ss a');

    const events = await Event.find({ _id: { $ne: event._id } });

    if (await overlapExists(event, events)) {
      return res.status(400).json({ error: 'Event overlaps with an existing event.' });
    }

    const existingEvent = await Event.findById(event._id)
    if (!existingEvent) return res.status(400).json({ message: "Event not Found" })

    existingEvent.title = event.title
    existingEvent.start_date = newEventStart.toDate()
    existingEvent.end_date = newEventEnd.toDate()
    existingEvent.notes = event.notes

    await existingEvent.save()

    return res.status(200).json({ event: existingEvent })
  } catch (err) {
    console.log(err)
  }
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


