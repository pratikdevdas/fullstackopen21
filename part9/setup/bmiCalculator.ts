interface bmiValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

const calculateBmi = (height: number, mass: number): string | void => {
    const res = mass / (height * height) * 10000;
    switch (true) {
        case (res < 16):
            return 'Underweight (Severe thinness)'
        case (res >= 16 && res <= 16.9):
            return 'Underweight (Moderate thinness)'
        case (res >= 17 && res <= 18.4):
            return 'Underweight (Mild thinness)'
        case (res >= 18.5 && res <= 24.9):
            return 'Normal (healthy weight)'
        case (res >= 25 && res <= 29.9):
            return 'Pre Obese'
        case (res >= 30 && res <= 34.9):
            return 'Obese 1'
        case (res >= 35 && res <= 39.9):
            return 'Obese 2'
        case (res >= 40):
            return 'Obese 3'
        default:
            break;
    }
    return console.log('Error didnt work')
}



try {
    const {value1, value2} = parseArguments(process.argv)
    console.log(calculateBmi(value1, value2))
} catch (error:unknown) {
    let errorMessage = "Something bad happened"
    if (error instanceof Error){
        errorMessage += 'Error' + error.message;
    }
    console.log(errorMessage)
}