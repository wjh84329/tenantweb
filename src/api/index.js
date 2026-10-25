/*
 * @Description: 所有请求的接口入口
 * @Author: gao shuai
 * @Date: 2020-02-25 15:35:05
 * @LastEditTime: 2020-06-06 14:53:12
 * @LastEditors: gao shuai
 */

import partinstall from './partinstall';
import partmodule from './partModule';
import groupmange from './groupmange';
import home from './home';
import userLog from './userLog';
import personCenter from './personCenter';
import reorder from './reorder';
import withdraw from './withdraw';
import order from './order';
import agent from './agent';
import getcode from './getcode';
import statics from './static';
import login from './login';
import employee from './employee';
import space from './space';
const _api = {
  partinstall,
  partmodule,
  groupmange,
  home,
  userLog,
  personCenter,
  reorder,
  withdraw,
  order,
  agent,
  getcode,
  statics,
  login,
  employee,
  space
};

export default _api;
