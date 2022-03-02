import React, { useReducer } from 'react';
import './Calculator.css';
import DigitButton from './DigitButton';
import OperatorButton from './OperatorButton';

export const ACTIONS = {
  Add_digit: 'ADD_DIGIT',
  Add_operator: 'ADD_OPERATOR',
  Evaluate: 'EVALUATE',
  Clear: 'CLEAR',
  Delete: 'DELETE',
};

const initialState = {
  evaluated: false,
  currentOperand: null,
  previousOperand: null,
  operator: null,
};

/**
 * Evaluate the result based on operands and operator passed in state.
 * @param param0 - State object with currentOperand, previousOperand, and operator property
 * @returns The result of the calculation.
 */
const evaluate = ({ currentOperand, previousOperand, operator }) => {
  let prev = parseFloat(previousOperand);
  let current = parseFloat(currentOperand);
  let computation;
  if (isNaN(prev) || isNaN(current)) return '';
  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      computation = '';
      break;
  }
  return computation.toString();
};

const calReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.Add_digit:
      // When press digit button right after last evaluation =. Reset state
      if (state.evaluated) {
        return {
          ...state,
          currentOperand: payload.digit,
          evaluated: false,
          previousOperand: null,
          operator: null,
        };
      }

      // Prevent two zeros
      if (payload.digit === '0' && state.currentOperand === '0') return state;

      // Replace 0 with the digit clicked.
      if (payload.digit !== '.' && state.currentOperand === '0') {
        return { ...state, currentOperand: payload.digit };
      }

      // Prevent multiple decimal dots
      if (payload.digit === '.' && state.currentOperand?.includes('.'))
        return state;

      // Default behavior, append the digit to current operand.
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case ACTIONS.Add_operator:
      // Prevent adding operators before entering the numbers.
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      // We have the previous operand and operator, update the operator
      if (state.currentOperand == null) {
        return {
          ...state,
          operator: payload.operator,
        };
      }

      // Pass current operand to previous operand, update operator.
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operator: payload.operator,
          currentOperand: null,
        };
      }

      // Default behavior, evaluate current operands and get intermediate result
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operator: payload.operator,
      };
    case ACTIONS.Clear:
      // Reset every thing
      return {
        previousOperand: null,
        currentOperand: null,
        operator: null,
        evaluated: false,
      };
    case ACTIONS.Evaluate:
      // If the operands are not valid, do nothing.
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operator == null
      ) {
        return state;
      }
      return {
        ...state,
        previousOperand: null,
        operator: null,
        currentOperand: evaluate(state),
        evaluated: true,
      };
    case ACTIONS.Delete:
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
    default:
      return state;
  }
};

const Calculator = () => {
  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
    calReducer,
    initialState
  );
  return (
    <div className='calculator-grid'>
      <div className='output'>
        <p className='previous-operand'>
          {previousOperand}
          {operator}
        </p>
        <p className='current-operand'>{currentOperand}</p>
      </div>
      <button
        className='span-2'
        onClick={() => dispatch({ type: ACTIONS.Clear })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.Delete })}>DEL</button>
      <OperatorButton dispatch={dispatch} operator='/' />
      <DigitButton dispatch={dispatch} digit='7' />
      <DigitButton dispatch={dispatch} digit='8' />
      <DigitButton dispatch={dispatch} digit='9' />
      <OperatorButton dispatch={dispatch} operator='*' />
      <DigitButton dispatch={dispatch} digit='4' />
      <DigitButton dispatch={dispatch} digit='5' />
      <DigitButton dispatch={dispatch} digit='6' />
      <OperatorButton dispatch={dispatch} operator='-' />
      <DigitButton dispatch={dispatch} digit='1' />
      <DigitButton dispatch={dispatch} digit='2' />
      <DigitButton dispatch={dispatch} digit='3' />
      <OperatorButton dispatch={dispatch} operator='+' />
      <DigitButton dispatch={dispatch} digit='0' />
      <DigitButton dispatch={dispatch} digit='.' />

      <button
        className='btn-evaluate span-2'
        onClick={() => dispatch({ type: ACTIONS.Evaluate })}
      >
        =
      </button>
    </div>
  );
};

export default Calculator;
