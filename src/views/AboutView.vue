<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动区域">
        <el-select
          v-model="form.proviceCode"
          placeholder="请选择省"
        >
          <!-- 用户看到的信息是label 目前这来说这个value你根本不知道是干啥 -->
          <el-option
            v-for="item in province"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
        <el-select v-show="city.length" v-model="form.cityCode" placeholder="请选择市">
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
        <el-select v-show="area.length" v-model="form.areaCode" placeholder="请选择区">
          <el-option
            v-for="item in area"
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
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import citydata from "@/assets/lib/citydata.json";

// 想做这种级联
// form表单中的所有的input框
// 都接收两个值 
// key  value 
// lable  value
// name  value
// name  key
// 单选框  多选框  下拉框；
// 不管如何变化， 他们都是有且必须是两个键;
// 一个键是用来写逻辑的；
// 一个键是用来让用户看的；

// 概要设计
// 当用户选择一个省string ，  会出现对应的市列表；
// 当用户选择一个市string， 会出现对应的区列表

// 选择一个省 ： 就是把 this.form.provinceCode 进行修改；
// 会出现对应的市列表 ：  修改市列表 city的值；

// watch
// 当一个值发生变化时，可以做的逻辑；就可以放到watch中来；
// 当this.form.proviceCode 发生变化时，就修改 city的值；

// 当用户选择一个市string  ： 当 this.form.cityCode 发生变化时
// 会出现对应的区列表   ：  修改this.area的值；

export default {
  data() {
    return {
      form: {
        proviceCode: "", //省编号
        cityCode: "", //市编号
        areaCode:"",// 区编号 
      },
      province: citydata,  //省列表
      city: [],  // 市 列表；
      area:[], //区列表；
    };
  },
  watch:{
    "form.proviceCode" :function(code){
      // 当this.form.proviceCode 发生变化时，就修改 city的值；
      // 找到code值对应的那个json;
      console.log(code); 
      this.form.cityCode = '';
      this.form.areaCode = '';
      let res = this.province.find(item=> item.code == code);
      this.city = res && res.children ? res.children : [];
    },
    "form.cityCode":function(code){
      this.form.areaCode = '';
      let res = this.city.find(item=> item.code == code);
      this.area = res && res.children ? res.children : [];
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>