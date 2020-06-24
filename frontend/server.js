/* eslint-disable no-console */
require('dotenv').config();
const moduleAlias = require('module-alias');
const singleInstanceModules = require('./singleInstanceModules');
moduleAlias.addAliases(singleInstanceModules);

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`[ info ]  Ready on http://localhost:${port}`);
  });
});
