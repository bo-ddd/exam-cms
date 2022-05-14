<template>
  <div>
    <div v-for="item in options" :key="item.id">
      <label for="">{{ item.title }}</label>
      <el-input v-model="item.value" placeholder="请输入内容"></el-input>
    </div>

    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.key" 
        :label="item.title"
        :value="item.key"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      value:'',
      options: [
        {
          id: 1,
          key:'A',
          title: "选项A",
          value: "",
        },
        {
          id: 2,
          key:'B',
          title: "选项B",
          value: "",
        },

      ],
    };
  },
};
</script>

