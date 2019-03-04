/* eslint-disable require-jsdoc */
import path from 'path';

import express from 'express';
import Webpack from 'webpack';

require('dotenv').config();

/**
 *
 * Doc
 * @class WebpackService
 */
export default class WebpackService {
  onPrepare({
    staticServerFolders: folders,
    staticServerPort: port = 8000,
    staticServerMiddleware: middleware = [],
    webpackConfig
  }) {
    if (!folders || !webpackConfig) {
      return Promise.resolve();
    }

    this.folders = Array.isArray(folders) ? folders : [folders];
    this.port = port;
    this.webpackConfig = webpackConfig;

    this.server = express();
    this.bundler = Webpack(this.webpackConfig);

    folders.forEach((folder) => {
      console.log('Mounting folder `%s` at `%s`', path.resolve(folder.path), folder.mount);
      this.server.use(folder.mount, express.static(folder.path));
    });

    middleware.forEach((ware) => this.server.use(ware.mount, ware.middleware));

    return new Promise(async (resolve, reject) => {
      await this.bundler.run((err, stats) => {
        if (err) reject(err);

        console.log(
          '\n',
          stats.toString({
            chunks: false,
            colors: true,
            modules: false,
            version: false
          })
        );
      });

      this.server.listen(this.port, (error) => {
        if (error) reject(error);

        console.log(`\nStatic server running at http://localhost:${port}`);
        resolve();
      });
    });
  }
}
