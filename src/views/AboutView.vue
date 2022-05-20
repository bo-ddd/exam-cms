<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="昵称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select
          @change="handleProvinceChangeEvent"
          v-model="form.proviceCode"
          placeholder="请选择活动区域"
        >
          <!-- 用户看到的信息是label 目前这来说这个value你根本不知道是干啥 -->
          <el-option
            v-for="item in province"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.code
            }}</span>
          </el-option>
        </el-select>
        <el-select v-model="form.cityCode" placeholder="请选择市">
          <el-option
            v-for="item in city"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.code
            }}</span>
          </el-option>
        </el-select>
        <el-select v-model="form.region" placeholder="请选择区">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
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
        name: "",
        proviceCode: "", //省编号
        cityCode: "", //市编号
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      province: [],
      city: [],
    };
  },
  created() {
    // 第一步，选渲染 省  citydata;
    this.province = citydata;

    var arr = [11, 123, 12, 31, 2, 45, 123, 1, 23, 1, 23, 1, 2, 31, 23, 123];

    //找出数组中大于 100的第一个数字；
    function find(arr, cb) {
      let res;
      for (let i = 0; i < arr.length; i++) {
        let result = cb(arr[i],i);
        if (result) {
          res = result;
          break;
        }
      }
      return res;
    }

    let cb = function(item){
      if(item > 5){
        return item ;
      }
    }
    let num = find(arr,cb);
    console.log(num); // 123
  },
  methods: {
    handleProvinceChangeEvent(val) {
      console.log(val);
      // 目前为止，我们还不知道这个东西是个啥；
      // v-model 绑定的那个值， 其实就是切换后的那个值；
      // val  就是 山西省的code值；
      let res = this.province.find((item) => item.code == val);
      console.log(res);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>