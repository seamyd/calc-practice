import React, { useState, useReducer, useEffect, useRef } from 'react'
import { add, sub } from '../lib/math'
import { getRandomEnum, getRandomNumber } from '../lib/random'
import { ResultForm } from './ResultForm'

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
    { showIncorrectAnswer: false, correctAnswers: 0 }
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
        showIncorrectAnswer: true
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
    <div>
      <div>
        {calculation.operation && (
          `${calculation.leftVal} ${calculation.operation?.str} ${calculation.rightVal} =`
        )}
      </div>
      <div>
        <ResultForm checkAnswer={checkAnswer} />
      </div>
      <div>
        {state.showIncorrectAnswer && 
          `Helaas ${answer} was niet goed, probeer het nog eens!`
        }
        {!state.showIncorrectAnswer && state.correctAnswers !== 0 &&
          `Jaaa, je antwoord was goed!`
        }
      </div>
      <div>
        {`Correct antwoorden: ${state.correctAnswers}`}
      </div>
    </div>
  )
}