/*
 * @Author: pym
 * @Date: 2022-01-04 11:51:03
 * @LastEditors: pym
 * @Description:
 * @LastEditTime: 2022-07-26 23:12:38
 */
import ReactDOM, { render } from 'react-dom';
import React from 'react';
import './index.less';
import Home from './pages/home/index';
function start() {
  // fetch('/tripdocs/test/api', { method: 'POST' });
  render(<Home></Home>, document.getElementById('root'));
}

setTimeout(() => {
  start();
}, 1000);
