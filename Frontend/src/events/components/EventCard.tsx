import { Event } from "types";
import { useEvents } from "./EventProvider";
import { Button } from "shared/components";
import { deleteEvent } from "api/events";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { eventsDispatch } = useEvents();

  const onEventDelete = () => {
    deleteEvent(event._id)
      .then((res: any) => {
        eventsDispatch({ type: "delete", payload: { eventId: event._id } });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div data-testid={`event-item-${event._id}`}>
      <div className="card-body">
        <h4 className="card-title">{event.title}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{event.start_date}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{event.end_date}</h6>
        <p className="text-justify" style={{ fontSize: "14px" }}>
          {event.notes}
        </p>
        <Button onClick={onEventDelete}>Delete</Button>
      </div>
    </div>
  );
};
