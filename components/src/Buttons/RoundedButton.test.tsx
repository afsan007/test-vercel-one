import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RoundedButton } from './RoundedButton';

describe('Rounded button', () => {
  it(`should call 'onClick' on click`, () => {
    const onClick = jest.fn();
    const wrapper = render(
      <RoundedButton label="Click here" variant="contained" onClick={onClick}/>
    );

    fireEvent.click(wrapper.getByText('Click here'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});