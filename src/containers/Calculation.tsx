import React, { useState } from 'react';
import { ResultForm } from './ResultForm';

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  return enumValues[randomIndex]
}

interface CalculationState {
  leftVal: number
  rightVal: number
  operation?: {
    fn: (leftVal: number, rightVal: number) => number
    str: string
  }
}

export const Calculation: React.FC = () => {
  enum Operation { Add, Sub }

  const sum = (leftVal: number, rightVal: number): number => leftVal + rightVal
  const sub = (leftVal: number, rightVal: number): number => leftVal - rightVal

  const getRandomNumber = (maxValue: number) =>
    Math.floor(Math.random() * maxValue)

  const operator = (op: Operation) => {
    if (op === Operation.Add) return { fn: sum, str: "+" }
    return { fn: sub, str: "-" }
  }

  const [calculation, setCalculation] = useState<CalculationState>({ 
    leftVal: getRandomNumber(20),
    rightVal: getRandomNumber(20),
    operation: operator(randomEnum(Operation))
  })
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  
  const calculateResult = (): number | null => {
    if (calculation.operation)
      return calculation.operation.fn(calculation.leftVal, calculation.rightVal)
    return null
  }

  const newCalculation = (): void => {
    setCalculation({ 
      leftVal: getRandomNumber(20),
      rightVal: getRandomNumber(20),
      operation: operator(randomEnum(Operation))
    })
  }

  const checkAnswer = (value: string): void => {
    if (Number.parseInt(value) === calculateResult()) 
      setCorrectAnswers(correctAnswers + 1)
  }

  return (
    <div>
      <div>
        {calculation.operation && (
          `${calculation.leftVal} ${calculation.operation?.str} ${calculation.rightVal}`
        )}
      </div>
      <div>
        <ResultForm checkAnswer={checkAnswer} />
      </div>
      <div>
        {`Correct antwoorden: ${correctAnswers}`}
      </div>
      <div>
        <button onClick={newCalculation}>{"New"}</button>
        <button onClick={calculateResult}>{"Show result"}</button>
      </div>
    </div>
  )
}