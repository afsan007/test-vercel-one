/* eslint-disable react/display-name, no-empty-function, @typescript-eslint/no-var-requires */
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
registerRequireContextHook();

jest.mock('@storybook/addon-info', () => {
  const { makeDecorator } = require('@storybook/addons');
  const React = require('react');
  return {
    withInfo: makeDecorator({
      name: 'withInfo',
      parameterName: 'info',
      allowDeprecatedUsage: true,
      wrapper: (Story, context, { options, parameters }) =>
        React.createElement(Story, { name: '', kind: '', parameters: {} }),
    }),
    setDefaults: () => {},
  };
});
