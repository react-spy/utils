---
  title: windowUtils
  order: 0
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
### 窗口位置
通过设置otherSpecs中的top、left，可以设置打开窗口的位置；如果不设置该参数，则默认垂直居中显示。如：
```tsx
/**
 * title: 窗口位置
 * transform: true
 */
import React from 'react';
import { Button, Space } from 'antd';
import { windowUtils } from '@react-spy/utils';

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
```
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
### 关闭窗口
通过调用windowUtils.closeCurrentWindow()，可以关闭当前窗口。

更多案例请参考下方API文档。

### API

### openNewWindow

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 跳转地址 | string |  |
| width | 窗口宽度 | number |  |
| height | 窗口高度 | number |  |
| target | 打开窗口的方式 | _blank、_self、_parent、_top | _blank |
| name | 窗口名称 | string |  |
| otherSpecs | 其他参数 | OtherSpecs |  |

### OtherSpecs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| channelmode | 设置与当前窗口的通道模式 | "0" 、 "1" 、 "yes" 、 "no" | "0" |
| directories | 设置与当前窗口的目录 | "0" 、 "1" 、 "yes" 、 "no" | "1" |
| fullscreen | 设置与当前窗口的全屏模式 | "0" 、 "1" 、 "yes" 、 "no" | "0" |
| width | 设置与当前窗口的宽度 | string | |
| height | 设置与当前窗口的高度 | string |  |
| top | 设置与当前窗口的顶部位置 | string |  |
| left | 设置与当前窗口的左边位置 | string |  |
| location | 设置与当前窗口的地址 | "0" 、 "1" 、 "yes" 、 "no" | "1" |
| menubar | 设置与当前窗口的菜单栏 | "0" 、 "1" 、 "yes" 、 "no" | "1" |
| resizable | 设置与当前窗口的大小 | "0" 、 "1" 、 "yes" 、 "no" | "1" |
| scrollbars | 设置与当前窗口的滚动条 | "0" 、 "1" 、 "yes" 、 "no" | "1" |
| status | 设置与当前窗口的状态栏 | "0" 、 "1" 、 "yes" 、 "no" | "1" |
| titlebar | 设置与当前窗口的标题栏 | "0" 、 "1" 、 "yes" 、 "no" | "1" |
| toolbar | 设置与当前窗口的工具栏 | "0" 、 "1" 、 "yes" 、 "no" | "1" |
