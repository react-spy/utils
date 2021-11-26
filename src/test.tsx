/**
 * title: umi-request 下载附件
 * desc: 如果您项目中使用了 umi-request，可以在 umi-request 中使用 downloadFile 方法下载附件
 * transform: true
 */
import React from 'react';
import { Button } from 'antd';
import { importUtils } from './utils';

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