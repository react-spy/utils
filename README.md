## 📚 文档

- [文档地址](https://spy-utils.vercel.app/)

## ✨ 特性

- 易学易用
- 包含大量提炼自业务的高级 utils
- 包含丰富的基础 utils
- 使用 TypeScript 构建，提供完整的类型定义文件

## 📦 安装

```bash
$ npm install --save @react-spy/utils
# or
$ yarn add @react-spy/utils
```

## 🔨 简单使用

```js
/**
 * title: 将一维数组数据转化为树形数据
 * transform: true
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { treeUtils } from '@react-spy/utils';
import ReactJson from 'react-json-view';

const data = [
  { id: 1, name: "办公管理", pid: 0 },
  { id: 8, name: "菜单设置", pid: 6 },
  { id: 3, name: "出差申请", pid: 1 },
  { id: 4, name: "请假记录", pid: 2 },
  { id: 5, name: "系统设置", pid: 0 },
  { id: 6, name: "权限管理", pid: 5 },
  { id: 2, name: "请假申请", pid: 1 },
  { id: 7, name: "用户角色", pid: 6 },
];

export default () => {

  const [list, setList] = useState<any>(data);

  const transformList = () => {
    const newList = treeUtils.toTree(data, { keyPropName: "id", parentPropName: "pid", childrenPropName: "children" });
    console.log(newList);
    setList(newList);
  }

  const transformListForId = () => {
    const newList = treeUtils.toTree(data, {
      keyPropName: "id",
      parentPropName: "pid",
      childrenPropName: "children",
      isRoot: (item: { [key: string]: any }) => {
        return item.id === 1; // 筛选id为1的数据作为根节点,根据实际业务需求筛选数据
      },
    });
    console.log(newList);
    setList(newList);
  }

  return (
    <div>
     <ReactJson
        src={list}
        collapsed={1}
        displayDataTypes={false}
        collapseStringsAfterLength={5}
      />
      <Space>
        <Button onClick={transformList} type="primary">转化数据</Button>
        <Button onClick={transformListForId} type="primary">转化数据(指定id=1为根节点)</Button>
        <Button onClick={() => setList(data)}>还 原</Button>
      </Space>
    </div>
  );
};
```
