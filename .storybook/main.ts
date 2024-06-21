import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
  ],
  webpackFinal: async (config) => {
    config.resolve
      ? (config.resolve.alias = {
          ...config.resolve.alias,
          '@pages': path.resolve(__dirname, '../src/pages'),
          '@components': path.resolve(__dirname, '../src/components'),
          '@ui': path.resolve(__dirname, '../src/components/ui'),
          '@ui-pages': path.resolve(__dirname, '../src/components/ui/pages'),
          '@utils': path.resolve(__dirname, '../src/utils/'),
          '@utils-types': path.resolve(__dirname, '../src/utils/types'),
          '@api': path.resolve(__dirname, '../src/utils/burger-api.ts'),
          '@services': path.resolve(__dirname, '../src/services/'),
          '@slices': path.resolve(__dirname, '../src/services/slices'),
          '@store': path.resolve(__dirname, '../src/services/store.ts'),
          '@hooks': path.resolve(__dirname, '../src/hooks')
        })
      : null;
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic'
        }
      }
    }
  }),
  docs: {
    autodocs: 'tag'
  }
};
export default config;
