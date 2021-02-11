// import React from 'react';
import styled from 'styled-components';

const standardView = (theme) => {
  const type = {
    show: `color: white; background-color: rgb(1,169,130); border: 2px solid rgb(1,169,130);`,
    hide: `color: white; background-color: rgb(214,10,10); border: 2px solid rgb(214,10,10);` 
  }
  return type[theme] ? type[theme] : type['default']
}

const hoverView = (theme) => {
  switch (theme) {
    case 'show': 
      return `background-color: rgb(9,138,108); border: 2px solid rgb(9,138,108);`;
    default: 
      return `background-color: rgb(179,27,27); border: 2px solid rgb(179,27,27);`;
  }
}



const InputButton = styled.input`
  &:hover {
    ${({ theme }) => hoverView(theme)}
    outline: none;
  }

  /* &:after {
    display: block;
    content: " <- BORING";
  } */
  outline: none;
  padding: 0.1rem 0.4rem;
  width: auto;
  border-radius: 6px;
  display: block;
  margin: 0 auto;
  font-size: 18px;
  ${({ theme }) => standardView(theme)}

  /* outline: none; */
`

export default InputButton

