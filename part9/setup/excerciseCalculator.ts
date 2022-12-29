interface Result{
    periodLength: number,
    trainingDays: number,
    sucess:boolean,
    rating:number,
    ratingDescription:string,
    target:number,
    average:number
}

function calculateExcercises(daily: Array<number>, target: number):Result {
    const arr: Array<Number> = []
    daily.forEach((arrayValue) => arrayValue === 0 ? null : arr.push(arrayValue))
    let sum: number = 0;
    daily.forEach((arrayValue) => {
        return sum += arrayValue
        
    })
    const average = sum / daily.length
    let rating, sucess;
    if (average<target){
        sucess = false;
        rating = Math.floor(Math.random()*10-5)> 0 ? 1 : 2
    } else {
        sucess = true;
        rating = 3
    }

    let ratingDescription;
    switch (rating) {
        case 1:
            ratingDescription = "very bad, improvement"
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
    
    return {
        periodLength: daily.length,
        trainingDays: arr.length,
        sucess,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExcercises([3, 0, 2, 4.5, 0, 3, 1], 1))