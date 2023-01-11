import express from 'express';
const app = express();
import diagnosisRouter from './routes/diagnosis';
import patientRouter from './routes/patients';

import cors from 'cors';

app.use(cors());
app.use(express.json());

app.get('/ping', (_req, res) => {
    console.log('fds;');
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnosis/', diagnosisRouter);
app.use('/api/patients/', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
