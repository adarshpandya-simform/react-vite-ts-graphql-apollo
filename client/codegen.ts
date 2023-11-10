import type { CodegenConfig } from '@graphql-codegen/cli';
import { GRAPHQL_ENDPOINT } from './src/utils/constants';

const config: CodegenConfig = {
  schema: GRAPHQL_ENDPOINT,
  documents: 'src/**/*.gql',
  generates: {
    'src/graphql/generated/types.ts': { plugins: ['typescript'] },
    'src/graphql/generated': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'types.ts',
        folder: '../generated',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
  },
};
export default config;
