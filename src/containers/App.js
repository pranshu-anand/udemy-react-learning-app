import React, { Component } from 'react';
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

class App extends Component {
  
  state = {
    persons: [
      {id: 'abc', name: "Tom", age:26},
      {id: 'def', name: "Dick", age:22},
      {id: 'ghi', name: "Harry", age:29},      
    ],
    otherState: "otherStateValue",
    showPersons: false
  }

  switchNameHandler = (newName) => {
    //console.log("Was clicked!")
    // DON'T DO THIS: this.state.persons[1].name = "****"
    const persons = [
      {id: 'abc', name: newName, age:26},
      {id: 'def', name: newName, age:22},
      {id: 'ghi', name: newName, age:29},
    ]
    this.setState({persons})
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person =  {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value;
    
    const persons = [...this.state.persons]
    persons[personIndex] = person

    // const persons = [
    //   {id: 'abc', name: "Tom", age:26},
    //   {id:  event.target.value, name: "Dick", age:22},
    //   {id: 'ghi', name: "Harry", age:29},
    // ]
    this.setState( {persons: persons} )
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({showPersons: !doesShow})
  }

  deletePersonHandler = (personIndex) => {
    //DON'T DO THIS: This will mutate the state
    //const persons = this.state.persons;
    
    const persons = [...this.state.persons]; // or const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }


  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    let cssClassesList = [];
    cssClassesList.push(cssClasses.button);
    
    if (this.state.showPersons === true) {
      style.backgroundColor = 'red';

      cssClassesList.push(cssClasses.Red);


      persons = (
        <div>
          {this.state.persons.map( (person, index) => {
            return <Person 
              name={person.name} 
              age={person.age}
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangeHandler(event, person.id)}
              key={person.id} />
          })}
          {/* <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age} />
          <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, "DickAss")}
            changed={this.nameChangeHandler}> My hobbies: Reading. </Person>
          <Person 
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age} /> */}
        </div>
      )
    }

    let classes = [];

    if (this.state.persons.length <=2 ) {
      classes.push('red');  // classes = ['red']
    }
    if (this.state.persons.length <=1 ) {
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
          onClick={() => this.switchNameHandler("****")}> Switch Name </button> */}
        <button 
          style={style}
          onClick={() => this.togglePersonsHandler()}> Display Names (Powered by inline styles) </button>
        <br/>
        <button 
          className={cssClassesList.join(' ')}
          onClick={() => this.togglePersonsHandler()}> Display Names (Powered by CSS-Modules) </button>
        <br/>
        <StyledButton
          alt={this.state.showPersons}
          onClick={() => this.togglePersonsHandler()}> Display Names (Powered by styled-components) </StyledButton>
        {persons}
      </div>
    // </StyleRoot>
    );

    // return (
    //   React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work?'))
    // );
  }
}

export default App;
