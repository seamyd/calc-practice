import React, { useState, FormEvent } from 'react';
import styled from 'styled-components'

const StyledAnswerForm = styled.div`
	width: 200px;
	font-size: 2rem;
	padding: 15px 15px 10px 15px;

  input[type=submit],
  input[type=button],
  input[type=text],
  label {
	  color: #fff;
  }

  label {
    display:block;
    margin-bottom: 10px;
  }
  
  input[type=text] {
    background: transparent;
    border: none;
    font-size: 3rem;
    border-bottom: 1px dashed #83A4C5;
    width: 150px;
    outline: none;
    padding: 5px 5px 5px 5px;
    font-style: italic;
  }
  
  input[type=text]:focus {
    border-bottom: 1px dashed #D9FFA9;
  }

  input[type=submit],
  input[type=button] {
    background: #576E86;
    border: none;
    padding: 8px 10px 8px 10px;
    border-radius: 5px;
    color: #A8BACE;
  }
  
  input[type=submit]:hover,
  input[type=button]:hover {
    background: #394D61;
  }
`

interface Props {
  checkAnswer: (value: string) => void
}

export const AnswerForm: React.FC<Props> = ({ checkAnswer }) => {
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
            type="text"
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