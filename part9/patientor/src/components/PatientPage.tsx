import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue, singlePatient, addEntry } from "../state";
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, Patient, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HealingIcon from '@mui/icons-material/Healing';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddEntryForm, { BaseEntryWithoutId } from './AddEntryForm';
import { Button, Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
// Code for modal
interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: BaseEntryWithoutId) => void;
	error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
	<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
		<DialogTitle>Add a new patient</DialogTitle>
		<Divider />
		<DialogContent>
			{error && <Alert severity="error">{`Error: ${error}`}</Alert>}
			<AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
		</DialogContent>
	</Dialog>
);


const PatientPage = () => {
	const [{ patients }, dispatch] = useStateValue();
	// const [{ diagnosis }] = useStateValue();
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

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
	const openModal = (): void => setModalOpen(true);


	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewEntry = async (values: BaseEntryWithoutId) => {
		try {
			const { data: newEntry } = await axios.post<Entry>(
				`${apiBaseUrl}/patients/${idVal}/entries`,
				{
					...values,
					type: "HealthCheck", diagnosisCodes: [],
					healthCheckRating: 2
				}
			);
			dispatch(addEntry(newEntry, idVal));
			closeModal();
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				console.error(e?.response?.data || "Unrecognized axios error");
				setError(String(e?.response?.data?.error) || "Unrecognized axios error");
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};
	const value = patients[idVal];
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
			<Button variant="contained" onClick={() => openModal()}>
				Add New Entry
			</Button>

			<AddEntryModal modalOpen={modalOpen}
				error={error}
				onSubmit={submitNewEntry}
				onClose={closeModal} />
			<h3>entries</h3>
			{value?.entries.map(n => <EntryDetails key={n.id} entry={n}>
			</EntryDetails>)}
		</div>
	);
};

export default PatientPage;

//  do  not use the following type label in new react projects
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
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
