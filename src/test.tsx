/**
 * title: 查询函数
 * transform: true
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import ReactJson from 'react-json-view';
import { treeUtils } from './utils';
// import { treeUtils } from '@react-spy/utils';

const treeList = [
  {
    "id": 1,
    "name": "办公管理",
    "pid": 0,
    "children": [
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
      {
        "id": 3,
        "name": "出差申请",
        "pid": 1,
        "children": null
      }
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
            "id": 7,
            "name": "用户角色",
            "pid": 6,
            "children": null
          },
          {
            "id": 8,
            "name": "菜单设置",
            "pid": 6,
            "children": null
          }
        ]
      }
    ]
  }
];

const treeAgent = new treeUtils.TreeAgent(treeList, {
  keyPropName: "id",
  parentPropName: "pid",
  childrenPropName: "children",
});

export default () => {

  const [data, setData] = useState(treeList);

  // 查询完整tree
  const getTree = () => {
    const newData = treeAgent.getTree();
    console.log(newData);
    setData(newData);
  }

  // 查询指定树节点信息
  const getNode = () => {
    const newData = treeAgent.getNode(5);
    console.log(newData);
    setData(newData);
  }

  return (
    <div>
      <ReactJson
        src={data}
        collapsed={2}
        displayDataTypes={false}
        collapseStringsAfterLength={5}
      />
      <Space>
        <Button onClick={getTree} type="primary">查询完整树</Button>
        <Button onClick={getNode} type="primary">查询id为5树节点</Button>
        <Button onClick={() => setData(treeList)}>还 原</Button>
      </Space>
    </div>
  );
};