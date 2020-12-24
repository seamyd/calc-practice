import React, { useContext } from 'react'
import ResultsContext from '../contexts/ResultsContext'
import styled from 'styled-components'

const StyledResults = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(6rem, 1fr));
  grid-gap: 1rem;

  .value {
    font-size: 4rem;
    padding-left: 1rem;
  }
`

export const Results: React.FC = () => {
  const { correct, incorrect } = useContext(ResultsContext)
  return (
    <StyledResults>
      <h2>Goed:</h2>
      <div className="value">{correct}</div>
      <h2>Fout:</h2>
      <div className="value">{incorrect}</div>
    </StyledResults>
  )
}