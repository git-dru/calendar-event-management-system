export interface Event {
    _id: string,
    title: string,
    start_date: string,
    end_date: string,
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
        event: Event
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
        eventId: Event['_id']
    }
}

export type EventsAction =
    | EventFetchAction
    | EventAddAction
    | EventDeleteAction
    | EventUpdateAction
