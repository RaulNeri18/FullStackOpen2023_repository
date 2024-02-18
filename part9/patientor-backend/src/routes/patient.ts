import express from 'express';
import patientService from '../services/patientService';
import { toDataEntry, toPatientDataEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const idPatient = req.params.id;

  res.json(patientService.getPatientsById(idPatient));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toPatientDataEntry(req.body);
    const addedPatient = patientService.insertPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toDataEntry(req.body);
    
    const addedEntry = patientService.insertEntryOfPatient(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;