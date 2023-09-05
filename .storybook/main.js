const path = require('path');

module.exports = {
  features: {
    postcss: false
  },
  typescript: {
    reactDocgen: 'none'
  },
  stories: ['../src/presentation/components/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: config => {
    config.resolve.modules.push(`${process.cwd()}/src`);
    config.resolve.alias = {
      '@': path.resolve(__dirname, '..', 'src')
    };
    return config;
  },
  core: {
    builder: 'webpack5'
  }
};