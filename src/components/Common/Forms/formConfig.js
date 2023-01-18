import React from "react";
import Input from "../Input";

import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
  passwordMatchRule
} from "./inputValidationRules";

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
function createFormFieldConfig(label, name, type, defaultValue = "") {
  return {
    renderInput: (handleChange, handleDateChange, value, isValid, error, key) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          errorMessage={error}
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false
  };
}

export const signinForm = {
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      requiredRule("Username")
    ]
  },
  password: {
    ...createFormFieldConfig("Password", "password", "password"),
    validationRules: [
      requiredRule("Password")
    ]
  }
};

export const signupForm = {
  name: {
    ...createFormFieldConfig("Full Name", "name", "text"),
    validationRules: [
      requiredRule("Name"),
      minLengthRule("Name", 3),
      maxLengthRule("Name", 25)
    ]
  },
  email: {
    ...createFormFieldConfig("Email", "email", "email"),
    validationRules: [
      requiredRule("Email"),
      minLengthRule("Email", 10),
      maxLengthRule("Email", 25)
    ]
  },
  password: {
    ...createFormFieldConfig("Password", "password", "password"),
    validationRules: [
      requiredRule("Password"),
      minLengthRule("Password", 6),
      maxLengthRule("Password", 20)
    ]
  },
  confirmPassword: {
    ...createFormFieldConfig("Confirm Password", "confirmPassword", "password"),
    validationRules: [passwordMatchRule()]
  }
};


export const eventForm = (defVal = {}) => {
  return {
    date: {
      ...createFormFieldConfig("Date", "date", "date",  Date.parse(defVal.date)),
      validationRules: [
        requiredRule("Date")
      ]
    },
    name: {
      ...createFormFieldConfig("Name", "name", "text", defVal.name),
      validationRules: [
        requiredRule("name")
      ]
    },
    venue: {
      ...createFormFieldConfig("Venue", "venue", "text", defVal.venue),
      validationRules: [
        requiredRule("Venue")
      ]
    },
    time: {
      ...createFormFieldConfig("Time", "time", "time", Date.parse(`2000/01/01 ${defVal.time}`)),
      validationRules: [
        requiredRule("Time")
      ]
    },
    performer: {
      ...createFormFieldConfig("Performer", "performer", "text", defVal.performer),
      validationRules: [
        requiredRule("Performer")
      ]
    },
    image: {
      ...createFormFieldConfig("Image URL", "image", "URL", defVal.image),
      validationRules: [
        requiredRule("Image")
      ]
    },
    description: {
      ...createFormFieldConfig("Description", "description", "textarea", defVal.description),
      validationRules: [
        requiredRule("Description")
      ]
    },
  };
}