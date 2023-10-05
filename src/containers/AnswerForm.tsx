import React, { useState, FormEvent } from 'react';
import styled from 'styled-components'

const StyledAnswerForm = styled.div`
	font-size: 2rem;
	padding: 1.5rem 1.5rem 1rem 1.5rem;

  input[type=submit],
  input[type=button],
  input[type=number],
  label {
	  color: #fff;
  }

  label {
    display:block;
    margin-bottom: 1rem;
  }
  
  input[type=number] {
    background: ${({ theme }) => theme.colors.compl.light};
    border: none;
    font-size: 3rem;
    margin-left: 1.5rem;
    border: 2px solid ${({ theme }) => theme.colors.compl.dim};
    width: 15rem;
    outline: none;
    padding: 0.5rem;
    font-style: italic;
  }
  
  input[type=number]:focus {
    border: 3px solid ${({ theme }) => theme.colors.compl.dark};
  }

  input[type=submit],
  input[type=button] {
    background: ${({ theme }) => theme.colors.prim.bright};
    border: none;
    padding: 1rem;
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.colors.compl.bright};
  }
  
  input[type=submit]:hover,
  input[type=button]:hover {
    background: ${({ theme }) => theme.colors.prim.veryLight};
  }
`

export interface AnswerFormProps {
  checkAnswer: (value: string) => void
}

export const AnswerForm: React.FC<AnswerFormProps> = ({ checkAnswer }) => {
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
    <StyledAnswerForm>
      <form onSubmit={onSubmit}>
        <label>
          Antwoord:
          <input
            autoFocus
            type="number"
            id="answer"
            name="answer"
            value={formState.answer}
            autoComplete="off"
            onChange={handleChange} />
        </label>
        <input type="submit" value="Controleer antwoord" />
      </form>
    </StyledAnswerForm>
  );
}