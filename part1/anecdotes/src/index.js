import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
  ];
  const fvote = Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [click, setClick] = useState(fvote);

  const hClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteAnecdote = () => {
    const copy = [...click];
    copy[selected] += 1;
    setClick(copy);
  };

  const maxVotes = Math.max(...click);
  const mostVoted = anecdotes[click.indexOf(maxVotes)];

  return (
    <div>
      {anecdotes[selected]}<br/>
     <p> has {click[selected]} votes</p>
      <p>
        <button onClick={hClick}>Next</button>
        <button onClick={voteAnecdote}>Vote</button>
      </p>
      <h5>Anecdote with most votes</h5>
      {mostVoted}
      <p>it has {maxVotes} votes</p>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
