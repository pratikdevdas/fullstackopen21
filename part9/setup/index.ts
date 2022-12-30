import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello/cool', (_req, res) => {

    console.log('he')
    res.send("Hello Full Stack")
})

app.get(`/bmi`, (_req, res) => {
    console.log(_req.query)
    if (Object.keys(_req.query).length != 0 && !isNaN(Number(_req.query?.height)) && !isNaN(Number(_req.query?.weight))) {
        const bmi = calculateBmi(Number(_req.query?.height), Number(_req.query?.weight))
        res.json({
            height: Number(_req.query?.height),
            weight: Number(_req.query?.weight),
            bmi: bmi
        })
    } else {
        res.json({
            error: "malformatted parameters"
        })
    }
})

const PORT = 3002

app.listen(PORT, () => {
    console.log('running on 3002')
})