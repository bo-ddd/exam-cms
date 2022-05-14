<template>
  <div class="login flex-center">
    <div class="popup flex-center">
      <div class="logo flex-column">
        <div class="icon-logo shadow">H5</div>
        <p class="sub-title mt-20">achi5</p>
        <p class="desc">DIGITIZING INDUSTRIAL SERVICES</p>
      </div>
      <div class="form">
        <div>
          <div class="label">USERNAME</div>
          <el-input v-model="username" placeholder="请输入内容"></el-input>
        </div>
        <div class="mt-10">
          <div class="label">PASSWORD</div>
          <el-input
            v-model="password"
            placeholder="请输入内容"
            show-password
          ></el-input>
        </div>
        <div class="mt-10 flex-between">
          <el-input
            v-model="captcha"
            placeholder="请输入验证码"
            maxlength="4"
          ></el-input>
          <el-captcha ref="captcha"></el-captcha>
        </div>
        <el-button class="mt-30" type="primary" @click="submit"
          >LOGIN</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi } from "@/api/api";
import { encrypt } from "@/assets/utils/index";
import CaptchaComponent from '@/components/CaptchaComponent.vue'
export default {
  components:{
    'el-captcha':CaptchaComponent
  },
  data() {
    return {
      username: "",
      password: "",
      captcha: "",
    };
  },
  methods: {
    getValidateResult() {
      var res = { result: true };
      if (this.username == "") {
        res.result = false;
        res.message = { type: "warning", message: "用户名不能为空" };
      } else if (this.password == "") {
        res.result = false;
        res.message = { type: "warning", message: "密码不能为空" };
      }
      if (!res.result) this.$message(res.message);
      return res.result;
    },
    async submit() {
      var isValidate = this.getValidateResult();
      if (!isValidate) return;

      const { username, password, captcha } = this;
      let res = await loginApi({
        username,
        password: encrypt(password),
        captcha,
      });

      // 登录成功;
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "登录成功",
        });
        sessionStorage.setItem("token", res.data.data);
        this.$router.push({
          name: "home",
        });
      } else {
        // 登录失败;
        this.$message({
          type: "warning",
          message: res.data.msg,
        });

        this.$refs.captcha.getCaptcha();
      }
    },
  },
};
</script>

<style scoped  lang="scss">
.login {
  height: 100vh;
  background: #f5f8fd;
  & .popup {
    width: 800px;
    display: grid;
    grid-template-columns: 2.8fr 3fr;
    border: 14px solid #1e80e1;
    padding: 40px;
    color: #0c80e7;
    font-size: 12px;
    & .logo {
      height: 478px;
      min-width: 375px;
      background: #1e80e1;
      transform: skewX(-10deg) translateX(40px);
      color: #fff;
      z-index: 100;
      & .icon-logo {
        padding: 20px;
        font-size: 60px;
        box-sizing: border-box;
        transform: skewX(10deg);
      }
      & .sub-title {
        font-size: 40px;
      }
      & .desc {
        font-size: 12px;
      }
    }

    & .form {
      min-width: 400px;
      padding: 20px;
      padding-left: 100px;
      min-height: 50%;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      & .label {
        padding: 10px 0;
      }
    }
  }
}
</style>