import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/styles';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { withKnobs } from '@storybook/addon-knobs';
import { themes } from '@storybook/theming';
import { createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  // Material-UI override properties
});


addDecorator(withKnobs);
addDecorator((story) => {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <SCThemeProvider theme={muiTheme}>
            {story()}
        </SCThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
});

const ordering = ['Application', 'Atoms'];
const getDirectoryDepth = (path: string) => path.match(/\//g)?.length ?? 0
// Option defaults.
addParameters({
  options: {
    theme: themes.light,
    storySort: ([, a], [, b]) => {
      if(a.kind === b.kind) {
        return 0;
      }
      // order root categories
      const aKind = a.kind.match(/(\w*)(\s*)|/)[1];
      const bKind = b.kind.match(/(\w*)(\s*)|/)[1];
      if (aKind !== bKind) {
        return ordering.indexOf(aKind) - ordering.indexOf(bKind);
      }
      // this sorts folders on top of everything
      if (getDirectoryDepth(a.kind) > getDirectoryDepth(b.kind)) {
        return -1;
      }
      return a.kind.localeCompare(b.kind);
    }
  },
});
