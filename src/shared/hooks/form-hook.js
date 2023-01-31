import { useCallback, useReducer } from "react";
const formReducer = (state, action) => {
  let formIsValid = true;

  switch (action.type) {
    case "CHANGE":
      for (let inputId in state.inputs) {
        if (inputId === action.id) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    case "SET-FORM":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };

    default:
      return state;
  }
};
const useForm = (initialInputs, initialFormIsValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormIsValid,
  });

  const inputHandler = useCallback((id, value, isValid) => {

    dispatch({ type: "CHANGE", id, value, isValid });
  }, []);
  const setFormHandler = useCallback((inputsData, formValidity) => {
    dispatch({
      type: "SET_FORM",
      inputs: inputsData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormHandler];
};
export default useForm;
