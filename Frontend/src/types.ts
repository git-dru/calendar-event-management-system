export interface Event {
    id: string,
    title: string,
    startDate: string,
    endDate: string,
    notes: string,
}

export interface EventFetchAction {
    type: 'fetch',
    payload: {
        data: Event[]
    }
}

export interface EventAddAction {
    type: 'add',
    payload: {
        event: Omit<Event, "id">
    }
}

export interface EventUpdateAction {
    type: 'update',
    payload: {
        event: Event
    }
}

export interface EventDeleteAction {
    type: 'delete',
    payload: {
        eventId: Event['id']
    }
}

export type EventsAction =
    | EventFetchAction
    | EventAddAction
    | EventDeleteAction
    | EventUpdateAction
