import { useEventsReducer } from "../useEventsReducer";
import React, { useContext } from "react";

import { Event, EventsAction } from "types";

type EventContextType = {
  events: Event[];
  eventsDispatch: React.Dispatch<EventsAction>;
};

export const EventContext = React.createContext<EventContextType | undefined>(
  undefined
);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ initialized, events }, eventsDispatch] = useEventsReducer();
  return (
    <EventContext.Provider value={{ events, eventsDispatch }}>
      {initialized ? children : <div>loading...</div>}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const eventsCtx = useContext(EventContext);
  if (!eventsCtx) {
    throw new Error("Component beyond EventContext!");
  }
  return eventsCtx;
};
