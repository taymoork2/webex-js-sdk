require('dotenv').config();

const path = require('path');

const Netlify = require('netlify');
const rimraf = require('rimraf');
const webpack = require('webpack');

const netlify = new Netlify('');
const webpackConfig = require('../webpack.config')(
  process.env.JENKINS || process.env.CI ? 'production' : ''
);

webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) throw new Error('Webpack bundling failed ', err || stats.hasErrors());

  console.log(stats.toString({chunks: false, colors: true}));

  netlify
    .deploy({
      access_token: process.env.NETLIFY_ACCESS_TOKEN,
      site_id: process.env.USER + process.env.NETLIFY_SITE_ID,
      dir: path.resolve(process.cwd(), 'packages/node_modules/samples')
    })
    .catch((error) => {
      if (error) {
        throw new Error("Couldn't deploy to netlify ", error);
      }
    });
});
