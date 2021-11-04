/**
 * title: 打开一个新窗口2
 * desc: 最简单的用法。
 * transform: true
 */
import React from 'react';
import { Button, Space } from 'antd';
import { windowUtils } from './utils';

const handleOpenWindow = (top: string, left: string) => {
  windowUtils.openNewWindow({
    url: "http://www.baidu.com",
    width: 500,
    height: 300,
    otherSpecs: {
      top,
      left,
    },
  });
}

export default () => {
  return (
    <Space>
      <Button onClick={() => handleOpenWindow("100", "100")}>百 度【100,100】</Button>
      <Button onClick={() => handleOpenWindow("100", "500")}>百 度【100,500】</Button>
      <Button onClick={() => handleOpenWindow("400", "400")}>百 度【400,400】</Button>
      <Button onClick={() => handleOpenWindow("0", "0")}>百 度【0,0】</Button>
    </Space>
  );
};