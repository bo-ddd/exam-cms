<template>
  <div class="header flex-between">
    <div class="logo align-center">
      <span>Aichi5</span>
    </div>
    <div class="info align-center">
      <div class="align-center">
        <img class="icon mr-5" src="@/assets/icon_avatar.png" alt="" />
        <span>{{ userInfo.avatarName || userInfo.phone }}</span>
      </div>
      <user-logout class="align-center">
        <img class="icon mr-5" src="@/assets/icon_logout.png" alt="" />
        <span>退出</span>
      </user-logout>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserLogout from "@/components/user/UserLogout.vue";
export default {
  components: {
    UserLogout,
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
  },

};
</script>

<style scoped lang="scss">
.header {
  color: #fff;
  font-size: 20px;
  height: 100%;
  & .info {
    font-size: 14px;
    display: flex;
    gap: 0 20px;
  }
}
</style>