/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entry, EntryWithoutId, NewPatientEntry, PatientEntry } from "../types";
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[]  => {
  return patients;
};

const getPatientsById = (id: string): PatientEntry | undefined => {
  return patients.find(patient => patient.id === id);
};

const insertPatient = (newPatient: NewPatientEntry): PatientEntry  => {
  const id = uuid();
  const newPatientAdded = { id, ...newPatient };
  patients.push(newPatientAdded);
  return newPatientAdded;
};

const insertEntryOfPatient = (id: string, newEntry: EntryWithoutId): Entry  => {
  const entryId = uuid();
  const patient = patients.find(p => p.id === id);
  
  if (!patient) throw new Error('Patient has not found');

  const newEntryAdded = { id: entryId, ...newEntry };
  patient.entries.push(newEntryAdded);

  return newEntryAdded;
};

export default { getPatients, getPatientsById, insertPatient, insertEntryOfPatient };