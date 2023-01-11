import express from 'express';
// import diagnosisRouter from './routes/diagnosis';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors);


app.get('/ping', (_req, res) => {
  console.log('fds;');
  console.log('someone pinged here');
  res.send('pong');
});

// app.use('/api/dianosis',diagnosisRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});