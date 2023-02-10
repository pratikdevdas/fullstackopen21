export interface DiagnosisInfo {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender{
        Male = 'male',
        Female = 'female',
        Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface PatientInfo {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type HidePatientSsn = Omit<PatientInfo, 'ssn' | 'entries'>;
export type toNewPatientPost = Omit<PatientInfo, 'id'>;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosisInfo['code']>;
  }

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
  }
  interface HealthCheckEntry extends BaseEntry{
    type: 'HealthCheck';
    healthCheckRating : HealthCheckRating;
  }
  interface Discharge{
    date: string,
    criteria: string
  }
  interface HospitalEntry extends BaseEntry{
    type: 'Hospital';
    discharge : Discharge;
  }

  interface SickLeave{
    startDate: string;
    endDate: string;
  }
  interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    employerName: string;
    sickLeave?: SickLeave
  }
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;