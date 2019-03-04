/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

const path = require('path');

const Netlify = require('netlify');

const netlify = new Netlify('');
const {exec} = require('../lib/async');
const {buildSamples} = require('../lib/build');

exports.deploy = async function deploy() {
  // await buildSamples();

  // netlify
  //   .deploy({
  //     access_token: process.env.NETLIFY_ACCESS_TOKEN,
  //     site_id: process.env.USER + process.env.NETLIFY_SITE_ID,
  //     dir: path.resolve(process.cwd(), 'packages/node_modules/samples')
  //   })
  //   .catch((error) => {
  //     if (error) {
  //       throw new Error("Couldn't deploy to netlify ", error);
  //     }
  //   });
};

