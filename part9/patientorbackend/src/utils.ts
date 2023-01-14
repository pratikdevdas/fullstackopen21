import { toNewPatientPost, Gender } from './types';
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
const toNewPatientPost = (object: any): toNewPatientPost => {
    const newPost: toNewPatientPost = {
        name: parseName(object.name),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        dateOfBirth: parseBirthYear(object.dateOfBirth),
    };
    return newPost;
};

export default toNewPatientPost;