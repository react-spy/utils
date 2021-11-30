---
  title: treeUtils
  order: 1
  nav:
     title: 工具集
     path: /utils
---

# treeUtils -- 树形数据处理工具

## 代码演示


### 将一维数组数据转化为树形数据
```tsx
/**
 * title: 将一维数组数据转化为树形数据
 * transform: true
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { treeUtils } from '@react-spy/utils';

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
        return item.pid === 1; // 筛选pid为1的数据作为根节点,根据实际业务需求筛选数据
      },
    });
    console.log(newList);
    setList(newList);
  }

  return (
    <div>
      <pre>{JSON.stringify(list, null, 2)}</pre>
      <Space>
        <Button onClick={transformList} type="primary">转化数据</Button>
        <Button onClick={transformListForId} type="primary">转化数据(指定根节点)</Button>
        <Button onClick={() => setList(data)}>还 原</Button>
      </Space>
    </div>
  );
};
```

### 自定义排序
```tsx
/**
 * title: 树形数据自定义排序
 * transform: true
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { treeUtils } from '@react-spy/utils';

const defaultTreeList = [
  {
    "id": 1,
    "name": "办公管理",
    "pid": 0,
    "children": [
      {
        "id": 3,
        "name": "出差申请",
        "pid": 1,
        "children": null
      },
      {
        "id": 2,
        "name": "请假申请",
        "pid": 1,
        "children": [
          {
            "id": 4,
            "name": "请假记录",
            "pid": 2,
            "children": null
          }
        ]
      },
    ]
  },
  {
    "id": 5,
    "name": "系统设置",
    "pid": 0,
    "children": [
      {
        "id": 6,
        "name": "权限管理",
        "pid": 5,
        "children": [
          {
            "id": 8,
            "name": "菜单设置",
            "pid": 6,
            "children": null
          },
          {
            "id": 7,
            "name": "用户角色",
            "pid": 6,
            "children": null
          },
        ]
      }
    ]
  }
];

export default () => {

  const [treeList, setTreeList] = useState(defaultTreeList);

  // 正序
  const sortFn1 = () => {
    const newList = treeUtils.sortTree(defaultTreeList, (a, b) => {
      return a.id - b.id; // 根据业务需要，调整排序逻辑
    }, { childrenPropName: "children" });
    console.log(newList);
    setTreeList(newList);
  }

  // 倒序
  const sortFn2 = () => {
    const newList = treeUtils.sortTree(defaultTreeList, (a, b) => {
      return b.id - a.id; // 根据业务需要，调整排序逻辑
    }, { childrenPropName: "children" });
    console.log(newList);
    setTreeList(newList);
  }

  return (
    <div>
      <pre>{JSON.stringify(treeList, null, 2)}</pre>
      <Space>
          <Button onClick={sortFn1} type="primary">排 序(以id正序排序)</Button>
          <Button onClick={sortFn2} type="primary">排 序(以id倒序排序)</Button>
          <Button onClick={() => setTreeList(defaultTreeList)}>还 原</Button>
      </Space>
    </div>
  );
};
```


### API

### toTree
| 参数    | 说明     | 类型    | 默认值 |
|---------|--------|---------|--------|
| data    | 一维数组 | Array   |        |
| options | 配置项   | Options | 附件   |

#### Options
| 参数             | 说明           | 类型   | 默认值   |
|------------------|--------------|--------|----------|
| keyPropName      | 主键字段名称   | string | key      |
| parentPropName   | 父主键字段名称 | string | parent   |
| childrenPropName | 下级字段名称   | string | children |

### sortTree
| 参数     | 说明     | 类型            | 默认值                           |
|----------|--------|-----------------|----------------------------------|
| treeList | 树形数组 | Array           | [ ]                              |
| sortFn   | 排序函数 | (a, b)=> number |                                  |
| options  | 配置项   | object          | { childrenPropName: "children" } |