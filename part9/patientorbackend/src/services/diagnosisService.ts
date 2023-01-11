import diagnosis from '../../data/diagnosis';
import { DiagnosisInfo } from '../types';

const getDiagnosis = (): DiagnosisInfo[] => {
    return diagnosis;
};

export default {
    getDiagnosis,
};
