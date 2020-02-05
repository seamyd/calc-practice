import React from 'react'

interface Results { 
  incorrect?: number
  correct?: number
};

const Context = React.createContext<Results>({ correct: 0, incorrect: 0 })

export default Context
