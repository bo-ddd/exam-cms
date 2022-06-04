<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <layout-header></layout-header>
      </el-header>
      <el-container class="container">
        <el-aside class="aside" width="200px">
          <layout-menu></layout-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import LayoutMenu from '@/components/layout/LayoutMenu.vue';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';

export default {
  name: "HomeView",
  components:{
    LayoutMenu,
    LayoutHeader,
  },
};
</script>

<style scoped lang="scss">

.header{
  background: #367fee;
}

.container {
  height: calc(100vh - 60px);
}

.aside {
  background: #0b1b34;
}

.main {
  background: rgb(252, 244, 244);
}
</style>
