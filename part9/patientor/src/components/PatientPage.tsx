import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, singlePatient } from "../state";
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
const PatientPage = () => {
	const [{ patients }, dispatch] = useStateValue();
	const [{ diagnosis }] = useStateValue();
	console.log(diagnosis);
	const { id } = useParams<{ id: string }>();
	const idVal = id ? id : '';

	React.useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);
		const fetchPatientList = async () => {
			try {
				const { data: singlePatientFromApi } = await axios.get<Patient>(
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					`${apiBaseUrl}/patients/${id}`
					
				);
				dispatch(singlePatient(singlePatientFromApi));
			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatientList();
	}, [dispatch]);


	const value = patients[idVal];
	console.log(value);
	return (
		<div>
			<div>
				<h2>{value?.name}</h2>
				{
					value?.gender === 'male' ? <MaleIcon />
						: value?.gender === 'female' ? <FemaleIcon />
							: null
				}
			</div>
			<p>ssh  : {value?.ssn}</p>
			<p>occupation : {value?.occupation}</p>

			<h3>entries</h3>
			{value?.entries.map(n => <>{n.date}
				<div>{n.description}</div>
				{n.diagnosisCodes?.map(d => <li key={d}>{d}
				{diagnosis[d] && <> {diagnosis[d].name}</>}
				</li>)}
			</>)}
		</div>
	);
};

export default PatientPage;