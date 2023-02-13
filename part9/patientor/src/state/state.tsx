import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "../types";
import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnosis: { [code: string]: Diagnosis }
};

const initialState: State = {
  patients: {},
  diagnosis: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (data:Patient[]):Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data
  };
};

export const setDiagnosisList = (data:Diagnosis[]):Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: data
  };
};

export const addPatient = (data:Patient):Action => {
  return {
    type: "ADD_PATIENT",
    payload: data
  };
};

export const singlePatient = (data:Patient):Action => {
  return {
    type: "SINGLE_PATIENT",
    payload: data
  };
};
