<template>
  <div>
    <div class="links flex-around">
      <el-link type="primary">创建角色</el-link>
      <el-link type="primary">新建分组</el-link>
    </div>
    <div class="links flex-center">
      <el-link type="primary">创建角色</el-link>
      <el-link type="primary">新建分组</el-link>
    </div>
    <div class="links flex-between">
      <el-link type="primary">创建角色</el-link>
      <el-link type="primary">新建分组</el-link>
    </div>

    <user-logout>
      <el-button>退出登录</el-button>
    </user-logout>
  </div>
</template>

<script>
import UserLogout from '@/components/user/UserLogout.vue'

export default {
  components:{
    UserLogout
  },
}
</script>

<style scoped lang="scss">
.links{
  width:200px;
  border:1px solid red;
  padding:10px;
}
</style>