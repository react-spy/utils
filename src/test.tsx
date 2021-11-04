/**
 * title: 打开一个新窗口2
 * desc: 最简单的用法。
 * transform: true
 */
import React from 'react';
import { Button, Space } from 'antd';
import { windowUtils } from './utils';


const targetList = ["_blank", "_self", "_parent", "_top"];

const handleOpenWindow = (target: string) => {
  windowUtils.openNewWindow({ url: "http://www.baidu.com", target });
}

export default () => {
  return (
    <Space>
      {
        targetList.map(target => {
          return (
            <Button key={target} onClick={() => handleOpenWindow(target)}>{target}</Button>
          )
        })
      }
    </Space>
  );
};