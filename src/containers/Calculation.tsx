import React, { useState } from 'react'
import styled from 'styled-components'
import { Results } from './Results'
import ResultsContext from '../contexts/ResultsContext'
import { getRandomEnum, randomIntFromInterval } from '../lib/random'
import { AnswerForm } from './AnswerForm'

const StyledCalculation = styled.div`
  grid-column: center-start / center-end;

  display: grid;
  grid-gap: 6rem;
  grid-template-columns: repeat(3, minmax(fitcontent, 1fr));
  grid-template-rows: repeat(3, minmax(fitcontent, 1fr));
`

const StyledAssignement = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  font-size: 4rem;
`

const StyledAnswer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  font-size: 4rem;
`

const StyledFeedback = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  font-size: 2rem;
`

enum Operation { Add, Sub }
const [ defaultMin, defaultMax ] = [7, 30]

interface Calculation { 
  leftVal: number;
  rightVal: number;
  operation: Operation;
}

const createCalculation = (min: number, max: number): Calculation => {
  let [ leftVal, rightVal ] = [ 
    randomIntFromInterval(min, max),
    randomIntFromInterval(min, max),
  ]
  const operation = getRandomEnum(Operation)
  if (operation === Operation.Sub) {
    [ leftVal, rightVal ] = [ Math.max(leftVal, rightVal), Math.min(leftVal, rightVal) ]
  }
  return { leftVal, rightVal, operation }
}

const initialCalculation: Calculation = createCalculation(defaultMin, defaultMax)

const operator: { [key in Operation]: string } = {
  [Operation.Add]: "+",
  [Operation.Sub]: "-"
}

export const Calculation: React.FC = () => {
  const [answer, setAnswer] = useState<number>();
  const [correctCounter, setCorrectCounter] = useState<number>(0);
  const [incorrectCounter, setIncorrectCounter] = useState<number>(0);
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [calculation, setCalculation] = useState<Calculation>(initialCalculation)
  const { leftVal, rightVal, operation } = calculation;

  const calculateResult = (): number => {
    switch (operator[operation]) {
      case "+":
        return leftVal + rightVal;
      case "-":
        return leftVal - rightVal
      default: 
        throw new Error("No valid operator provided")
    }
  }
  
  const checkAnswer = (value: string) => {
    const parsedValue = Number.parseInt(value)
    setAnswer(parsedValue);
    const answerIsCorrect: boolean = calculateResult() === parsedValue
    if (answerIsCorrect) {
      setCorrectCounter(counter => counter + 1);
      setCalculation(createCalculation(defaultMin, defaultMax))
      if (incorrect) setIncorrect(false);
    } else {
      setIncorrectCounter(counter => counter + 1)
      setIncorrect(true)
    }
  }

  return (
    <ResultsContext.Provider value={{ 
      correct: correctCounter,
      incorrect: incorrectCounter 
    }}>
      <StyledCalculation> 
        <Results />
        <StyledAssignement>
            {`${leftVal} ${operator[operation]} ${rightVal} =`}
        </StyledAssignement>
        <StyledAnswer>
          <AnswerForm checkAnswer={checkAnswer} />
        </StyledAnswer>
        <StyledFeedback>
          {incorrect && 
            `Helaas ${answer} was niet goed`
          }
        </StyledFeedback>
      </StyledCalculation>
    </ResultsContext.Provider>
  )
}