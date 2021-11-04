/**
 * title: 打开一个新窗口2
 * desc: 最简单的用法。
 * transform: true
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import { windowUtils } from './utils';


export default () => {

  const [text, setText] = useState("模拟打开新窗口");

  const handleOpenWindow = () => {
    windowUtils.openNewWindow({
      url: "http://www.baidu.com",
      width: 500,
      height: 300,
      target: "_self",
    });
  }

  return (
    <div>
      <Button onClick={handleOpenWindow}>{text}</Button>
    </div>
  );
};