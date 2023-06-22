import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";

interface DateTimePickerProps {
  name: string;
  date?: Date;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DateTimePicker({ name, date, setDate }: DateTimePickerProps) {
  const handleDateChange = (selectedDate: Date | null) => {
    if (setDate) {
      setDate(selectedDate || undefined);
    }
  };
  return (
    <div className="form-group">
      <label className="text-capitalize px-2" htmlFor={name}>
        {name}
      </label>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        minDate={new Date()}
        dateFormat="Pp"
        showTimeSelect
        timeFormat="p"
      />
    </div>
  );
}
