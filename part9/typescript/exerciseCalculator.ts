//import { isNumber } from './utils';

interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyHours: number[], originalTarget: number): Result => {
  let rating = 0;
  let ratingDescription = "";
  const average = dailyHours.reduce((acc, number) => acc + number, 0) / dailyHours.length;

  if (average < (originalTarget * 0.4)) {
    rating = 0;
    ratingDescription = "Intermittent fasting is your thing.";
  } else if (average < (originalTarget * 0.8)) {
    rating = 1;
    ratingDescription = "You really need to organize better";
  } else if (average < originalTarget) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "Why don't you sign up for the Mister Olympia?";
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(h => h > 0).length,
    success: dailyHours.filter(h => h >= 2).length === dailyHours.length,
    rating: rating,
    ratingDescription: ratingDescription,
    target: originalTarget,
    average: dailyHours.reduce((acc, number) => acc + number, 0) / dailyHours.length
  };
};

/*
try {
  const parameters = process.argv.slice(2, process.argv.length)
                           .map(value => {
                              if (!isNumber(value)) throw new Error('Provided values are not all numbers!');
                              return Number(value);
                           });

  const args = parameters.slice(1, parameters.length);
  const originalTarget = parameters[0];
  
  console.log(calculateExercises(args, originalTarget));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage);
}
*/
export default calculateExercises;