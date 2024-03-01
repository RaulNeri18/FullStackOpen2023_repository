import { Button } from "@mui/material";
import { EntryFormValues } from "../../types";
import { SyntheticEvent, useState } from "react";

interface Props {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  addEntry: (values: EntryFormValues) => void;
}

const FormOccupational = ({ setVisibility, addEntry } : Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosiscode, setDiagnosiscode] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onCreate = (event: SyntheticEvent) => {
    event.preventDefault();

    const diagnoses: string[] = diagnosiscode.split(',');

    addEntry({ type: "OccupationalHealthcare", description, date, specialist,
      diagnosisCodes: diagnoses, employerName, 
      sickLeave: { startDate, endDate } });
  };

  return (
    <>
        <form className="entry-form">
        <p>New OccupationalHealthCare entry</p>
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
          <label htmlFor="employerName">Employer Name</label>
        </div>
        <div>
          <input type="text" id="employerName" value={employerName} onChange={(event) => setEmployerName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="sickLeave">Sick Leave</label>
        </div>
        <div className="flex">
          <div className="mid-div">
            <label>Start Date: 
              <input type="date" id="startDate" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            </label>
          </div>
          <div className="mid-div">
            <label>End Date: 
              <input type="date" id="endDate" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
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

export default FormOccupational;