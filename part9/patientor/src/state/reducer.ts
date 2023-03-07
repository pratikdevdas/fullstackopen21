import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

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
  }
  | {
    type: "SET_DIAGNOSIS_LIST",
    payload: Diagnosis[]
  } |
  {
    type: "ADD_ENTRY",
    payload: Entry
  }
  ;


export const reducer = (state: State, action: Action): State => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "SET_PATIENT_LIST":
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
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => (
              { ...memo, [diagnose.code]: diagnose }
            ),
            {}
          ),
          ...state.diagnosis

        }
      };

    case "ADD_PATIENT":
      console.log(action.payload.id);
      console.log(action.payload);
      console.log(state);
      return {
        ...state,
        patients: {
          ...state.patients,
          // new patient id is getting pushed
          [action.payload.id]: action.payload
        }
      };
    case "SINGLE_PATIENT":
      return {
        ...state,
      };
    case "ADD_ENTRY":
      console.log(action.payload.id);
      console.log(action.payload);
      console.log(state);
      return {
        ...state,
        patients: {
          ...state.patients,
          entries: {
            ...state.patients.entries,
            [action.payload.id]: action.payload
          }
        }
      };
    default:
      return state;
  }
};