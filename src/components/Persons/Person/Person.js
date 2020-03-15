import React from 'react';
import './Person.css'
// import Radium from 'radium'
import styled from 'styled-components'

const StyledDiv = styled.div`
    width: 60%;
    margin: auto;
    border: 1px solid #eee;
    box-shadow: 0 5px 3px #ccc;
    padding: 16px;
    text-align: center;
    
    @media (min-width: 500px) {
        width: 450px
    }

`;

const Person = (props) => {
    // const style = {
    //     '@media (min-width: 500px)' : {
    //         width: '450px'
    //     }
    // }

    return (
        // <div className='Person' style={style}>
        <StyledDiv>
            <div className='Person'>
                <p onClick={props.click}>Hello! I'm {props.name} and I'm {props.age} years old.</p>
                <p>{props.children}</p>
                <input type="text" onChange={props.changed} value={props.name} />
            </div>
        </StyledDiv>
    )
}

// export default Radium(Person);
export default Person;
