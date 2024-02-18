import { OccupationalHealthcareEntry } from "../../types";

type OccupationalHealthcareProps = {
  entry : OccupationalHealthcareEntry
};

const OccupationalHealthcare = ({ entry }: OccupationalHealthcareProps) => {

  return (
    <div>
      <div>employerName: {entry.employerName}</div>
      {entry.sickLeave?.startDate && <div>startDate: {entry.sickLeave?.startDate}</div>}
      {entry.sickLeave?.endDate && <div>endDate: {entry.sickLeave?.endDate}</div>}
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcare;