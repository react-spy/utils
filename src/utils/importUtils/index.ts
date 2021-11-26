/**
 * 导出工具类
 * @author SPY
 */
import qs from 'querystring';

export interface DownLoadFileProps {
    url: string; // 下载地址
    params?: any; // 请求参数
    fileName?: string; // 文件名
    fileSuffix?: string; // 文件后缀
    authorization?: string; // token
    onFileChange?: (b: boolean) => void;
}

type DownloadFileForUmiProps = DownLoadFileProps & {
    method?: 'GET' | 'POST'; // 请求方式
    request: any; // 传入umi-request
    headers?: object; // 请求头
}

const importUtils = {
    /**
      * 文件下载
      * @param {string} fileName -- 附件名称
      * @param {string} url -- 附件下载地址
      * @param {object} params -- 附件请求参数
      */
    downloadFileForGet: ({
        url,
        fileName = '附件',
        fileSuffix = "xlsx",
        params = {},
        authorization,
        onFileChange,
    }: DownLoadFileProps) => {

        if (typeof onFileChange === 'function') onFileChange(true);

        const xhr = new XMLHttpRequest();
        // GET请求，请求路径url,是否异步async
        xhr.open("GET", `${url}?${qs.stringify(params)}`, true);

        if (authorization) {
            // 设置请求头参数的方式
            xhr.setRequestHeader('Authorization', authorization);
        }

        // 设置响应类型为 blob
        xhr.responseType = "blob";

        xhr.onload = function (e) {
            if (this.status === 200) {
                // 请求成功
                const blob = this.response;
                // blob.type = "application/octet-stream";
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = `${fileName}.${fileSuffix}`;
                a.click();

                if (typeof onFileChange === 'function') onFileChange(false);

                // 释放之前创建的URL对象
                URL.revokeObjectURL(url);
            }
        }

        // 发送请求
        xhr.send();
    },

    /**
     * 使用umi-request下载文件
     * @param param0 
     */
    downloadFileForUmi: ({
        request,
        method = "GET",
        params = {},
        url,
        headers = {},
        fileName = '附件',
        fileSuffix = "xlsx",
        authorization,
        onFileChange,
    }: DownloadFileForUmiProps) => {
        if (typeof onFileChange === 'function') onFileChange(true);
        let queryParams = {};
        if (method === 'GET') {
            queryParams = { params };
        } else {
            queryParams = { data: params };
        }
        request(url, {
            method,
            ...queryParams,
            responseType: 'blob',
            headers: {
                "Authorization": authorization,
                ...headers,
            }
        }).then((res: any) => {
            if (res.status === 200) {
                const blob = new Blob([res], { type: 'application/octet-stream' });
                if (!blob || blob.size === 0) {
                    console.error('下载文件失败');
                    return;
                };
                const url = URL.createObjectURL(blob);

                let a = document.createElement("a");
                a.href = url;
                a.download = `${fileName}.${fileSuffix}`;
                a.click();

                if (typeof onFileChange === 'function') onFileChange(false);

                // 释放之前创建的URL对象
                URL.revokeObjectURL(url);
            }
        }).catch((err: any) => {
            console.error(err);
        });
    }
};
export default importUtils;