function calculateExcercises(daily: Array<number>, target: Number) {
    const arr: Array<Number> = []
    daily.forEach((arrayValue) => arrayValue === 0 ? null : arr.push(arrayValue))
    let sum: number = 0;
    daily.forEach((arrayValue) => {
        console.log(sum += arrayValue)
        return sum
    })
    const average = sum / daily.length
    let rating, sucess;
    if (average<target){
        sucess = false;
        rating = Math.floor(Math.random()*10-5)> 0 ? 1 : 2
        console.log(rating)
    } else {
        sucess = true;
        rating = 3
    }

    let ratingDescription;
    switch (rating) {
        case 1:
            ratingDescription = "very bad, impronvement"
            break;
        case 2:
            ratingDescription = "not too bad but could be better"
            break;
            case 3:
            ratingDescription = "very sexy"
            break;
        default:
            break;
    }
    
    const result = {
        periodLength: daily.length,
        trainingDays: arr.length,
        sucess,
        rating,
        ratingDescription,
        target,
        average
    }
    return result
}

console.log(calculateExcercises([3, 0, 2, 4.5, 0, 3, 1], 1))