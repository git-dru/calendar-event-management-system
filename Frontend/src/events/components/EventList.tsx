import React, { useState } from "react";

import { EventCard } from "./EventCard";
import { AddEventButton } from "./AddEventButton";
import { AddEventForm } from "./AddEventForm";
import { Card } from "shared/components";

import { useEvents } from "./EventProvider";
import { createEvent } from "api/events";
import { Event } from "types";
import { toast } from "react-toastify";

type NewEventMode = "BUTTON" | "FORM";

export const EventList = () => {
  const { events, eventsDispatch } = useEvents();
  const [displayOptionType, setDisplayOptionType] =
    useState<NewEventMode>("BUTTON");

  const onCreateEvent = (
    data: Record<"title" | "start_date" | "end_date" | "notes", string>
  ) => {
    createEvent(data)
      .then((res: any) => {
        const event: Event = res.data.event;
        eventsDispatch({ type: "add", payload: { event } });
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="card-deck">
      {events.map((event) => (
        <Card key={event._id}>
          <EventCard key={event._id} event={event} />
        </Card>
      ))}
      <Card>
        {/* TODO: Implement displaying appropriate card for add event - button or form */}
        {displayOptionType === "FORM" ? (
          <AddEventForm
            onSubmit={onCreateEvent}
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
