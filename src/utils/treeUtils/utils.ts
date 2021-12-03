
export interface TreeNode {
    node: any;
    parent?: any;
    level?: number;
    path?: string[];
    context?: any;
};

export interface ToTreeOptions {
    keyPropName?: string;
    parentPropName?: string;
    childrenPropName?: string;
    isRoot?: (node: any, keyPropName: string) => boolean;
}

/**
 * 作用：遍历节点追加参数 node、parent、level、path、context
 * @param tree // 传入的树形数据
 * @param callback // 回调函数
 * @param options // 配置项
 */
export const walk = (tree: Array<any>, callback: (node: TreeNode) => void, options?: any) => {
    const { childrenPropName, keyPropName }: { childrenPropName: string, keyPropName: string } = {
        keyPropName: 'key',
        childrenPropName: 'children',
        ...(options || {})
    };
    let loopContext = {} as any;

    const loop = ({ tree, parent, level, path, callback }: any) => {
        tree.forEach((item: any) => {
            const skipChildren = callback({
                node: item,
                parent,
                level,
                path,
                context: loopContext,
            })
            if (skipChildren !== false && item[childrenPropName]) {
                loop({
                    tree: item[childrenPropName],
                    parent: item,
                    level: level + 1,
                    path: [...path, item[keyPropName]],
                    callback
                });
            }
        })
    }
    loop({
        tree,
        parent: null,
        level: 0,
        path: [],
        callback,
    });
    loopContext = null;
}

/**
 * 组装树函数
 * @param flatData // 要组装的list一维数据
 * @param options // 配置项
 * @returns 
 */
export const toTree = (
    flatData: Array<any> = [],
    options?: ToTreeOptions,
) => {
    const opts = {
        keyPropName: 'key',
        parentPropName: 'parent',
        childrenPropName: 'children',
        isRoot: (options && options.isRoot) ? options.isRoot : ((d: any, PARENT_KEY: string) => !d[PARENT_KEY]),
        ...(options || {}),
    }
    const KEY = opts.keyPropName;
    const PARENT_KEY = opts.parentPropName;
    const CHILDREN_KEY = opts.childrenPropName;

    const process: any = (value: string) => {
        const children = [];
        for (let i = 0; i < flatData.length; i++) {
            const node = flatData[i];
            if (node[PARENT_KEY] === value) {
                children.push(Object.assign({}, node, { [CHILDREN_KEY]: process(node[KEY]) }));
            }
        }
        return children.length > 0 ? children : null;
    }

    return flatData
        .filter(d => opts.isRoot(d, PARENT_KEY)) // 筛选出key为空的节点，也就是根节点；也可以根据isRoot函数来筛选数据作为根节点
        .map(d => Object.assign({}, d, { [CHILDREN_KEY]: process(d[KEY]) }));
}

/**
 * 树结构排序函数
 * @param tree // 树结构数据
 * @param sorter // 排序函数
 * @param options // 配置项
 * @returns 
 */
export const sortTree = <T>(
    tree: Array<T> = [],
    sorter: (a: T, b: T) => number,
    options?: { childrenPropName: string },
) => {
    const { childrenPropName } = {
        ...{ childrenPropName: 'children' },
        ...(options || {}),
    };
    const process = (nodes: any) => {
        return nodes.map((node: any) => {
            const children = node[childrenPropName];
            if (children && children.length > 0) {
                node[childrenPropName] = process(children);
            }
            return node;
        }).sort(sorter);
    }
    return process(tree);
}