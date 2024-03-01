import { Button } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues } from "../../types";

interface Props {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  addEntry: (values: EntryFormValues) => void;
}

const FormHospital = ({ setVisibility, addEntry } : Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosiscode, setDiagnosiscode] = useState('');
  const [dateDischarge, setDateDischarge] = useState('');
  const [criteriaDischarge, setCriteriaDischarge] = useState('');

  const onCreate = (event: SyntheticEvent) => {
    event.preventDefault();

    const diagnoses: string[] = diagnosiscode.split(',');

    addEntry({ type: "Hospital", description, date, specialist,
      diagnosisCodes: diagnoses,  
      discharge: { date: dateDischarge, criteria: criteriaDischarge} });
  };

  return (
    <>
        <form className="entry-form">
        <p>New Hospital entry</p>
        <div>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <input type="text" id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
        </div>
        <div>
          <label htmlFor="date">Date</label>
        </div>
        <div>
        <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          <label htmlFor="specialist">Specialist</label>
        </div>
        <div>
        <input type="text" id="specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)} />
        </div>
        <div>
          <label htmlFor="diagnosiscode">Diagnosis code</label>
        </div>
        <div>
        <input type="text" id="diagnosiscode" value={diagnosiscode} onChange={(event) => setDiagnosiscode(event.target.value)} />
        </div>

        <div>
          <label htmlFor="discharge">Discharge</label>
        </div>
        <div className="flex">
          <div className="mid-div">
            <label>Date: 
              <input type="date" id="dateDischarge" value={dateDischarge} onChange={(event) => setDateDischarge(event.target.value)} />
            </label>
          </div>
          <div className="mid-div">
            <label>Criteria: 
              <input type="text" id="criteriaDischarge" value={criteriaDischarge} onChange={(event) => setCriteriaDischarge(event.target.value)} />
            </label>
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <Button
              color="error"
              variant="contained"
              style={{ margin: "10px 0" }}
              type="button"
              onClick={() => setVisibility(false)}
            >
              Cancel
            </Button>

            <Button
              color="primary"
              variant="contained"
              style={{ margin: "10px 0" }}
              type="button"
              onClick={onCreate}
            >
              Add
            </Button>
        </div>
      </form>
    </>
  );
};

export default FormHospital;