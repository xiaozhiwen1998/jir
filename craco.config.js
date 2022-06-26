/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#8d1af2' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
