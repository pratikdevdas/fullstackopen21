import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { SelectField, TextField, DiagnosisSelection, EntryTypeOption, HealthCheckOption } from "../AddPatientModal/FormField";
import { Entry, EntryTypes, HealthCheckRating } from '../types';
import { useStateValue } from '../state';
interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const entryOptions: EntryTypeOption[] = [
  { value: EntryTypes.OccupationalHealthcare, label: "OccupationHealthCare" },
  { value: EntryTypes.Hospital, label: "Hospital" },
  { value: EntryTypes.HealthCheck, label: "HealthCheck" },
];


const healthOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

export type EntryWithoutId = Omit<Entry, "id">;

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "Hospital",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        console.log(values);
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        console.log(values);
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            /><Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            /><Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <SelectField label="Entry" name="type" options={entryOptions} />
            <EntryInputs type={values.type} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const EntryInputs: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "Hospital":
      return <Hospital />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare />;
    case "HealthCheck":
      return <HealthCheck />;
    default:
      return null;
  }
};

const Hospital = () => {
  return <>
    <Field
      label="DischargeDate"
      placeholder="DischargeDate"
      name="discharge.date"
      component={TextField}
    />
    <Field
      label="Criteria"
      placeholder="Criteria"
      name="discharge.criteria"
      component={TextField}
    />
  </>;
};

const OccupationalHealthcare = () => {
  return <>
    <Field
      label="Employer Name"
      placeholder="Employer Name"
      name="employerName"
      component={TextField}
    />
  </>;
};

const HealthCheck = () => {
  return <>
      <SelectField label="Health Check Rating" name="healthCheckRating" options={healthOptions} /></>;
};


export default AddEntryForm;