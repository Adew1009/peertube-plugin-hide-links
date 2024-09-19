const esbuild = require('esbuild');
const path = require('path');

const clientFiles = ['common-client-plugin.js'];

const configs = clientFiles.map(f => ({
  entryPoints: [path.resolve(__dirname, '..', 'client', f)],
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'es2017',
  outfile: path.resolve(__dirname, '..', 'dist', f)
}));

Promise.all(configs.map(c => esbuild.build(c)))
  .catch(() => process.exit(1));
