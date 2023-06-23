import React, { useState } from "react";
import { InputField, Button, DateTimePicker } from "shared/components";
import moment, { Moment } from "moment";
import { toast } from "react-toastify";

export type EventFormProps = {
  _id?: string;
  title: string;
  start_date: string;
  end_date: string;
  notes: string;
};

interface AddEventFormProps {
  event?: EventFormProps;
  onSubmit: (data: EventFormProps) => void;
  onCancel: () => void;
}

export function AddEventForm({ event, onSubmit, onCancel }: AddEventFormProps) {
  // TODO: Implement form for adding a event
  const [title, setTitle] = useState<string>(event ? event.title : "");
  const [startDate, setStartDate] = useState<Moment>(
    event ? moment(event.start_date) : moment(new Date())
  );
  const [endDate, setEndDate] = useState<Moment>(
    event ? moment(event.end_date) : moment(new Date()).add(30, "minutes")
  );
  const [notes, setNotes] = useState<string>(event ? event.notes : "");

  const reset = () => {
    setStartDate(moment(new Date()));
    setTitle("");
    setEndDate(moment(new Date()).add(30, "minutes"));
    setNotes("");
    onCancel();
  };

  //validate
  const isValidated = (): boolean => {
    if (
      title === event?.title &&
      notes === event?.notes &&
      startDate.isSame(moment(event.start_date)) &&
      endDate.isSame(moment(event.end_date))
    ) {
      toast.error("No Value Updated");
      return false;
    }
    // Validate start date
    if (!startDate.isValid()) {
      toast.error("Please input a valid start date!");
      return false;
    }

    // Validate end date
    if (!endDate.isValid()) {
      toast.error("Please input a valid end date!");
      return false;
    }

    // Check if end date is after start date
    if (!endDate.isAfter(startDate)) {
      toast.error("End date must be after start date!");
      return false;
    }

    // Check if title and notes are empty
    if (title.trim() === "" || notes.trim() === "") {
      toast.error("Please input all required data");
      return false;
    }

    return true;
  };

  return (
    <form className="p-4 ">
      {/* TODO: Add code to make form actions work */}
      <InputField name="Title" value={title} setter={setTitle} />
      <DateTimePicker
        name="Start Date"
        date={moment(startDate)}
        setDate={setStartDate}
      />
      <DateTimePicker name="End Date" date={endDate} setDate={setEndDate} />
      <InputField name="notes" value={notes} setter={setNotes} />
      <div className="text-center">
        <Button
          onClick={() => {
            if (isValidated()) {
              onSubmit({
                _id: event?._id,
                start_date: startDate.format("MMMM Do YYYY, h:mm:ss a"),
                title,
                end_date: endDate.format("MMMM Do YYYY, h:mm:ss a"),
                notes,
              });
              reset();
            }
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            reset();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
