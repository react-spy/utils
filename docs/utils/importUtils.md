---
  title: importUtils
  order: 1
  nav:
     title: 工具集
     path: /utils
---

# importUtils -- 附件导出工具

## 代码演示

## 文件流附件下载

### 简单用法
```tsx | pure
/**
 * title: 文件流下载附件
 * transform: true
 */
import React from 'react';
import { Button } from 'antd';
import { importUtils } from '@react-spy/utils';

export default () => {

  const handleDownloadFile = () => {
    importUtils.downloadFileForGet({
      url: "/",
      fileName: "附件名称",
      fileSuffix: "xlsx",
      params: {},
      authorization: "xxxyyy",
      onFileChange: () => { },
    });
  }

  return (
    <div>
      <Button onClick={handleDownloadFile} type="primary">下载附件</Button>
    </div>
  );
};
```

### 使用umi-request下载附件
```tsx | pure
/**
 * title: umi-request 下载附件
 * desc: 如果您项目中使用了 umi-request，可以在 umi-request 中使用 downloadFile 方法下载附件
 * transform: true
 */
import React from 'react';
import { Button } from 'antd';
import request from 'umi-request';
import { importUtils } from '@react-spy/utils';

export default () => {

  const handleDownloadFile = () => {
    importUtils.downloadFileForUmi({
      request,
      url: "/",
      fileName: "附件名称",
      fileSuffix: "xlsx",
      params: {},
      authorization: "xxxyyy",
      onFileChange: () => { },
    });
  }

  return (
    <div>
      <Button onClick={handleDownloadFile} type="primary">umi-request下载附件</Button>
    </div>
  );
};
```


### API

### downloadFileForGet

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 接口地址 | string |  |
| fileName | 文件名称 | string | 附件 |
| fileSuffix | 文件后缀 | string | xlsx |
| params | 请求参数 | object | { } |
| authorization | 鉴权Token | string |  |
| onFileChange | 文件下载完成时回调 | function |  |


### downloadFileForUmi

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| request | 请求库 | any |  |
| url | 接口地址 | string |  |
| method | 请求方式 | GET、POST | GET |
| params | 请求参数 | object | { } |
| fileName | 文件名称 | string | 附件 |
| fileSuffix | 文件后缀 | string | xlsx |
| authorization | 鉴权Token | string |  |
| headers | 请求头参数 | object | { } |
| onFileChange | 文件下载完成时回调 | function |  |