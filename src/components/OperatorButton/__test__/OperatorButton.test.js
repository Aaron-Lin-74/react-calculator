import React from 'react';
import ReactDOM from 'react-dom';
import { screen, cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import OperatorButton from '../OperatorButton';

afterEach(cleanup);
it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OperatorButton></OperatorButton>, div);
});

it('should render button correctly', () => {
  render(<OperatorButton operator={'*'}></OperatorButton>);
  expect(screen.getByRole('button')).toHaveTextContent('*');
});
