import { Diagnosis, Entry } from "../../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

type EntryDetailsProps = {
  entry : Entry,
  diagnosis : Diagnosis[],
};

const EntryDetails = ({ entry, diagnosis }: EntryDetailsProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const entryType: React.FC<{ entry: Entry }> = ( { entry }) => {
    switch (entry.type) {
      case 'Hospital': return <Hospital entry={entry} />;
      case 'HealthCheck': return <HealthCheck entry={entry} />;
      case 'OccupationalHealthcare': return <OccupationalHealthcare entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const EntryStyle = {
    border: '2px solid black',
    borderRadius: '5px',
    padding: '5px'
  };

  return (
    <div style={EntryStyle}>
      <div key={entry.id}>
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      <ul>{entry.diagnosisCodes?.map(code => 
            <li key={code}>{code} {diagnosis.find(d => d.code === code)?.name}</li>
          )}
      </ul>

      {entryType({ entry })}
      </div>
    </div>
  );
};

export default EntryDetails;