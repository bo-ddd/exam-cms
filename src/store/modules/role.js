import {
    getRoleListApi,
    getRoleGroupListApi,
  } from '@/api/api';

export default {
    actions: {
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