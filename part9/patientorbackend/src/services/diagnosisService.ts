import diagnosisData from '../../data/diagnosis';
import { DiagnosisInfo } from '../types';

const diagnosis:DiagnosisInfo[] = diagnosisData;

const getDiagnosis = () => {
  return diagnosis;
};

export default {
  getDiagnosis
};