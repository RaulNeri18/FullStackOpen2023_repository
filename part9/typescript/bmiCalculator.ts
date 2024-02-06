import { isNumber } from './utils';

//based on a given height (in centimeters) and weight (in kilograms)
//and then returns a message that suits the results.
const calculateBmi = (height: string, weight: string): string => {
  if (!isNumber(height) || !isNumber(weight))
    throw new Error('malformatted parameters');

  const heightN = Number(height);
  const weightN = Number(weight);
  const result = weightN / Math.pow(heightN/100, 2);
  
  if (result < 18.5) {
    return 'Underweight';
  } else if (result >= 18.5 && result < 24.9) {
    return 'Normal (healthy weight)';
  } else if (result >= 25 && result < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

export default calculateBmi;
//const args = process.argv
//console.log(calculateBmi(args[2], args[3]))