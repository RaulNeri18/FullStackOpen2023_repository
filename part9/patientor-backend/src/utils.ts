import { DiagnosisEntry, Discharge, EntryWithoutId, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewPatientEntry, OccupationalHealthcareEntry, SickLeave } from "./types";

export const toPatientDataEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object &&
      'gender' in object && 'occupation' in object)  {
    const patient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    return patient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toDataEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 
      'discharge' in object)  {
    const entry: Omit<HospitalEntry, 'id'> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: 'Hospital',      
      discharge: parseDischarge(object.discharge)//{ date: 'string', criteria: 'string' } 
    };
    return entry;
  }

  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 
      'employerName' in object && 'sickLeave' in object)  {
    const entry: Omit<OccupationalHealthcareEntry, "id"> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: 'OccupationalHealthcare',
      employerName: parseEmployerName(object.employerName),
      sickLeave: parseSickLeave(object.sickLeave) //{ startDate: 'string', endDate: 'string' } 
    };
    return entry;
  }
  
  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 
      'healthCheckRating' in object)  {    
    const entry: Omit<HealthCheckEntry, "id"> = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return entry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

/************************/

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isEmpty = (text: string): boolean => {
  return text.length > 0;
};

const isNumber = (value: unknown): value is number => {
  return !isNaN(Number(value));
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseName = (comment: unknown): string => {
  if (!isString(comment) || !isEmpty(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isEmpty(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || !isEmpty(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isEmpty(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

/************************/

const isDischargeDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing Discharge date');
  }

  return date;
};

const isDischargeCriteria = (criteria: unknown): string => {
  if (!isString(criteria) || !isEmpty(criteria)) {
    throw new Error('Incorrect or missing Discharge criteria');
  }

  return criteria;
};

const isSickLeaveStartDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing SickLeave StartDate');
  }

  return date;
};

const isSickLeaveEndDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing SickLeave EndDate');
  }

  return date;
};

const isHealthCheckRating = (healthCheckRate: number): healthCheckRate is number => {
  return Object.values(HealthCheckRating).map(v => Number(v)).includes(healthCheckRate);
};

const isDischarge = (discharge: object): discharge is Discharge => {
  return (
    ('date' in discharge) && ('criteria' in discharge) &&
    (typeof isDischargeDate(discharge.date) === 'string' &&
    typeof isDischargeCriteria(discharge.criteria) === 'string')
  );
};

const isSickLeave = (sickLeave: object): sickLeave is SickLeave => {
  return (
    ('startDate' in sickLeave) && ('endDate' in sickLeave) &&
    (typeof isSickLeaveStartDate(sickLeave.startDate) === 'string' &&
    typeof isSickLeaveEndDate(sickLeave.endDate) === 'string')
  );
};

const isDiagnosesCode = (object: unknown): object is Array<DiagnosisEntry['code']> => {
  return Array.isArray(object) && object.every(code => typeof code === 'string' && code.length > 0);
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || !isEmpty(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist) || !isEmpty(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName) || !isEmpty(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }

  return employerName;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosisEntry['code']> =>  {  
  if (!isDiagnosesCode(object)) {
    throw new Error('Incorrect or missing DiagnosesCode');
  }

  return object;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object' || !isDischarge(object)) {
    throw new Error('Incorrect or missing discharge');
  }

  return object;
};

const parseHealthCheckRating = (healthCheckRate: unknown): number => {
  //console.log('healthCheckRate', healthCheckRate);
  
  if (!isNumber(healthCheckRate)) {
    throw new Error('Incorrect or missing healthCheckRate');
  }

  if (!isHealthCheckRating(healthCheckRate)) {
    throw new Error(`Value of healthCheckRating incorrect: ${healthCheckRate}`); 
  }

  return Number(healthCheckRate);
};

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (!object || typeof object !== 'object') {
    return undefined;
  }

  if (!isSickLeave(object)) throw new Error('Incorrect or missing SickLeave');

  return object;
};