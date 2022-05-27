<template>
  <div class="create-task form-color">
    <h3 class="title">创建任务</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="任务名称">
        <el-input
          style="width: 300px"
          placeholder="请输入任务名称"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="任务时长">
        <div class="flex">
          <el-input style="width: 60px" v-model="form.duration"></el-input>
          <span class="ml-5">小时</span>
        </div>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input
          placeholder="请输入任务描述"
          style="width: 370px"
          type="textarea"
          v-model="form.desc"
        ></el-input>
      </el-form-item>
      <el-form-item label="执行人">
        <el-select
          v-model="form.userIds"
          multiple
          filterable
          placeholder="请选择执行人"
        >
          <el-option
            :label="user.name"
            v-for="user in users"
            :value="user.id"
            :key="user.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否紧急">
        <el-switch v-model="form.level"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserListApi, createTaskApi, releaseTaskApi } from "@/api/api";
export default {
  data() {
    return {
      form: {
        name: "",
        level: false,
        desc: "",
        userIds: [],
      },
      users: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    initForm(){
      this.form = {
        name: "",
        level: false,
        desc: "",
        userIds: [],
      };
    },
    async getUserList() {
      let res = await getUserListApi({
        pagination: false,
      });
      this.users = res.data.data.data.rows;
    },
    async releaseTask(taskId) {
      let res = await releaseTaskApi({
        userIds: this.form.userIds,
        taskId,
      });
      if (res.data.status == 1) this.open();
    },
    open() {
        this.$confirm('任务发布成功, 是否继续创建任务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '查看任务列表',
          type: 'success',
          center: true
        }).then(() => {
          this.initForm();
        }).catch(() => {
          this.$router.push({
            name:'taskList'
          })
        });
    },
    async onSubmit() {
      console.log("submit!");
      console.log(this.form);
      let { name, level, desc, duration } = this.form;
      let res = await createTaskApi({
        name,
        level: level ? 1 : 0,
        desc,
        duration,
      });
      let taskId = res.data.data[0].id;
      console.log(res);
      this.releaseTask(taskId);
    },
  },
};
</script>

<style scoped lang="scss">
.create-task{
  background:#fff;
  padding:15px 12px;
  height:100%;
  box-sizing: border-box;
}
.title {
  padding: 15px 0;
}
::v-deep .el-textarea__inner {
  height: 140px;
}
</style>