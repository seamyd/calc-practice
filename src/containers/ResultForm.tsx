import React, { useState, FormEvent } from 'react';

interface Props {
  checkAnswer: (value: string) => void
}

export const ResultForm: React.FC<Props> = ({ checkAnswer }) => {
  const [formState, setFormState] = useState({ answer: "" })

  const handleChange = (e: FormEvent<HTMLInputElement>) => setFormState({
    ...formState,
    [(e.target as HTMLInputElement).name]: [(e.target as HTMLInputElement).value]
  });

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault()
    checkAnswer(formState.answer)
    setFormState({ answer: "" })
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Answer:
        <input type="text" id="answer" name="answer" value={formState.answer} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}