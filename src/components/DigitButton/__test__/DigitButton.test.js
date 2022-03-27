import React from 'react';
import ReactDOM from 'react-dom';
import DigitButton from '../DigitButton';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);
it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DigitButton></DigitButton>, div);
});

it('should render button correctly', () => {
  render(<DigitButton digit={'1'}></DigitButton>);
  expect(screen.getByRole('button')).toHaveTextContent('1');
});
