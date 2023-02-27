import { toNewPatientPost, Gender, DiagnosisInfo, BaseEntryWithoutId, EntryWithoutId, HealthCheckRating } from './types';
/* The function isString is a so-called type guard. That means it is a function which returns a boolean and which has a type predicate as the return type. In our case, the type predicate is:  test is string*/

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

// typeguard
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseEntryDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseBirthYear = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

// typeguard
/* One thing to notice here is that we have changed the parameter type to any. If it were string, the includes check would not compile. This makes sense also if you consider the reusability of the function. By allowing any as a parameter, the function can be used with confidence knowing that whatever we might feed to it, the function always tells us whether the variable is a valid weather or not. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patientTypeguard = (object: any): toNewPatientPost => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    const newPost: toNewPatientPost = {
        name: parseName(object.name),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        dateOfBirth: parseBirthYear(object.dateOfBirth),
        entries: [],
    };
    return newPost;
};


// Typeguards for entries
const isNumber = (value: unknown): value is number => {
    return typeof value === 'number';
};
const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};
const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing criteria');
    }
    return criteria;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosisInfo['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<DiagnosisInfo['code']>;
    }

    return object.diagnosisCodes as Array<DiagnosisInfo['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v).includes(param);
};

const parseHealthCheck = (health: unknown): HealthCheckRating => {
    if (!health || !isNumber(health) || !isHealthCheckRating(health)) {
        throw new Error('Incorrect or Health Check missing data');
    }
    return health;
};

const parseEmployeeName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing Employee name');
    }
    return name;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const entryTypeguard = (object: any): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    const baseEntry: BaseEntryWithoutId = {
        date: parseEntryDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
    switch (object.type) {
    case 'Hospital':
        return {
            ...baseEntry, type: 'Hospital', discharge: {
                date: parseEntryDate(object.discharge.date),
                criteria: parseCriteria(object.discharge.criteria)
            }
        };
    case 'HealthCheck':
        return {
            ...baseEntry, type: 'HealthCheck',
            healthCheckRating: parseHealthCheck(object.healthCheckRating)
        };
    case 'OccupationalHealthcare':
        if (object.sickLeave) {
            return {
                ...baseEntry, type: 'OccupationalHealthcare',
                employerName: parseEmployeeName(object.employerName),
                sickLeave: {
                    startDate: parseEntryDate(object.sickLeave.startDate),
                    endDate: parseEntryDate(object.sickLeave.startDate)
                }
            };
        } else {
            return {
                ...baseEntry, type: 'OccupationalHealthcare',
                employerName: parseEmployeeName(object.employerName),
            };
        };
    default:
        throw new Error('Invalid or Missing Type');
    }
};