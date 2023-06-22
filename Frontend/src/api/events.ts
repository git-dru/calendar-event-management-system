import { Event } from "types"

export const getEvents = async (): Promise<Event[]> => {
    return require('../data/events.json')
}
