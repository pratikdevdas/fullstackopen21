import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack");
});

app.get(`/bmi`, (_req, res) => {
    console.log('happens');
    if (Object.keys(_req.query).length != 0 && !isNaN(Number(_req.query?.height)) && !isNaN(Number(_req.query?.weight))) {
        const bmi = calculateBmi(Number(_req.query?.height), Number(_req.query?.weight));
        res.json({
            height: Number(_req.query?.height),
            weight: Number(_req.query?.weight),
            bmi: bmi
        });
    } else {
        res.json({
            error: "malformatted parameters"
        });
    }
});

app.post('/exercises', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises , target } = _req.body;

    if (!daily_exercises || !target) {
        res.send({error: 'params missing'});
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const rest = daily_exercises.some((element: unknown)=> isNaN(Number(element)));
    if(isNaN(Number(target)) || rest){
         res.send({error: 'malformatted params'});   
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
    const result = calculateExercises(daily_exercises, target);
    res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log('running on 3002');
});