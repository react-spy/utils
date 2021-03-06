## ð ææ¡£

- [ææ¡£å°å](https://spy-utils.vercel.app/)

## â¨ ç¹æ§

- æå­¦æç¨
- åå«å¤§éæç¼èªä¸å¡çé«çº§ utils
- åå«ä¸°å¯çåºç¡ utils
- ä½¿ç¨ TypeScript æå»ºï¼æä¾å®æ´çç±»åå®ä¹æä»¶

## ð¦ å®è£

```bash
$ npm install --save @react-spy/utils
# or
$ yarn add @react-spy/utils
```

## ð¨ ç®åä½¿ç¨

```js
/**
 * title: å°ä¸ç»´æ°ç»æ°æ®è½¬åä¸ºæ å½¢æ°æ®
 * transform: true
 */
import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { treeUtils } from '@react-spy/utils';
import ReactJson from 'react-json-view';

const data = [
  { id: 1, name: "åå¬ç®¡ç", pid: 0 },
  { id: 8, name: "èåè®¾ç½®", pid: 6 },
  { id: 3, name: "åºå·®ç³è¯·", pid: 1 },
  { id: 4, name: "è¯·åè®°å½", pid: 2 },
  { id: 5, name: "ç³»ç»è®¾ç½®", pid: 0 },
  { id: 6, name: "æéç®¡ç", pid: 5 },
  { id: 2, name: "è¯·åç³è¯·", pid: 1 },
  { id: 7, name: "ç¨æ·è§è²", pid: 6 },
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
        return item.id === 1; // ç­éidä¸º1çæ°æ®ä½ä¸ºæ ¹èç¹,æ ¹æ®å®éä¸å¡éæ±ç­éæ°æ®
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
        <Button onClick={transformList} type="primary">è½¬åæ°æ®</Button>
        <Button onClick={transformListForId} type="primary">è½¬åæ°æ®(æå®id=1ä¸ºæ ¹èç¹)</Button>
        <Button onClick={() => setList(data)}>è¿ å</Button>
      </Space>
    </div>
  );
};
```
