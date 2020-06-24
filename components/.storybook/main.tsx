import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: { parser: 'typescript' }
      }
    }
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
        },
        require.resolve('react-docgen-typescript-loader'),
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        watch: ['./src', './.storybook'],
        checkSyntacticErrors: true,
        useTypescriptIncrementalApi: true,
      }),
    );

    return config;
  },
}
