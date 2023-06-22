import React, { useState } from "react";
import { InputField, Button, DateTimePicker } from "shared/components";

interface AddEventFormProps {
  onSubmit: (
    data: Record<"title" | "startDate" | "endDate" | "notes", string>
  ) => void;
  onCancel: () => void;
}

export function AddEventForm({ onSubmit, onCancel }: AddEventFormProps) {
  // TODO: Implement form for adding a event
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState<string>("");

  const reset = () => {
    setStartDate(new Date());
    setTitle("");
    setEndDate(new Date());
    setNotes("");
    onCancel();
  };

  return (
    <form className="p-4 ">
      {/* TODO: Add code to make form actions work */}
      <InputField name="Title" value={title} setter={setTitle} />
      <DateTimePicker
        name="Start Date"
        date={startDate}
        setDate={setStartDate}
      />
      <DateTimePicker name="End Date" date={endDate} setDate={setEndDate} />
      <InputField name="notes" value={notes} setter={setNotes} />
      <div className="text-center">
        <Button
          onClick={() => {
            if (startDate && title && endDate && notes) {
              onSubmit({
                startDate: new Date(startDate).toISOString(),
                title,
                endDate: new Date(startDate).toISOString(),
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
