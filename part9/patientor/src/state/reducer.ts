import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SINGLE_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  console.log(action);
  switch (action.type) {
    case "SET_PATIENT_LIST":
      console.log(action.payload);
      console.log();
      console.log(action.payload.reduce(
        (memo, patient) => (
          { ...memo, [patient.id]: patient }
        ),
        {}
      ));
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => (
              { ...memo, [patient.id]: patient }
            ),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          // new patient id is getting pushed
          [action.payload.id]: action.payload
        }
      };
    case "SINGLE_PATIENT":
      console.log(action.payload);
      console.log({
        ...state,
        patients: {
          ...state.patients,
        }
      });
      return {
        ...state,
      }
        ;
    default:
      return state;
  }
};
