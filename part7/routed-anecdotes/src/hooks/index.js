import {useState} from "react";

export const useField = (type) => {
    const [value, setValue] = useState('')

    // in hooks its different like we pass the function as valid props
    const onChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.value)
    }
    

    const reset = (event)=>{
        // console.log(event.target.value)
        setValue('')
    }
    return{
        value,
        type,
        onChange,
        reset,
    }
}