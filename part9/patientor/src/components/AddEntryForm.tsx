import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { BaseEntry } from '../types';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: BaseEntryWithoutId) => void;
  onCancel: () => void;
}
export type BaseEntryWithoutId = Omit<BaseEntry, "id">;

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: ""
      }}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
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

export default AddEntryForm;