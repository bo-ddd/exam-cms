<template>
  <div class="wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号昵称">
        <el-input v-model="form.avatarName"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所在地">
        <el-select v-model="form.provinceNo" placeholder="请选择省">
          <el-option
            v-for="item in province"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
        <el-select
          v-show="city.length"
          v-model="form.cityNo"
          placeholder="请选择市"
          class="ml-5"
        >
          <el-option
            v-for="item in city"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
        <el-select
          v-show="area.length"
          v-model="form.areaNo"
          placeholder="请选择区"
          class="ml-5"
        >
          <el-option
            v-for="item in area"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import citydata from "@/assets/lib/citydata.json";
export default {
  data() {
    return {
      form: {
        avatarName: "",
        name: "",
        sex: 1,
        provinceNo: "",
        cityNo: "",
        areaNo: "",
        desc: "",
        phone:'',
      },
      province: [],
      city: [],
      area: [],
    };
  },
  watch: {
    "form.provinceNo": function (newValue) {
      let res = this.province.find((item) => item.code == newValue);
      this.city = res && res.children ? res.children : [];

      if (this.form.cityNo) {
        let city = this.city.find((item) => item.code == this.form.cityNo);
        this.form.cityNo = city && city.code ? city.code : "";
      }
    },
    "form.cityNo": function (newValue) {
      let res = this.city.find((item) => item.code == newValue);
      this.area = res && res.children ? res.children : [];
      if (this.form.areaNo) {
        let area = this.area.find((item) => item.code == this.form.areaNo);
        this.form.areaNo = area && area.code ? area.code : "";
      }
    },
  },
  created() {
    this.province = citydata;
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      let userInfo = await this.$store.dispatch('getUserInfoApi');
      this.form = JSON.parse(JSON.stringify(userInfo));
      delete this.form.id;
      delete this.form.createdAt;
      delete this.form.updatedAt;
      delete this.form.identify;
    },
    async onSubmit() {
      // 几乎所有的修改用户信息以后,都百分百分重新获取用记信息列表;
      let res = await this.$store.dispatch('updateUserInfoApi',this.form);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-input__inner {
  width: 270px;
}

::v-deep .el-input__inner[readonly="readonly"] {
  width: 180px;
}

::v-deep .el-textarea__inner {
  width: 400px;
  height: 170px;
}
</style>