import React from 'react';
import { Action, ACTIONS } from '../Calculator/Calculator';

interface PropsType {
  dispatch: React.Dispatch<Action>;
  digit: string;
}

function DigitButton({ dispatch, digit }: PropsType) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.Add_digit, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

export default DigitButton;
