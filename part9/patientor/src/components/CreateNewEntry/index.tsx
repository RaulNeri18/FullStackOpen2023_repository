import { Button } from "@mui/material";
import './css/index.css';
import { useState } from "react";
import FormOccupational from "./FormOccupational";
import FormHospital from "./FormHospital";
import FormHealthCheck from "./FormHealthCheck";
import { Entry, EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import axios from 'axios';

type Props = {
  patientId: string,
  entries: Entry[],
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
};

const NewEntry = ({ patientId, entries, setEntries, setErrorMessage } : Props) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedEntryType, setSelectedEntryType] = useState(''); 

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createDiagnosesEntry(patientId, values); 
      setEntries(entries.concat(entry));
    } catch (e: unknown) {      
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setErrorMessage(message);
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        } else {
          setErrorMessage("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setErrorMessage("Unknown error");
      }
    }
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        style={{ margin: "10px 0" }}
        type="button"
        onClick={() => setVisibility(true)}
      >
        New Entry
      </Button>

      {visibility && 
        <div>
          <div>
            <label>
              <input type="radio" name="typeEntry" value="healthcheck" onChange={({target}) => setSelectedEntryType(target.value)}/>HealthCheck
            </label>
            <label>
              <input type="radio" name="typeEntry" value="hospital" onChange={({target}) => setSelectedEntryType(target.value)} />Hospital
            </label>
            <label>
              <input type="radio" name="typeEntry" value="occupational" onChange={({target}) => setSelectedEntryType(target.value)} />Occupational Healthcare
            </label>

            {selectedEntryType === 'healthcheck' && <FormHealthCheck setVisibility={setVisibility} addEntry={submitEntry} />}
            {selectedEntryType === 'hospital' && <FormHospital setVisibility={setVisibility} addEntry={submitEntry} />}
            {selectedEntryType === 'occupational' && <FormOccupational setVisibility={setVisibility} addEntry={submitEntry} />}
          </div>
        </div>
      }
    </>
  );
};

export default NewEntry;