import { Event } from "types"
import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getEvents = async (): Promise<Event[]> => {
    return await axios.get(`${BASE_URL}/event`)
}
export const createEvent = async (event: Omit<Event, "_id">): Promise<Event> => {
    return await axios.post(`${BASE_URL}/event/create`, {event})
}

export const deleteEvent = async (id: Event["_id"]): Promise<Event> => {
    return await axios.delete(`${BASE_URL}/event/${id}`)
}