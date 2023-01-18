import React from "react";
import DatePicker from 'react-datepicker';
import classes from "./Input.module.css";
import "react-datepicker/dist/react-datepicker.css";

function InputField(props) {
  const {
    label,
    type,
    name,
    handleChange,
    handleDateChange,
    errorMessage,
    isValid,
    value
  } = props;

  return (
    <div className={classes.inputContainer}>
      <label>{label}</label>

      {type === "time" && <DatePicker
        selected={value}
        onChange={(value) => {handleDateChange(name,value)} }
        name={name}
        value={value}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />}
      {type === "date" && <DatePicker
        selected={value}
        onChange={(value) => {handleDateChange(name,value)} }
        dateFormat="yyyy/MM/dd"
        name={name}
        value={value}
      />}
      {type === "textarea" && <textarea rows={3} name={name} value={value} onChange={handleChange} />}
      {type !== "textarea" && type !== "date" && type !== "time" && <input type={type} name={name} value={value} onChange={handleChange} />}
      {errorMessage && !isValid && (
        <span className={classes.error}>{errorMessage}</span>
      )}
    </div>
  );
}

export default React.memo(InputField);
