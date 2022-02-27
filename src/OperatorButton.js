import React from 'react';
import { ACTIONS } from './Calculator';

function OperatorButton({ dispatch, operator }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.Add_operator, payload: { operator } })
      }
    >
      {operator}
    </button>
  );
}

export default OperatorButton;
