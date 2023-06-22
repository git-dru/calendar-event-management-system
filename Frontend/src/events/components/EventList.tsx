import React, { useState } from "react";

import { EventCard } from "./EventCard";
import { AddEventButton } from "./AddEventButton";
import { AddEventForm } from "./AddEventForm";
import { Card } from "shared/components";

import { useEvents } from "./EventProvider";

type NewEventMode = "BUTTON" | "FORM";

export const EventList = () => {
  const { events, eventsDispatch } = useEvents();
  const [displayOptionType, setDisplayOptionType] =
    useState<NewEventMode>("BUTTON");

  // TODO: Display list of events

  return (
    <div className="card-deck">
      {events.map((event) => (
        <Card key={event.id}>
          <EventCard key={event.id} event={event} />
        </Card>
      ))}
      <Card>
        {/* TODO: Implement displaying appropriate card for add event - button or form */}
        {displayOptionType === "FORM" ? (
          <AddEventForm
            onSubmit={(
              data: Record<"title" | "startDate" | "endDate" | "notes", string>
            ) => {
              eventsDispatch({ type: "add", payload: { event: data } });
            }}
            onCancel={() => {
              setDisplayOptionType("BUTTON");
            }}
          />
        ) : (
          <AddEventButton onClick={() => setDisplayOptionType("FORM")} />
        )}
      </Card>
    </div>
  );
};
