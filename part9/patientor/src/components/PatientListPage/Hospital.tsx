import { HospitalEntry } from "../../types";

type HospitalProps = {
  entry : HospitalEntry
};

const Hospital = ({ entry } : HospitalProps) => {

  return (
    <div>
      <div>date: {entry.discharge.date}</div>
      <div>criteria: {entry.discharge.criteria}</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default Hospital;