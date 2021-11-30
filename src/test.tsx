/**
 * title: 将一维数组数据转化为树形数据
 * transform: true
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { treeUtils } from './utils';
//  import { treeUtils } from '@react-spy/utils';

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
        return item.pid === 6; // 筛选id为6的数据作为根节点
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