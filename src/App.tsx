import React from 'react'
import { Calculation } from './containers/Calculation'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }
  body {
    background-color: rgb(33,33,33);
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 1.6rem;
    color: white;
    height: 100%;
    width: 100%;
  }
`

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
`

const StyledHeader = styled.header`
  border-bottom: 10px solid black;
  h1 {
    margin-left: 2rem;
  }
`;

const App: React.FC = () => {
  return (
    <StyledApp>
      <GlobalStyle />
      <StyledHeader><h1>Leer rekenen</h1></StyledHeader>
      <Calculation />
    </StyledApp>
  );
}

export default App;
