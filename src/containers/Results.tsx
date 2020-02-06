import React from 'react'
import ResultsContext from '../contexts/ResultsContext'
import styled from 'styled-components'

const StyledResults = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  grid-gap: 1rem;

  .correct,
  .incorrect {
    width: 100px;
  }

  .value {
    font-size: 4rem;
    padding: auto;
  }
`

export const Results: React.FC = () => {
  return (
    <ResultsContext.Consumer>
      {({ correct, incorrect }) => (
        <StyledResults>
          <div className="correct">
            <h2>Goed</h2>
            <div className="value">{correct}</div>
          </div>
          <div className="incorrect">
            <h2>Fout</h2>
            <div className="value">{incorrect}</div>
          </div>
        </StyledResults>
      )}
    </ResultsContext.Consumer>
  )
}