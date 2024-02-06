/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NewPatientEntry, PatientEntry } from "../types";
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[]  => {
  return patients;
};

const insertPatient = (newPatient : NewPatientEntry): PatientEntry  => {
  const id = uuid() as string;
  const newPatientAdded = { id, ...newPatient };
  patients.push(newPatientAdded);
  return newPatientAdded;
};

export default { getPatients, insertPatient };