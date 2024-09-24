const esbuild = require('esbuild');
const path = require('path');
// These lines import two Node.js modules:
// esbuild: A JavaScript bundler and minifier.
// path: Provides utilities for working with file and directory paths.

const clientFiles = ['common-client-plugin.js'];
// This array defines the client-side files that need to be bundled. In this case, it's just one file named 'common-client-plugin.js'.

const configs = clientFiles.map(f => ({
  entryPoints: [path.resolve(__dirname, '..', 'client', f)],
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'es2017',
  outfile: path.resolve(__dirname, '..', 'dist', f)
}));
// This array creates configurations for esbuild based on the client files defined earlier. Each configuration object specifies:
  // entryPoints: The entry point(s) for bundling. It uses the full path to the file.
  // bundle: Set to true, indicating that the file should be bundled.
  // minify: Set to true, enabling code minification.
  // format: Set to 'esm', meaning ECMAScript modules.
  // target: Set to 'es2017', targeting ES2017 features.
  // outfile: The output file path, relative to the current directory.

Promise.all(configs.map(c => esbuild.build(c)))
  .catch(() => process.exit(1));

// This final block sets up the build process:

// It maps over the configs array, creating promises for each build job.
// Promise.all() waits for all builds to complete simultaneously.
// If any build fails, it exits the process with a status code of 1.
// Purpose and Functionality
// This script is designed to bundle and minify JavaScript files for a client-side plugin. Its purpose is to:

// Take individual JavaScript files (in this case, just 'common-client-plugin.js').
// Bundle them together.
// Minify the resulting code for better performance.
// Output the bundled and minified code to a separate directory ('dist').
// The use of esbuild allows for fast and efficient bundling, especially useful during development or when working with large projects. The script ensures that all client-side files are properly prepared for deployment or integration into a larger application.

// This approach is common in modern web development workflows, particularly when dealing with plugins or libraries that need to be distributed efficiently across different environments.
