// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSequelizemeta = require('../../../app/model/sequelizemeta');
import ExportUsers = require('../../../app/model/users');

declare module 'egg' {
  interface IModel {
    Sequelizemeta: ReturnType<typeof ExportSequelizemeta>;
    Users: ReturnType<typeof ExportUsers>;
  }
}
