<template>
  <el-wrap class="over-hidden">
    <el-title icon="el-icon-user">角色管理</el-title>
    <el-container class="container">
      <el-aside>
        <div class="links flex-around">
          <el-link type="primary" @click="$navigator('createRole')"
            >创建角色</el-link
          >
          <el-link type="primary">新建分组</el-link>
        </div>
        <div class="menu">
          <el-menu
            :default-active="defaultActive"
            unique-opened
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu
              :index="item.key"
              v-for="(item, index) in menu"
              :key="index"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.groupName }}</span>
              </template>
              <el-menu-item
                :index="children.key"
                v-for="(children, cIndex) in item.children"
                :key="cIndex"
              >
                {{ children.roleName }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-main>
        <el-title level="2">
          <span>所有者</span>
          <template slot="desc"
            >系统默认角色,默认具有企业所有功能权限和全部数据可见范围</template
          >
        </el-title>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色成员" name="roles">角色成员</el-tab-pane>
          <el-tab-pane label="功能权限" name="permission">
            <permission-list></permission-list>
          </el-tab-pane>
          <el-tab-pane label="数据范围" name="range">数据范围</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-wrap>
</template>

<script>
import PermissionList from "@/components/role/PermissionList";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    PermissionList,
  },
  data() {
    return {
      defaultActive: "",
      menu: [],
      activeName: "permission",
    };
  },
  computed: {
    ...mapGetters(["permissionListTree"]),
  },
  created() {
    this.getRoleGroupMenuList();
    this.getPermissionListApi();
    this.getRolePermissionListTree();
  },
  methods: {
    ...mapActions([
      "getRoleGroupMenuListAct",
      "getPermissionListApi",
      "getRolePermissionListTree",
    ]),
    async getRoleGroupMenuList() {
      this.menu = await this.getRoleGroupMenuListAct();
      this.defaultActive = this.menu[0].children[0].key;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped lang="scss">
.el-aside {
  overflow: hidden;
  border-right: 1px solid #e6e6e6;
}
.menu {
  height: calc(100% - 80px);
  overflow: scroll;
}
.el-menu {
  height: 100%;
  box-sizing: border-box;
  border-right: none;
}
.el-container {
  height: 100%;
  border-top: 1px solid #e6e6e6;
}
.links {
  padding: 10px 0;
}
</style>