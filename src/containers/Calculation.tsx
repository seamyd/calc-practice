import React, { useState } from 'react';

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
  const [calculation, setCalculation] = useState<CalculationState>({ leftVal: 0, rightVal: 0, operation: undefined })
  const [result, setResult] = useState<number | undefined>()
  
  enum Operation { Add, Sub }

  const sum = (leftVal: number, rightVal: number): number => leftVal + rightVal
  const sub = (leftVal: number, rightVal: number): number => leftVal - rightVal

  const operator = (op: Operation) => {
    if (op === Operation.Add) return { fn: sum, str: "+" }
    return { fn: sub, str: "-" }
  }

  const getRandomNumber = (maxValue: number) =>
    Math.floor(Math.random() * maxValue)

  const newCalculation = (): void => {
    setCalculation({ 
      leftVal: getRandomNumber(20),
      rightVal: getRandomNumber(20),
      operation: operator(randomEnum(Operation))
    })
  }

  const calculateResult = () => {
    if (calculation.operation)
      setResult(
        calculation.operation.fn(calculation.leftVal, calculation.rightVal)
      )
  }

  return (
    <div>
      <div>
        {calculation.operation && (
          `${calculation.leftVal} ${calculation.operation?.str} ${calculation.rightVal}`
        )}
      </div>
      <div>
        {result && 
          `${result}`
        }
      </div>
      <div>
        <button onClick={newCalculation}>{"New"}</button>
        <button onClick={calculateResult}>{"Show result"}</button>
      </div>
    </div>
  )
}