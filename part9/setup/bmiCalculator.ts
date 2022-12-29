const calculateBmi = (height: number, mass: number): string => {
    const res = mass / (height * height) * 10000;
    console.log(res);
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
}

console.log(calculateBmi(177, 82))