const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')
const withCSS = require('@zeit/next-css')

module.exports = withPlugins([
  [withTM, {
    transpileModules: ['rbx']
  }],
  withCSS,
]);
