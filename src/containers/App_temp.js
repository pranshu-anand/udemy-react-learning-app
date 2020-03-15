import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person'

const App = (props) => {
  // personState is the state and setPersonState is the state-manipulator function to be used.
  const [personState, setPersonsState] = useState({
    persons: [
      {name: "Tom", age:26},
      {name: "Dick", age:22},
      {name: "Harry", age:29},      
    ],
    otherState: "otherStateValue"
  });

  const [someOtherState, _] = useState("someOtherStateValue");

  console.log(personState, someOtherState);

  const switchNameHandler = (newName) => {
    //console.log("Was clicked!")
    // DON'T DO THIS: this.state.persons[1].name = "****"
    const persons = [
      {name: "Tom", age:26},
      {name: newName, age:22},
      {name: "Harry", age:29},
    ]
    const state = {
      persons,
      otherState: personState.otherState
    }
    setPersonsState(state)
  }

  const nameChangeHandler = (event) => {
    const persons = [
      {name: "Tom", age:26},
      {name: event.value, age:22},
      {name: "Harry", age:29},
    ]
    this.setState({persons})
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <button onClick={() => switchNameHandler("****")}> Switch Name </button>
      <Person 
        name={personState.persons[0].name} 
        age={personState.persons[0].age} />
      <Person 
        name={personState.persons[1].name} 
        age={personState.persons[1].age} 
        click={() => switchNameHandler("DickAss")}
        changed={() => nameChangeHandler(event)}>My hobbies: Reading. </Person>
      <Person 
        name={personState.persons[2].name} 
        age={personState.persons[2].age} />
    </div>
  );

  // return (
  //   React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work?'))
  // );
}


export default App;
