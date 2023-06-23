import React, { useState } from "react";

import { Event } from "types";
import { useEvents } from "./EventProvider";
import { Button } from "shared/components";
import { deleteEvent, updateEvent } from "api/events";
import moment from "moment";
import { AddEventForm, EventFormProps } from "./AddEventForm";
import { toast } from "react-toastify";
interface EventCardProps {
  event: Event;
}

type EventMode = "UPDATE" | "DELETE";
export const EventCard = ({ event }: EventCardProps) => {
  const { eventsDispatch } = useEvents();
  const [displayOptionType, setDisplayOptionType] =
    useState<EventMode>("DELETE");
  const onEventDelete = () => {
    deleteEvent(event._id)
      .then((res: any) => {
        toast.success("Successfully Deleted");
        eventsDispatch({ type: "delete", payload: { eventId: event._id } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdateEvent = (data: EventFormProps) => {
    updateEvent(data)
      .then((res: any) => {
        toast.success("Successfully Updated");
        const event: Event = res.data.event;
        eventsDispatch({ type: "update", payload: { event } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {displayOptionType === "DELETE" ? (
        <div data-testid={`event-item-${event._id}`}>
          <div className="card-body">
            <h4 className="card-title">{event.title}</h4>
            <h6 className="card-subtitle mb-2 my-5  text-muted">
              {moment(event.start_date).format("MMMM Do YYYY, h:mm:ss a")}
            </h6>
            <h6 className="card-subtitle mb-2 my-5 text-muted">
              {moment(event.end_date).format("MMMM Do YYYY, h:mm:ss a")}
            </h6>
            <p className="text-justify my-5 " style={{ fontSize: "14px" }}>
              {event.notes}
            </p>
            <Button onClick={onEventDelete}>Delete</Button>
            <Button onClick={() => setDisplayOptionType("UPDATE")}>
              Update
            </Button>
          </div>
        </div>
      ) : (
        <AddEventForm
          event={event}
          onSubmit={onUpdateEvent}
          onCancel={() => {
            setDisplayOptionType("DELETE");
          }}
        />
      )}
    </>
  );
};
