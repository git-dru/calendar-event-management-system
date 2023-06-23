import React, { useReducer, useEffect } from "react";

import { Event, EventsAction } from "types";
import { getEvents } from "api/events";

interface EventsState {
  events: Event[];
  initialized: boolean;
}

export function useEventsReducer(): [
  EventsState,
  React.Dispatch<EventsAction>
] {
  // TODO: Implement all action processing

  const eventReducer = (
    state: EventsState,
    action: EventsAction
  ): EventsState => {
    switch (action.type) {
      case "fetch":
        return { initialized: true, events: action.payload.data };

      case "add":
        const newEvent: Event = {
          ...action.payload.event,
        };
        return { ...state, events: [...state.events, newEvent] };

      case "update":
        const updatedEvent: Event = {
          ...action.payload.event,
        };
        return {
          ...state,
          events: state.events.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
          ),
        };

      case "delete":
        return {
          ...state,
          events: state.events.filter(
            (event) => event._id !== action.payload.eventId
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(eventReducer, {
    events: [],
    initialized: false,
  });

  useEffect(() => {
    // TODO: Call fetch action
    getEvents()
      .then((res: any) => {
        const events: Event[] = res.data.events;
        dispatch({ type: "fetch", payload: { data: events } });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return [state, dispatch];
}
