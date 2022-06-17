import {
    getRoleListApi,
    getRoleGroupListApi,
    getPermissionListApi,
} from '@/api/api';
import menu from '@/config/menu.config'

class RolePermissionMenuList {
    constructor(options) {
        this.datable = []; //可配置的权限列表;
        this.permissionTree = options.permissionTree || [];  //服务端拿到的权限列表树;
    }

    result() {
        const { permissionTree } = this;
        this.datable = [];
        return menu.map((menuItem) => {
            let data = JSON.parse(JSON.stringify(menuItem));

            // 找到可以配置的权限数据;
            let datable = permissionTree.find(permisstion => permisstion.title == data.label);
            if (datable) this.datable.push(datable)
            data.children = this.getChildrenValue(data, datable);
            data.checkedChildren = this.getCheckedChildrenValue(data, datable);
            data.isIndeterminate = Boolean(data.checkedChildren.length) && data.checkedChildren.length < data.children.length;
            data.checkAll = data.checkedChildren.length === data.children.length;
            return data;
        });
    }
    getChildrenValue(menuRow, permission) {
        menuRow.children.forEach(item => {
            item.modifiable = permission && permission.children ? permission.children.some(perItem => perItem.title == item.label) :  false;
            item.disabled = !permission ? true : !permission.children.some(perItem => perItem.title == item.label)
        })
        return menuRow.children;
    }
    getCheckedChildrenValue(menuRow, permission) {
        let res = [];
        menuRow.children.forEach(item => {
            if (!permission || !permission.children || !permission.children.some(perItem => perItem.title == item.label))
                res.push(item.name)
        })
        return res;
    }
}

export default {
    state: {
        permissionList: [],
        rolePermissionMenuList: []
    },
    mutations: {
        PERMISSION_LIST(state, payload) {
            state.permissionList = payload;
        },
        ROLE_PERMISSION_MENU_LIST(state, payload = {}) {
            let { permissionTree } = payload;
            let list = new RolePermissionMenuList({
                permissionTree
            });
            state.rolePermissionMenuList = list.result();
        },
    },
    getters: {
        permissionListTree(state) {
            let list = state.permissionList;
            list.forEach(
                (item) =>
                    (item.children = list.filter((childItem) => childItem.pid == item.id))
            );
            return list.filter((item) => !item.pid);
        }
    },
    actions: {
        async getRolePermissionListTree({ dispatch, getters, commit }) {
            await dispatch('getPermissionListApi');
            let permissionTree = getters.permissionListTree;
            commit('ROLE_PERMISSION_MENU_LIST', {
                permissionTree
            })
        },
        async getPermissionListApi({ commit }) {
            return getPermissionListApi().then(res => {
                let list = res.data.data.rows;
                commit('PERMISSION_LIST', list);
                return list;
            })
        },
        /**
         * @description 获取角色组菜单列表
         * **/
        async getRoleGroupMenuListAct() {
            let [roleListResult, roleGroupListResult] = await Promise.all([
                getRoleListApi(),
                getRoleGroupListApi(),
            ]);
            let roleList = roleListResult.data.data.rows;
            let roleGroupList = roleGroupListResult.data.data.rows;
            roleGroupList.forEach((group) => {
                group.key = `group${group.id}`;
                group.children = (() => {
                    let res = [];
                    roleList.forEach((role) => {
                        role.key = `role${role.id}`;
                        if (role.groupId == group.id) {
                            res.push(role);
                        }
                    });
                    return res;
                })();
            });
            return roleGroupList;
        },
    }
}