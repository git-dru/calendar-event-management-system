import { Event } from "types";
import { useEvents } from "./EventProvider";
import { Button } from "shared/components";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { eventsDispatch } = useEvents();
  console.log(event);
  // TODO: implement required functionality

  return (
    <div data-testid={`event-item-${event.id}`}>
      <div className="card-body">
        <h4 className="card-title">{event.title}</h4>
        <h6 className="card-subtitle mb-2 text-muted">{event.startDate}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{event.endDate}</h6>
        <p className="text-justify" style={{ fontSize: "14px" }}>
          {event.notes}
        </p>
        <Button
          onClick={() => {
            eventsDispatch({ type: "delete", payload: { eventId: event.id } });
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
