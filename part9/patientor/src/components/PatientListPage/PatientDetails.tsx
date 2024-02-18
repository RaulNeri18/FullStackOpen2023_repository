import { useParams } from "react-router-dom";
import { Diagnosis, Gender, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from "./EntryDetails";

type PatientDetailsProps = {
  patients : Patient[],
  diagnosis : Diagnosis[],
};

const PatientDetails = ({ patients, diagnosis} : PatientDetailsProps) => {
  const id = useParams().id;
  const patient = patients.find(n => n.id === id);

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

      <h3>entries</h3>
      <div>{patient.entries.map(entry => 
          <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />
        )}
      </div>
    </div>
  );
};
  
export default PatientDetails;