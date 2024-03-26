import { useState } from "react";
import "./index.scss";

const togglePassword = (target) => {
  target.toggleAttribute("show");

  const input = target.previousElementSibling;

  const type = input.getAttribute("type");

  if (type === "password") {
    input.setAttribute("type", "text");
  } else {
    input.setAttribute("type", "password");
  }
};

const BoxField = ({
  label,
  name,
  onChange,
  errorMessage,
  value,
  VP,
  VE,
  type,
  placeholder,
  emailform,
  pattern,
}) => {
  const [focused, setFocused] = useState(false);

  const handleToggleClick = (event) => {
    togglePassword(event.target);
  };

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className={`field ${emailform ? "" : "field__password"}`}>
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <div className="field__wrapper">
        {emailform ? (
          <input
            placeholder={placeholder}
            value={value}
            name={name}
            type={type}
            className="field__input"
            onChange={onChange}
            onBlur={handleFocus}
            focused={focused.toString()}
            pattern={`^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$`}
          />
        ) : (
          <>
            <input
              placeholder={placeholder}
              value={value}
              name={name}
              type={type}
              className="field__input"
              onChange={onChange}
              onBlur={handleFocus}
              focused={focused.toString()}
              pattern={`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{1,20}$`}
            />
            <span onClick={handleToggleClick} className="field__icon"></span>
          </>
        )}

        <span className="field__span">{errorMessage}</span>
      </div>
    </div>
  );
};

export default BoxField;
