import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import cssClasses from './App.css';
import Radium, { StyleRoot } from 'radium'
import styled from 'styled-components'
import Person from '../components/Persons/Person/Person'

const StyledButton = styled.button`
  background-color: ${props => props.alt === true ? 'red':'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt === true ? 'orange':'lightgreen'};
    color: black; 
  }
`;

const App = (props) => {
  // personState is the state and setPersonState is the state-manipulator function to be used.
  const [personState, setPersonsState] = useState({
    persons: [
      {id: "abc", name: "Tom", age:26},
      {id: "def", name: "Dick", age:22},
      {id: "ghi", name: "Harry", age:29},      
    ],
    otherState: "otherStateValue"
  });

  const [someOtherState, _] = useState("someOtherStateValue");

  const [showPersonsFlagState, setShowPersonsFlagState] = useState(false);

  
  console.log(personState, someOtherState, showPersonsFlagState);

  
  const switchNameHandler = (newName) => {
    //console.log("Was clicked!")
    // DON'T DO THIS: this.state.persons[1].name = "****"
    const persons = [
      {id: "abc", name: newName, age:26},
      {id: "def", name: newName, age:22},
      {id: "ghi", name: newName, age:29},
    ]
    const state = {
      persons: persons,
      otherState: personState.otherState
    }
    setPersonsState(state)
  }

  const nameChangeHandler = (event, id) => {
    const personIndex = personState.persons.findIndex(p => {
      return p.id === id;
    });

    const persons = [...personState.persons]
    persons[personIndex].name = event.target.value
    
    const state = {
      persons: persons,
      otherState: personState.otherState
    }
    setPersonsState(state)  
  }

  const togglePersonsHandler = () => {
    const doesShow = showPersonsFlagState
    console.log(!doesShow)
    setShowPersonsFlagState(!doesShow)
  }

  const deletePersonHandler = (personIndex) => {
    //DON'T DO THIS: This will mutate the state
    //const persons = this.state.persons;
    
    const persons = [...personState.persons]; // or const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);

    const state = {
      persons: persons,
      otherState: personState.otherState
    }
    setPersonsState(state);
  }

  const style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  };

  let persons = null;
  let cssClassesList = [];
  cssClassesList.push(cssClasses.button);
  
  if (showPersonsFlagState === true) {
    style.backgroundColor = 'red';
    style[':hover'] = {
      backgroundColor: 'orange',
      color: 'black',
    }

    cssClassesList.push(cssClasses.Red);

    persons = (
      <div>
        {personState.persons.map( (person, index) => {
          return <Person 
            name={person.name} 
            age={person.age}
            click={() => deletePersonHandler(index)}
            changed={(event) => nameChangeHandler(event, person.id)}
            key={person.id} />
        })}
        {/* <Person 
          name={personState.persons[0].name} 
          age={personState.persons[0].age} />
        <Person 
          name={personState.persons[1].name} 
          age={personState.persons[1].age} 
          click={() => switchNameHandler("DickAss")}
          changed={() => nameChangeHandler(event)}>My hobbies: Reading. </Person>
        <Person 
          name={personState.persons[2].name} 
          age={personState.persons[2].age} /> */}
      </div>
    )
  }

  let classes = [];

  if (personState.persons.length <=2 ) {
    classes.push('red');  // classes = ['red']
  }
  if (personState.persons.length <=1 ) {
    classes.push('bold');  // classes = ['red', 'bold']
  }

  return (
    // <StyleRoot>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className={classes.join(' ')}>Checking out variable classes</p>
        {/* <button 
          style={style}
          onClick={() => switchNameHandler("****")}> Switch Name </button> */}
        <button 
          style={style}
          onClick={() => togglePersonsHandler()}> Display Names (Powered by inline styles) </button>
        <br/>
        <button 
          className={cssClassesList.join(' ')}
          onClick={() => togglePersonsHandler()}> Display Names (Powered by CSS-Modules) </button>
        <br/>
        <StyledButton
          alt={showPersonsFlagState}
          onClick={() => togglePersonsHandler()}> Display Names (Powered by styled-components) </StyledButton>
        {persons}
      </div>
    // </StyleRoot>
  );

  // return (
  //   React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work?'))
  // );
}


export default Radium(App);
// export default App;
