import { useState } from "react";
import "./index.scss";

const BoxNumber = ({
  label,
  name,
  type,
  onChange,
  value,
  labelClassName,
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
          className={`number-input`} // Слід змінити або переробити
          step="any"
          onChange={onChange}
          value={value}
          onBlur={handleFocus}
          //   onFocus={() => name === "amount" && setFocused(true)}
          focused={focused.toString()}
          patternn={`^[0-9]+(\.[0-9]{1,3})?$`}
        />
        <div>
          {errorMessages.map((error, index) => (
            <div className="error__message" key={index}>
              {error}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoxNumber;
