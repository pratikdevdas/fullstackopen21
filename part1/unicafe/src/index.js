import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) =>{

 return(
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
    )}
  
const Statistics = ({good,neutral,bad}) =>{
  const total = good+bad+neutral
  const avg = (good*1)+neutral*0+(bad*-1)
  if (total===0){
    return(<>No Feedback Given</>)}
return(
 <><table>
 <tbody>
<Statistic text = "good" value={good}/>
<Statistic text = "neutral" value={neutral}/>
<Statistic text = "bad" value={bad}/>
<Statistic text = "all" value={total}/>
<Statistic text = "average" value={avg/total}/>
<Statistic text = "positive" value={good/total*100}/>

 </tbody></table>
</>) 
}
  

// const Button = (props) => {
//    return (
//        <button onClick={props.value}>{props.text}</button>    
//        )
//      }
//After Destructing and Reffactor(belsow)

const Button = ({text,value}) => (<button onClick={value}>{text}</button>)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad ] = useState(0)
  
  //eventhandlingfunctions
  const goodClick = () => setGood(good+1)
  const neutralClick = () => setNeutral(neutral+1)
  const badClick = () => setBad(bad+1)
       
   
  return (
    <div>
      <h3>Give Feedback</h3>
      <Button text="good" value={goodClick}/>
      <Button text="neutral" value={neutralClick}/>
      <Button text="bad" value={badClick}/>

      <h3>Statistics</h3>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);



