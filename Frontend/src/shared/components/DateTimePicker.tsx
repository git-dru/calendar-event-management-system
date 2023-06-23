import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { Moment } from "moment";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";

interface DateTimePickerProps {
  name: string;
  date?: Moment;
  setDate?: React.Dispatch<React.SetStateAction<Moment>>;
}

export function DateTimePicker({ name, date, setDate }: DateTimePickerProps) {
  const handleDateChange = (selectedDate: Date | null) => {
    if (setDate && selectedDate) {
      setDate(moment(selectedDate));
    }
  };

  return (
    <div className="form-group">
      <label className="text-capitalize px-2" htmlFor={name}>
        {name}
      </label>
      <DatePicker
        selected={date ? date.toDate() : null}
        onChange={handleDateChange}
        minDate={new Date()}
        dateFormat="Pp"
        showTimeSelect
        timeFormat="p"
        showYearDropdown
        scrollableMonthYearDropdown
      />
    </div>
  );
}
