/**
 * 浏览器窗口工具
 * @author SPY
 */
export type TargetType = "_blank" | "_self" | "_parent" | "_top";
export type OType = "0" | "1" | "yes" | "no";
export type OtherSpecsProps = {
    channelmode?: OType; // 是否要在影院模式显示 window。默认是没有的。仅限IE浏览器
    directories?: OType; // 是否要在地址栏中显示目录。默认是有的。仅限IE浏览器
    fullscreen?: OType; // 是否要在全屏模式显示 window。默认是没有的。仅限IE浏览器
    height?: string; // 窗口的高度
    left?: string; // 窗口的左边界
    location?: OType; // 是否要在地址栏中显示网址。默认是有的
    menubar?: OType; // 是否要在菜单栏中显示网址。默认是有的
    resizable?: OType; // 是否要让窗口可以调整大小。默认是有的
    scrollbars?: OType; // 是否要在窗口中显示滚动条。默认是有的
    status?: OType; // 是否要在状态栏中显示网址。默认是有的
    titlebar?: OType; // 是否要在标题栏中显示网址。默认是有的
    toolbar?: OType; // 是否要在工具栏中显示网址。默认是有的
    top?: string; // 窗口的顶边界
    width?: string; // 窗口的宽度,最小为100
};

export interface IProps {
    url: string; // 跳转地址
    name?: string;  // 窗口名称
    target?: TargetType; // 窗口打开方式
    width?: number; // 窗口宽度
    height?: number;  // 窗口高度
    otherSpecs?: OtherSpecsProps; // 其他参数
}

const windowUtils = {

    // 打开一个水平垂直居中的新窗口---若不设置宽高，则显示全屏
    openNewWindow: ({ url, target, name, width, height, otherSpecs = {} }: IProps) => {
        if (name && target) {
            console.error("windowUtils.openNewWindow: name和target都存在,取name值");
        }

        if (target && ["_self", "_parent", "_top"].includes(target)) {
            name = target;
        }

        const sizeSpecs = width && height ? {
            width,
            height,
            top: (window.screen.height - height) / 2,
            left: (window.screen.width - width) / 2,
        } : {};

        const specObj: any = Object.assign(
            sizeSpecs,
            otherSpecs,
        );

        const specs = Object.keys(specObj)
            .map(key => `${key}=${specObj[key]}`)
            .join(',');

        return window.open(url, name, specs);    // 若在父窗口中关闭子窗口，可以通过当前对象:obj.close()
    },


    // 在子窗口中关闭当前窗口
    closeCurrentWindow: () => {
        window.opener = null; //把父窗口声明为空
        window.open('', '_self', ''); // 父窗口把自己变成“子窗口”
        window.close(); //关闭当前窗口
    },

};

export default windowUtils;