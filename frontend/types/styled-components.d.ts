import { Theme } from '@material-ui/core/styles';

declare module 'styled-components' {
  /* eslint-disable-next-line */
  export interface DefaultTheme extends Theme {}
}
