import React from 'react';
import { Action, ACTIONS } from './Calculator';

function OperatorButton({
  dispatch,
  operator,
}: {
  dispatch: React.Dispatch<Action>;
  operator: string;
}) {
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
