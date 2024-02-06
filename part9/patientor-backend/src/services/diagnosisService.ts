import { DiagnosisEntry } from '../types';
import diagnosis from '../../data/diagnoses';

const getDiagnosis = (): DiagnosisEntry [] => {
  return diagnosis;
};

export default { getDiagnosis };