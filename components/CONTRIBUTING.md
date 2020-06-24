Check [`Buttons/RoundedButton`](./src/Buttons/RoundedButton.tsx) for a full example.


# Steps to create new components and stories:
1. Create A folder for component and put your component, sub-components and dependencies inside it.
Although you can have desired folder structure inside but try to keep it simple. If you have to create many sub-components it maybe better to create stories (and other root folders) for them and make them reusable/documented too.
- It's ok to have dependencies to other components in storybook.

Example:

```
  - Buttons
    - RoundedButton
      - Icon.tsx <- Example of an sub-component inside a folder named like component.
    - RoundedButton.tsx <- Is the actual component.
    - RoundedButton.stories.tsx <- Is the story file.
```

2. Create a file named like your component with `.stories.tsx` extention.

3. Import the file in `stories.tsx`. like: `import './Buttons/RoundedButton';`

4. Inside your storybook file you should explain all the features and abilities of your component in different stories.
Adding different props or different usage situations. This is much like writing unit tests.

Example:

```typescript
import React from 'react';
import { RoundedButton } from './RoundedButton';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Atoms | Buttons / RoundedButton',
  component: RoundedButton,
};

export const ContainedButton = () => {
  const onClick = action('onClick');
  return <RoundedButton onClick={onClick} label="Sign up" variant="contained"/>;
};
```

# Tests

Also you should write tests for things other than component `props`, like actions and effects.

Create test file beside your component, and test:
- Actions (like click and callbacks)
- Effects (like saving to localstorage)
- Component conditions

```
  - Buttons
    - RoundButton
      - Icon.tsx <- Example of an sub-component inside a folder named like component.
    - RoundButton.tsx <- Is the actual component.
    - RoundButton.stories.tsx <- Is the story file.
    - RoundButton.test.tsx <- Is the test file.
```

Example:

```typescript
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
```

# Component notes and description

`docgen` will automatically generate a props description from your typescript code.

It reads your `props` type and shows it in storybook. You can add descriptions to each prop.

Read more at [React Docgen](https://github.com/styleguidist/react-docgen-typescript).

```typescript
/**
 * Component Properties.
 */
export interface IProps {
  /** color of background of that thing */
  color: ColorProperty;
  /** A callback function to get click event */
  onClick: () => void;
}


/**
 * Component description stuff.
 */
export const Component = (props: IProps) =>
```

# Using addons

## Knobs

Make props customizable inside storybook using `addon-knobs`.

[You can see the list of available knobs here.](https://www.npmjs.com/package/@storybook/addon-knobs#available-knobs)

Example:

```typescript
import React from 'react';
import { color } from '@storybook/addon-knobs';

export const ColorText = () => {
  const label = "Text Colour";
  const defaultColor = "lightblue";
  const value = color(label, defaultColor);

  return (
    <div style={{color: value}}>
      Colorful Text
    </div>
  )
};
```

## Actions

Log actions in actions panel, so that users can easily see them in storybook, not in browser console.

Example:

```typescript
import React from 'react';
import { RoundedButton } from './RoundedButton';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Atoms | Buttons / RoundedButton',
  component: RoundedButton,
};

export const ContainedButton = () => {
  const onClick = action('onClick');
  return <RoundedButton onClick={onClick} label="Sign up" variant="contained"/>;
};
```
