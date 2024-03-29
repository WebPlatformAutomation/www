module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  env: {
    debug: {
      sourceMaps: true,
      retainLines: true,
    },
  },
};
