import React, { useState } from "react";

import { InputField, Button } from "shared/components";

interface AddEventFormProps {
  onSubmit: (
    data: Record<"title" | "startDate" | "endDate" | "notes", string>
  ) => void;
  onCancel: () => void;
}

export function AddEventForm({ onSubmit, onCancel }: AddEventFormProps) {
  // TODO: Implement form for adding a event
  const [title, setTitle] = useState<string>("");
  const [startDate, setStateDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const reset = () => {
    setStateDate("");
    setTitle("");
    setEndDate("");
    setNotes("");
    onCancel();
  };

  return (
    <form className="p-4 ">
      {/* TODO: Add code to make form actions work */}
      <InputField name="Title" value={title} setter={setTitle} />
      <InputField name="Start" value={startDate} setter={setStateDate} />
      <InputField name="endDate" value={endDate} setter={setEndDate} />
      <InputField name="notes" value={notes} setter={setNotes} />
      <div className="text-center">
        <Button
          onClick={() => {
            if (startDate && title && endDate && notes) {
              onSubmit({
                startDate,
                title,
                endDate,
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
