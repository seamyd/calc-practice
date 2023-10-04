import React from 'react'
import theme from './theme'
import { Calculation } from './containers/Calculation'
import styled, { createGlobalStyle } from 'styled-components'

type ThemeType = typeof theme

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  html {
    font-size: 10px;
  }
  body {
    background-color: ${({ theme }) => theme.colors.compl.light};
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 1.6rem;
    color: white;
    height: 100%;
    width: 100%;
  }
`

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: 10rem min-content;
  grid-template-columns: 
    [sidebar-start] 8rem [sidebar-end full-start] 
    minmax(6rem, 1fr) [center-start] 
    repeat(8, [col-start] minmax(min-content, 14rem) [col-end]) 
    [center-end] minmax(6rem, 1fr) [full-end];

  border-bottom: 10px solid ${({ theme }) => theme.colors.prim.dark};
`

const StyledSidebar = styled.div`
  grid-column: sidebar-start / sidebar-end;
  grid-row: 1 / -1;
  background-color: ${({ theme }) => theme.colors.prim.dark};
`

const StyledHeader = styled.header`
  grid-column: sidebar-end / full-end;
  border-bottom: 10px solid ${({ theme }) => theme.colors.prim.dark};
  h1 {
    margin-left: 2rem;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle theme={theme} />
      <StyledApp>
        <StyledHeader><h1>Rekenen oefenen</h1></StyledHeader>
        <StyledSidebar />
        <Calculation />
      </StyledApp>
    </>
  );
}

export default App;
