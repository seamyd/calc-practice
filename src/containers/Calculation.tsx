import React, { useState } from 'react'
import styled from 'styled-components'
import { Results } from './Results'
import ResultsContext from '../contexts/ResultsContext'
import { getRandomEnum, randomIntFromInterval } from '../lib/random'
import { AnswerForm } from './AnswerForm'

const StyledCalculation = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;

  .assignment {
    font-size: 4rem;
    align-self: center;
    margin: auto;
  }
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
        <div className="assignment">
            {`${leftVal} ${operator[operation]} ${rightVal} =`}
        </div>
        <div>
          <AnswerForm checkAnswer={checkAnswer} />
        </div>
        <div>
          {incorrect && 
            `Helaas ${answer} was niet goed`
          }
        </div>
        <Results />
      </StyledCalculation>
    </ResultsContext.Provider>
  )
}