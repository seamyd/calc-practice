import React from 'react';

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  return enumValues[randomIndex]
}

export const Assignment: React.FC = () => {

  enum Operation {
    Add,
    Sub
  }

  const operator = (op: Operation) => {
    if (op === Operation.Add) return "+"
    return "-"
  }

  const getRandomNumber = (maxValue: number) => 
    Math.floor(Math.random() * maxValue)
  
  return (
    <div>
      {getRandomNumber(20)} {operator(randomEnum(Operation))} {getRandomNumber(20)}
    </div>
  )
}