import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { isNumber } from './utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height as string;
  const weight = req.query.weight as string;

  let result;
  try {
    result = calculateBmi(height, weight);
  } catch (error) {
    //console.log('error', error.message);
    return res.status(400).json({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      error: error.message
    });
  }

  return res.status(200).json({
    weight, height, bmi: result
  });
});

app.post('/exercises', (req, res) => {
  let result;
  try {
    console.log('req.body', req.body);
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target)
      throw new Error("parameters missing");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
    const parameters = daily_exercises.map((value: any) => {
                                if (!isNumber(value)) throw new Error('malformatted parameters');
                                return Number(value);
                             });
    
    result = calculateExercises(parameters as number [], Number(target));
  } catch (error: unknown) {
    let errorMessage: string = "";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    result = { error: errorMessage};
    console.log(errorMessage);
  }
  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});