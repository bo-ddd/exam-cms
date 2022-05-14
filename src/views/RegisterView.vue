<template>
  <div class="register flex-center" v-on:keyup.enter="submit">
    <div class="popup shadow">
      <el-container class="container">
        <el-header class="title align-center">
          <div>注册</div>
        </el-header>
        <el-main class="main shadow flex-column">
          <el-steps
            class="steps"
            :active="step"
            finish-status="success"
            align-center
          >
            <el-step title="填写用户信息"></el-step>
            <el-step title="注册成功"></el-step>
          </el-steps>
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user-solid"
            class="mt-15"
            placeholder="请输入用户名"
          ></el-input>
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-key"
            class="mt-15"
            show-password
            placeholder="请输入密码"
          ></el-input>
          <el-input
            v-model="form.rePassword"
            prefix-icon="el-icon-key"
            class="mt-15"
            show-password
            placeholder="请在次输入密码"
          ></el-input>
          <el-input
            v-model="form.email"
            prefix-icon="el-icon-message"
            class="mt-15"
            placeholder="请输入邮箱"
          ></el-input>
          <el-input
            v-model="form.phone"
            prefix-icon="el-icon-platform-eleme"
            class="mt-15"
            placeholder="请输入电话"
            maxlength="11"
          ></el-input>
          <div class="catpcha mt-10 flex-between">
            <el-input
              v-model="form.captcha"
              placeholder="请输入验证码"
              max-length="4"
            ></el-input>
            <el-captcha ref="captcha"></el-captcha>
          </div>
          <el-button @click="submit" class="btn mt-20" type="primary"
            >注册</el-button
          >
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { registerApi } from "@/api/api";
import CaptchaComponent from '@/components/CaptchaComponent.vue';
export default {
  components:{
    'el-captcha':CaptchaComponent
  },
  data() {
    return {
      form: {
        username: "",
        password: "666666",
        rePassword: "666666",
        email: "814151789@qq.com",
        phone: "15555555555",
        captcha: "",
      },
      step: 1,
    };
  },
  created() {
    window.addEventListener(
      "keydown",
      (event) => {
        if (event.code == "Enter") {
          this.submit();
          //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
          event.preventDefault();
        }
      },
      true
    );
  },
  methods: {
    getValidateResult() {
      return true;
    },
    async submit() {
      var isValidate = this.getValidateResult();
      if (!isValidate) return;

      let res = await registerApi(this.form);

      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "登录成功",
        });
        this.$router.push({
          name: "login",
        });
      } else {
        this.$refs.captcha.getCaptcha();
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.register {
  height: 100vh;
  background: #fefefe;
  overflow: hidden;
  & .title {
    font-size: 30px;
    font-family: "Microsoft Yahei", sans-serif;
  }
  & .popup {
    background: #f9f9fb;
    border-radius: 4px;
    height: calc(100vh - 120px);
    width: 80%;
    padding: 20px 60px;
    min-width: 1000px;
    box-sizing: border-box;
    & .container {
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 60px;
    }
    & .main {
      height: 100%;
      background: #fff;
      padding: 60px 30%;
      box-shadow: 0 0 30px rgb(0 0 0 / 40%);
      & .catpcha {
        display: grid;
        grid-template-columns: 4fr 1fr;
        gap: 0 5px;
      }
      & .steps {
        width: 100%;
      }
      & .btn {
        width: 100%;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
