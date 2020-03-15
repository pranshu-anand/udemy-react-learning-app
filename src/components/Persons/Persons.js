import React from 'react';
import './Persons.css'
import Person from './Person/Person'

const Persons = (props) => (
    props.persons.map( (person, index) => {
        return <Person 
            name={person.name} 
            age={person.age}
            click={() => props.clicked(index)}
            changed={(event) => props.changed(event, person.id)}
            key={person.id} />
    })
);

export default Persons