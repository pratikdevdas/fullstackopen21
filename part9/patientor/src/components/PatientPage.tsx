import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
const PatientPage = () => {
	const [{ patients }, dispatch] = useStateValue();
	const { id } = useParams<{ id: string }>();
	console.log(id);
	const idVal = id ? id : '';

	React.useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);
		const fetchPatientList = async () => {
			try {
				const { data: singlePatientFromApi } = await axios.get<Patient>(
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					`${apiBaseUrl}/patients/${id}`
				);
				dispatch({ type: "SINGLE_PATIENT", payload: singlePatientFromApi });
				console.log(singlePatientFromApi);
			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatientList();
	}, [dispatch]);

	// const value = patients.find((n: { id: string; })=> n.id === id);
	// const rio = [...patients];
	const value = patients[idVal];
	console.log(Object.keys(patients).length);
	console.log(value?.id);
	return (
		<div>
			<div>
				<h2>{value?.name}</h2>
				{
					value?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />
				}
			</div>
			<p>ssh  : {value?.ssn}</p>
			<p>occupation : {value?.occupation}</p>
		</div>
	);
};

export default PatientPage;