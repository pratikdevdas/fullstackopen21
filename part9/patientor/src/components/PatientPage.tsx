import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, singlePatient } from "../state";
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, Patient, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HealingIcon from '@mui/icons-material/Healing';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

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
			{value?.entries.map(n => <EntryDetails key={n.id} entry={n}>
			</EntryDetails>)}
		</div>
	);
};

export default PatientPage;

//  do  not use the following type label in new react projects
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	console.log(entry);
	switch (entry.type) {
		case "Hospital":
			return <Hospital entry={entry} />;
		case "OccupationalHealthcare":
			return <OccupationalHealthcare entry={entry} />;
		case "HealthCheck":
			return <HealthCheck entry={entry} />;
		default:
			return null;
	}
};


const borderStyle = {
	padding: "10px",
	border: '2px solid black',
	borderRadius: '10px 	'
};
const textDescription = {
	fontSize: 'italic'
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
	return <div style={borderStyle}>
		<p>{entry.date}
			<LocalHospitalIcon />
		</p>
		<div style={textDescription} >{entry.description}</div>
		<div> <b>Discharge date:</b> {entry.discharge.date} <b>Criteria:</b>{entry.discharge.criteria}</div>
		<div>diagnose by {entry.specialist}</div>
	</div>;
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
	return <div style={borderStyle}>
		<p>{entry.date}
			<HealingIcon />
		</p>
		<div style={textDescription} >{entry.description}  {entry.employerName}</div>
		<div>diagnose by {entry.specialist}</div>
	</div>;
};



const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
	return <div style={borderStyle}>
		<p>{entry.date}
			<MedicalServicesIcon />
		</p>
		<div style={textDescription} >{entry.description}</div>
		<div> <HealthCheckHeart heart={entry.healthCheckRating} /></div>
		<div>diagnose by {entry.specialist}</div>
	</div>;
};


function HealthCheckHeart({ heart }: { heart: number }) {
	switch (heart) {
		case 0:
			return <div>❤️</div>;
		case 1:
			return <div>💛</div>;
		case 2:
			return <div>💙</div>;
		case 3:
			return <div>🤎</div>;
		default:
			return null;
	}
}
