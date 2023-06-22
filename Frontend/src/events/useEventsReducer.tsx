import React, { useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";

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
          id: uuid(),
          ...action.payload.event,
        };
        return { ...state, events: [...state.events, newEvent] };

      case "delete":
        return {
          ...state,
          events: state.events.filter(
            (event) => event.id !== action.payload.eventId
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
    getEvents().then((data) => {
      dispatch({ type: "fetch", payload: { data } });
    });
  }, []);

  return [state, dispatch];
}
