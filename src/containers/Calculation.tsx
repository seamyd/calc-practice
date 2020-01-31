import React, { useState, useReducer, useEffect, useRef } from 'react';
import { ResultForm } from './ResultForm';

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  return enumValues[randomIndex]
}

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

enum Operation { Add, Sub }

const getRandomNumber = (maxValue: number) =>
  Math.floor(Math.random() * maxValue)

const sum = (leftVal: number, rightVal: number): number => leftVal + rightVal
const sub = (leftVal: number, rightVal: number): number => leftVal - rightVal

const operator = (op: Operation) => {
  if (op === Operation.Add) return { fn: sum, str: "+" }
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
  showPreviousAnswer: boolean
  correctAnswers?: number
}

export const Calculation: React.FC = () => {
  const [calculation, setCalculation] = useState<CalculationState>({ 
    leftVal: getRandomNumber(20),
    rightVal: getRandomNumber(20),
    operation: operator(randomEnum(Operation))
  })
  const [state, setState] = useReducer(
    (state: State, newState: State) => ({ ...state, ...newState }),
    { showPreviousAnswer: false, correctAnswers: 0 }
  )
  const [answer, setAnswer] = useState<number>()
  const prevAnswer = usePrevious<number | undefined>(answer)

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
        showPreviousAnswer: false,
        correctAnswers: (state.correctAnswers ? state.correctAnswers + 1 : 1)
      })
    } else {
      setState({ 
        showPreviousAnswer: true
      })
    }
  }

  useEffect(() => { 
    const newCalculation = (maxValue: number): void => {
      setCalculation({ 
        leftVal: getRandomNumber(maxValue),
        rightVal: getRandomNumber(maxValue),
        operation: operator(randomEnum(Operation))
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
        {state.showPreviousAnswer && 
          `Helaas ${prevAnswer} was niet goed, probeer het nog eens!`
        }
        {!state.showPreviousAnswer && state.correctAnswers !== 0 &&
          `Jaaa, je antwoord was goed!`
        }
      </div>
      <div>
        {`Correct antwoorden: ${state.correctAnswers}`}
      </div>
    </div>
  )
}