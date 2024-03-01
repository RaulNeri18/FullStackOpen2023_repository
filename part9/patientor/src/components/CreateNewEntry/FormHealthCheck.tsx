import { Button } from "@mui/material";
import { SyntheticEvent, useState } from "react";
//import { EntryFormValues, HealthCheckRating } from "../../types";
import { EntryFormValues } from "../../types";

interface Props {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  addEntry: (values: EntryFormValues) => void;
}

const FormHealthCheck = ({ setVisibility, addEntry } : Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosiscode, setDiagnosiscode] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('0');

  const onCreate = (event: SyntheticEvent) => {
    event.preventDefault();
    
    //if (!Object.values(HealthCheckRating).includes(Number(healthCheckRating))) {
      //return null;
    //}

    const diagnoses: string[] = diagnosiscode.split(',');

    addEntry({ type: "HealthCheck", description, date, specialist,
      diagnosisCodes: diagnoses,  
      healthCheckRating: Number(healthCheckRating) });
  };

  return (
    <>
      <form className="entry-form">
        <p>New HealthCheck entry</p>
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
          <label htmlFor="rating">Healthcheck rating</label>
        </div>
        <div>
          <input type="number" id="rating" value={healthCheckRating} onChange={(event) => setHealthCheckRating(event.target.value)} />
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

export default FormHealthCheck;