<template>
  <div class="home">
    <el-container>
      <el-header class="header flex-between">
        <div class="logo align-center">
          <span>Aichi5</span>
        </div>
        <div class="info align-center">
          <div class="align-center">
            <img class="icon mr-5" src="../assets/icon_avatar.png" alt="" />
            <span>{{ userInfo.phone }}</span>
          </div>
          <div class="align-center">
            <img class="icon mr-5" src="../assets/icon_logout.png" alt="" />
            <span @click="logout">退出</span>
          </div>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside class="aside" width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#0b1b34"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="0">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>任务中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="0-1" @click="navigator('myDiary')"
                  >我的任务</el-menu-item
                >
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="0-2" @click="navigator('createTask')"
                  >创建任务</el-menu-item
                >
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="0-3" @click="navigator('taskList')"
                  >任务列表</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>题库管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">题库管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="1-2" @click="navigator('question')"
                  >js题库</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>账号设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="navigator('userInfo')"
                  >个人资料</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// 用户进入到 home页面；
// 调用获取用户信息接口
// 如果服务端返回401 就代表的时 未登录 或者登录 已失效；
// 401： 全国规定； 未授权 ==  未登录；
// 那么就跳转到登录页面去；
import { getUserInfoApi, logoutApi } from "@/api/api";
export default {
  name: "HomeView",
  data() {
    return {
      userInfo: {},
    };
  },
  async created() {
    let userInfo = await getUserInfoApi();
    this.userInfo = userInfo.data.data[0];
    if (userInfo.data.status == 401) {
      this.$router.push({
        name: "login",
      });
    }
  },
  methods: {
    async logout() {
      // 1. 点击退出按钮  ,调用服务端退出接口
      let res = await logoutApi();
      // 成功
      if (res.data.status == 1) {
        // 1-1清空sessionStorage中的token
        sessionStorage.setItem("token", "");
        // 1-2 跳转到登录页面
        this.$router.push({
          name: "login",
        });
      } else {
        // 3. 提示用户错误信息；
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
    handleOpen(key, keyPath) {
      console.log("is open");
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    navigator(name) {
      if (this.$route.name == name) return;
      this.$router.push({
        name,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  background: #367fee;
  color: #fff;
  font-size: 20px;
  & .info {
    font-size: 14px;
    display: flex;
    gap: 0 20px;
  }
}

.container {
  height: calc(100vh - 60px);
}

.aside {
  background: #0b1b34;
}

.main{
  background:rgb(252, 244, 244);
}
</style>
