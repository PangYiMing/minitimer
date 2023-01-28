/*
 * @Author: pym
 * @Date: 2022-01-04 11:51:03
 * @LastEditors: pym
 * @Description:
 * @LastEditTime: 2022-07-26 22:44:45
 */
import React, { useEffect, useState } from 'react';
import { timer } from '../../utils/timer';
import './index.less';

function Home() {
  const [time, setTime] = useState('00:00:00');
  const [t, setT] = useState(0);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('t')) {
      setT(parseInt(searchParams.get('t') || '0'));
    }

    return () => {};
  }, []);

  // fetch('/tripdocs/test/api', { method: 'POST' });
  return (
    <>
      <div>timer: {time}</div>

      <button
        onClick={() => {
          timer(t, setTime);
          // for (var i = 0; i < 3; i++) {
          //   var n = new Notification('Hi,' + i);
          // }
        }}
      >
        start {t}
      </button>
      <div>可以通过query指定倒计时时间(单位毫秒)，比如 {location.protocol + '://' + location.host + (location.pathname || '') + '?t=10000'}</div>
    </>
  );
}

export default Home;
