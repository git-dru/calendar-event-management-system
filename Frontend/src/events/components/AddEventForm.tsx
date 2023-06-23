import React, { useState } from "react";
import { InputField, Button, DateTimePicker } from "shared/components";
import moment, { Moment } from "moment";
import { toast } from "react-toastify";
interface AddEventFormProps {
  onSubmit: (
    data: Record<"title" | "start_date" | "end_date" | "notes", string>
  ) => void;
  onCancel: () => void;
}

export function AddEventForm({ onSubmit, onCancel }: AddEventFormProps) {
  // TODO: Implement form for adding a event
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Moment>(moment(new Date()));
  const [endDate, setEndDate] = useState<Moment>(moment(new Date()));
  const [notes, setNotes] = useState<string>("");

  const reset = () => {
    setStartDate(moment(new Date()));
    setTitle("");
    setEndDate(moment(new Date()));
    setNotes("");
    onCancel();
  };

  //validate
  const isValidated = (): boolean => {
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
