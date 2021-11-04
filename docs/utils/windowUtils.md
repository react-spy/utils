---
  title: windowUtils
  nav:
     title: 工具集
     path: /utils
---

# windowUtils -- 浏览器窗口工具

## 代码演示

## 打开一个新窗口

### 简单用法
```tsx
/**
 * title: 简单用法
 * transform: true
 */
import React from 'react';
import { Button } from 'antd';
import { windowUtils } from '@react-spy/utils';

const handleOpenWindow = ()=>{
  windowUtils.openNewWindow({ url :"http://www.baidu.com" });
}

export default () => {
  return (
    <Button onClick={handleOpenWindow}>百 度</Button>
  );
};
```
### 打开窗口方式
通过设置target，可以指定打开窗口的方式，如：
```tsx
/**
 * title: 打开窗口方式
 * transform: true
 */
import React from 'react';
import { Button, Space } from 'antd';
import { windowUtils } from '@react-spy/utils';

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
            <Button key={target} onClick={() => handleOpenWindow(target)}>百 度【{target}】</Button>
          )
        })
      }
    </Space>
  );
};
```
### 窗口宽高
通过设置width、height，可以设置打开窗口的宽度、高度，如：
```tsx
/**
 * title: 窗口宽高
 * transform: true
 */
import React from 'react';
import { Button, Space } from 'antd';
import { windowUtils } from '@react-spy/utils';

const numList = [300, 500, 800, 1200];

const handleOpenWindow = (width: number, height: number) => {
  windowUtils.openNewWindow({ url: "http://www.baidu.com", width, height });
}

export default () => {
  return (
    <Space>
      {
        numList.map(n => {
          return (
            <Button key={n} onClick={() => handleOpenWindow(n, n)}>百 度【{n}px,{n}px】</Button>
          )
        })
      }
    </Space>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
