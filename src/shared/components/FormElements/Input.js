import { useEffect, useReducer } from "react";
import "./Input.css";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.value, isValid: action.isValid };
    case "RESET":
      return { ...state, value: "", isValid: true };
    default:
      return { ...state, value: action.value, isValid: action.valid };
  }
};
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: true,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    const changeVal = event.target.value;
    if (changeVal.length > 0)
      dispatch({ type: "CHANGE", value: changeVal, isValid: true });
    else dispatch({ type: "CHANGE", value: changeVal, isValid: false });
  };
  let element;
  if (props.element === "input") {
    element = (
      <input
        id={props.id}
        className={`"input"${!inputState.isValid && "invalid"}`}
        type={props.type || "text"}
        onChange={changeHandler}
        value={inputState.value}
        placeholder={
          inputState.isValid
            ? props.placeholder
            : `Your ${props.id} must not be empty!`
        }
      />
    );
  } else {
    element = (
      <textarea
        id={props.id}
        className={`"textarea"${!inputState.isValid && "invalid"}`}
        type={"text" || props.type}
        rows={props.rows || 3}
        value={inputState.value}
        onChange={changeHandler}
      />
    );
  }

  return (
    <div className={`form-control ${!inputState.isValid && "invalid"}`}>
      <label
        htmlFor={props.children}
        className={`label ${!inputState.isValid && "invalid"}`}
      >
        {props.children}
      </label>

      {element}
    </div>
  );
};

export default Input;
