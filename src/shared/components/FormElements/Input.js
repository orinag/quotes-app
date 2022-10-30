import { useEffect, useReducer } from "react";
import "./Input.css";

const Input = (props) => {
  let element;
  if (props.element === "input") {
    element = (
      <input
        id={props.id}
        className={`"input"${!props.isValid && "invalid"}`}
        type={props.type || "text"}
        onChange={props.onChange}
        value={props.value}
        placeholder={
          props.isValid
            ? props.placeholder
            : `Your ${props.id} must not be empty!`
        }
      />
    );
  } else {
    element = (
      <textarea
        id={props.id}
        className={`"textarea"${!props.isValid && "invalid"}`}
        type={"text" || props.type}
        rows={props.rows || 3}
        value={props.value}
        onChange={props.onChange}
      />
    );
  }

  return (
    <div className={`form-control ${!props.isValid && "invalid"}`}>
      <label
        htmlFor={props.children}
        className={`label ${!props.isValid && "invalid"}`}
      >
        {props.children}
      </label>

      {element}
    </div>
  );
};

export default Input;
