

import { walk, sortTree, toTree } from './utils';

export interface ObjProps {
    [key: string]: any;
}

export interface OptionProps {
    keyPropName?: string;
    parentPropName?: string;
    childrenPropName?: string;
    [key: string]: any;
}

const defaultOptions = {
    keyPropName: 'key',
    parentPropName: 'parent',
    childrenPropName: 'children',

    // cascade fields related
    // cascade field should have value like: { value: '', indeterminate: false }
    cascadeFields: [],  // cascade fields are the fields like `checked`, `selected`, the boolean type fields on the tree
    cascadeFilter: (cascadeFieldName: string, node: any) => true // if returns false, it will stop cascade downwards
}
class TreeAgent {

    public options: OptionProps;
    protected tree: Array<any>;
    protected nodeMap: { [key: string]: any }
    protected _preventSync: boolean;

    constructor(tree: Array<any>, options?: OptionProps) {
        this.options = {
            ...defaultOptions,
            ...(options || {})
        };
        this.tree = tree;
        this.nodeMap = this._flatten(tree);  // { [key]: { node, parent, children, level, path } }
        this._preventSync = false;
    }

    /**
     * 将树形数据平铺
     * @param tree 
     * @returns 
     */
    _flatten(tree: Array<any>) {
        const { options, _key } = this;
        const nodeMap: any = {};

        walk(tree, ({ node, parent, level, path }) => {
            const currentNode = {
                ...node,
                node,
                level,
                path,
                parent: null,
                children: null,
            };
            if (parent) {
                const parentNode = nodeMap[_key(parent)]; // 获取父节点
                parentNode.children = parentNode.children || []; // 如果当前节点的父节点没有子节点，则创建一个子节点数组
                parentNode.children.push(JSON.parse(JSON.stringify(currentNode))); // 解除循环依赖
                currentNode.parent = parentNode;// 将父节点挂载到当前节点上
            }
            nodeMap[_key(node)] = currentNode; // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        }, options);

        return nodeMap;
    }

    // 返回key对应的节点的值
    _key = (node: ObjProps): string => {
        const { keyPropName } = this.options;
        return keyPropName && node[keyPropName];
    }

    // 返回parent对应的节点的值
    _parentKey = (node: ObjProps): string => {
        const { parentPropName } = this.options;
        return parentPropName && node[parentPropName];
    }

    // 返回children对应的节点的值
    _children = (node: ObjProps): string => {
        const { childrenPropName } = this.options;
        return childrenPropName && node[childrenPropName];
    }

    sync() {
        if (!this._preventSync) {
            this.nodeMap = this._flatten(this.tree);
        }
    }

    syncWrapper(func: () => void) {
        this._preventSync = true;
        func();
        this._preventSync = false;
        this.sync();
    }

    /* 获取树的相关函数 */

    // 返回整个tree
    getTree() {
        return this.tree;
    }

    // 获取当前节点
    getNode(value: (string | number) | ((node: ObjProps) => {})) {
        if (typeof value === 'function') {
            return Object.values(this.nodeMap).find(value);
        } else {
            const node = this.nodeMap[value];
            return node || null;
        }
    }

    // 获取子节点，options={directChildren:boolean}默认为true,directChildren为true代表是否直接子级
    getChildren(key?: string | number, options?: { directChildren: boolean }) {
        const { directChildren } = {
            ...{ directChildren: true },
            ...(options || {}),
        }
        if (key) {
            if (!directChildren) {
                return Object.values(this.nodeMap).filter(n => n.path.includes(key));
            } else {
                const node = this.getNode(key);
                return node ? node.children : [];
            }
        } else {
            return Object.values(this.nodeMap);
        }
    }

    // 获取父节点
    getParent(key: string | number) {
        const node = this.getNode(key);
        if (!node) {
            return null;
        }
        return node.parent || null;
    }

    // 获取父...父级节点
    getParents(key: string) {
        const node = this.getNode(key);
        return node ? node.path.map((k: string) => this.getNode(k)) : [];
    }

    // 获取同级节点
    getSiblings(key: string) {
        const level = this.getLevel(key)
        return level === null ? [] : Object.values(this.nodeMap).filter(n => n.level === level && this._key(n.node) !== key);
    }

    /**
     * get leaves of whole tree or given tree node
     * @param {String} key optional
     */
    getLeaves(key: string) {
        return this.getChildren(key).filter((n: ObjProps) => !n.children || n.children.length === 0)
    }

    // 返回整个tree的层级或返回当前节点的层级
    getLevel(key?: string) {
        if (!key) {
            const levels = Object.values(this.nodeMap).map(n => n.level)
            return Math.max(...levels)
        } else {
            const node = this.getNode(key)
            return node ? node.level : null;
        }
    }

    /* 树的判断函数 */


    // 判断是否为根节点
    isTop(key: string) {
        return this.getLevel(key) === 0;
    }

    // 是否为子级，options={directChildren:boolean}默认为false,directChildren为true代表是否直接子级
    isChildOf(childKey: string, parentKey: string, options?: { directChildren: boolean }) {
        const { directChild } = {
            ...{ directChild: false },
            ...(options || {}),
        }
        const childNode = this.getNode(childKey);
        if (!childNode) {
            return false;
        }

        if (directChild) {
            return childNode.parent ? this._key(childNode.parent.node) === parentKey : false;
        } else {
            return childNode.path.includes(parentKey);
        }
    }

    // 是否为父级，options={directParent:boolean}默认为false,directParent为true代表是否直接父级
    isParentOf(parentKey: string, childKey: string, options: { directParent: boolean }) {
        const { directParent } = {
            ...{ directParent: false },
            ...(options || {}),
        }
        return this.isChildOf(childKey, parentKey, { directChildren: directParent });
    }

    /* 树的操作函数 */

    // 便利树，传入一个函数，函数的参数为当前节点
    traverse(handler: (node: ObjProps) => void) {
        Object.values(this.nodeMap).forEach(handler)
    }

    some(key: string, fn: (node: ObjProps) => boolean) {
        return this.getChildren(key).some(fn);
    }

    every(key: string, fn: (node: ObjProps) => boolean) {
        return this.getChildren(key).every(fn);
    }

    sort(sorter: (a: ObjProps, b: ObjProps) => number) {
        this.tree = sortTree(this.tree, sorter);

        const oldValue = this._preventSync;
        this._preventSync = false;
        this.sync();
        this._preventSync = oldValue;
    }

    filter(fn: (node: ObjProps) => boolean) {
        const nodes = this.getChildren().filter(fn);
        const { keyPropName, parentPropName, childrenPropName }: any = this.options;
        const flatData = nodes.map((n: ObjProps) => {
            return {
                ...n.node,
                [parentPropName]: n.parent ? n.parent.node[keyPropName] : null,
                [childrenPropName]: null
            }
        })
        return toTree(flatData, this.options);
    }

    find(value: string) {
        return this.getNode(value);
    }

    /**
     * 
     * @param {String} key 
     * @param {String} fieldName 
     * @param {Any} fieldValue 
     * @param {Boolean} cascade
     */
    setFieldValue(key: string, fieldName: string, fieldValue: string) {
        const node = this.getNode(key);
        if (!node) {
            return;
        }

        const { cascadeFields } = this.options;
        const cascadeFilter = (node: ObjProps) => this.options.cascadeFilter(fieldName, node);
        const isCascadeField = cascadeFields.includes(fieldName);

        if (isCascadeField) {
            node.node[fieldName] = { value: fieldValue, indeterminate: false };

            // set value for children
            this.getChildren(key).filter(cascadeFilter).forEach((child: ObjProps) => {
                child.node[fieldName] = { value: fieldValue, indeterminate: false };
            })

            // set value for parents
            const parents = this.getParents(key).filter(cascadeFilter);

            // forEach parents from bottom to top
            // if all direct children have the same value and non-indeterminate,
            // then set parent as non-indeterminate value
            parents.reverse().forEach((parent: any) => {
                const determinate = parent.children.every((child: ObjProps) => {
                    const { value, indeterminate } = child.node[fieldName] || {};
                    return value === fieldValue && !indeterminate;
                })
                parent.node[fieldName] = { value: fieldValue, indeterminate: !determinate };
            })
        } else {
            node.node[fieldName] = fieldValue;
        }
    }

    /* operations need to be done by these provided agent functions */
    /* don't modify tree or node directly, it will leads undetermined result */

    addNode(parentKey: string, node: ObjProps) {
        const { _key, _parentKey, _children, options } = this;
        const { keyPropName } = options;
        const key = _key(node);
        if (!key) {
            console.warn(`cannot find valid key from node.${keyPropName}`);
            return false;
        }

        const parent = this.getNode(parentKey);
        if (parentKey && !parent) {
            console.warn(`cannot find parent of key: ${parentKey}`);
            return false;
        }

        // make sure it has parentKey set
        _parentKey(node);

        // modify tree
        if (!parent) {
            this.tree.push(node); // add to top level
        } else {
            const children: any = _children(parent.node);
            if (!children) {
                _children(parent.node);
            } else {
                children.push(node);
            }
        }

        // recalculate nodeMap
        this.sync();
    }

    /**
     * remove node with children
     */
    removeNode(key: string) {
        const node = this.getNode(key);
        if (!node) {
            return false;
        }

        const { _key, _children } = this;
        const { parent } = node;

        if (parent) {
            _children(parent.node);
        } else {
            this.tree = this.tree.filter(topNode => _key(topNode) !== key);
        }

        this.sync();
        return node;
    }

    /**
     * move target node down to a parent node or the top level of the tree
     * @param {String} key 
     * @param {String} parentKey optional
     * @return moved node
     */
    moveNode(key: string, parentKey: string) {
        if (this.isChildOf(parentKey, key)) {
            console.warn('cannot move a node into its children node')
            return false
        }

        const moveToTop = !parentKey
        const node = this.getNode(key)
        if (!node) {
            console.warn(`target node ${key} does not exist`)
            return false
        }

        const parentNode = moveToTop ? null : this.getNode(parentKey)
        if (!moveToTop && !parentNode) {
            console.warn(`parent node ${parentKey} does not exist`)
            return false
        }

        this.syncWrapper(() => {
            const removedNode = this.removeNode(key)
            this.addNode(parentKey, removedNode.node)
        })
    }

    addChildren(parentKey: string, children: any) {
        const parent = this.getNode(parentKey)
        if (!parent) {
            console.warn(`target node ${parentKey} does not exist`)
            return false
        }

        children = Array.isArray(children) ? children : [children]
        this.syncWrapper(() => {
            children.forEach((child: any) => this.addNode(parentKey, child))
        })
    }

    removeChildren(parentKey: any) {
        const parent = this.getNode(parentKey)
        if (!parent) {
            console.warn(`target node ${parentKey} does not exist`)
            return false
        }

        const { _children, _key } = this;
        if (!_children(parent.node) || _children(parent.node).length === 0) {
            return
        }
    }

    setChildren(parentKey: string, children: any) {
        const parent = this.getNode(parentKey)
        if (!parent) {
            console.warn(`target node ${parentKey} does not exist`)
            return false
        }

        children = Array.isArray(children) ? children : [children]
        this.syncWrapper(() => {
            this.removeChildren(parentKey)
            this.addChildren(parentKey, children)
        })
    }
}

export default TreeAgent;