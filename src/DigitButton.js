import React from 'react';
import { ACTIONS } from './Calculator';

function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.Add_digit, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

export default DigitButton;
