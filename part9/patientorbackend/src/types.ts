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
export interface Entry{

}

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