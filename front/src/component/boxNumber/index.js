import { useState } from "react";
import "./index.scss";

const BoxNumber = ({
  label,
  name,
  type,
  onChange,
  value,
  id,
  errorMessages,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="number-box">
      <div className="number-card">
        <label htmlFor={name} className="number-title">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="number-input"
          step="any"
          onChange={onChange}
          value={value}
          onBlur={handleFocus}
          focused={focused.toString()}
          pattern="^([0-9]{1,7})?$"
        />
        <div>
          {errorMessages.map((error, index) => (
            <div className="number__message" key={index}>
              {error}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoxNumber;
