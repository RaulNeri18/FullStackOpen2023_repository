import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Gender, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "./EntryDetails";
import NewEntry from '../CreateNewEntry/index';
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';

type PatientDetailsProps = {
  patients : Patient[],
  diagnosis : Diagnosis[],
};

const PatientDetails = ({ patients, diagnosis} : PatientDetailsProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const id = useParams().id as string;
  const patient = patients.find(n => n.id === id);

  useEffect(() => {
    if (patient) {
      setEntries(patient.entries);
    }
  }, [patient]);

  if (!patient) return null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>{patient.name}</h2>
        {(patient.gender === Gender.Male) ? <MaleIcon /> : 
         (patient.gender === Gender.Female) ? <FemaleIcon /> : <></>}
      </div>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <NewEntry patientId={id} entries={entries} setEntries={setEntries} setErrorMessage={setErrorMessage}></NewEntry>

      <h3>entries</h3>
      <div>{entries.map(entry => 
          <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />
        )}
      </div>
    </div>
  );
};
  
export default PatientDetails;