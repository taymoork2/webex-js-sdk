/*!
 * Copyright (c) 2015-2017 Cisco Systems, Inc. See LICENSE file.
 */

const wrapHandler = require('../lib/wrap-handler');
const {deploy: netlifyDeploy} = require('../lib/netlify');

module.exports = {
  command: 'netlify',
  desc: 'Deploy samples to netlify',
  builder: {},
  handler: wrapHandler(() => netlifyDeploy())
};
