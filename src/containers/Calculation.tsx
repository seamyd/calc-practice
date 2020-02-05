import React, { useState, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import { Results } from './Results'
import ResultsContext from '../contexts/ResultsContext'
import { add, sub } from '../lib/math'
import { getRandomEnum, getRandomNumber } from '../lib/random'
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

const operator = (op: Operation) => {
  if (op === Operation.Add) return { fn: add, str: "+" }
  return { fn: sub, str: "-" }
}

interface CalculationState {
  leftVal: number
  rightVal: number
  operation?: {
    fn: (leftVal: number, rightVal: number) => number
    str: string
  }
}

interface State {
  showIncorrectAnswer: boolean
  incorrectAnswers?: number
  correctAnswers?: number
}

export const Calculation: React.FC = () => {
  const [calculation, setCalculation] = useState<CalculationState>({ 
    leftVal: getRandomNumber(20),
    rightVal: getRandomNumber(20),
    operation: operator(getRandomEnum(Operation))
  })
  const [state, setState] = useReducer(
    (state: State, newState: State) => ({ ...state, ...newState }),
    { showIncorrectAnswer: false, correctAnswers: 0, incorrectAnswers: 0 }
  )
  const [answer, setAnswer] = useState<number>()

  const calculateResult = (): number | null => {
    if (calculation.operation)
      return calculation.operation.fn(calculation.leftVal, calculation.rightVal)
    return null
  }

  const checkAnswer = (value: string): void => {
    const newAnswer = Number.parseInt(value)
    setAnswer(newAnswer)
    if (newAnswer === calculateResult()) {
      setState({
        showIncorrectAnswer: false,
        correctAnswers: (state.correctAnswers ? state.correctAnswers + 1 : 1)
      })
    } else {
      setState({ 
        showIncorrectAnswer: true,
        incorrectAnswers: (state.incorrectAnswers ? state.incorrectAnswers + 1 : 1)
      })
    }
  }

  useEffect(() => { 
    const newCalculation = (maxValue: number): void => {
      setCalculation({ 
        leftVal: getRandomNumber(maxValue),
        rightVal: getRandomNumber(maxValue),
        operation: operator(getRandomEnum(Operation))
      })
    }
  
    newCalculation(20) 
  }, [state.correctAnswers])

  return (
    <ResultsContext.Provider value={{ 
      correct: state.correctAnswers,
      incorrect: state.incorrectAnswers 
    }}>
      <StyledCalculation> 
        <div className="assignment">
          {calculation.operation && (
            `${calculation.leftVal} ${calculation.operation?.str} ${calculation.rightVal} =`
          )}
        </div>
        <div>
          <AnswerForm checkAnswer={checkAnswer} />
        </div>
        <div>
          {state.showIncorrectAnswer && 
            `Helaas ${answer} was niet goed`
          }
        </div>
        <Results />
      </StyledCalculation>
    </ResultsContext.Provider>
  )
}