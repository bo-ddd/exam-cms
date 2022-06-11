<template>
  <div class="create-task form-color">
    <h3 class="title">创建任务</h3>
    <task-form ref="form" @submit="createTask"></task-form>
  </div>
</template>
<script>
import TaskForm from "@/components/task/TaskForm.vue";
import { createTaskApi, releaseTaskApi } from "@/api/api";
export default {
  components: {
    TaskForm,
  },
  created() {
    this.$nextTick(() => {
      this.$refs.form.init();
    });
  },
  methods: {
    async releaseTask(taskId, userIds) {
      await releaseTaskApi({
        userIds,
        taskId,
      });
    },
    open() {
      this.$confirm("任务发布成功, 是否继续创建任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "查看任务列表",
        type: "success",
        center: true,
      })
        .then(() => {
          this.$refs.form.clear();
        })
        .catch(() => {
          this.$router.push({
            name: "taskList",
          });
        });
    },
    async createTask(form, userIds) {
      let res = await createTaskApi(form);
      let taskId = res.data.data[0].id;
      await this.releaseTask(taskId, userIds);
      this.open();
    },
  },
};
</script>

<style scoped lang="scss">
.create-task {
  background: #fff;
  padding: 15px 12px;
  height: 100%;
  box-sizing: border-box;
}
.title {
  padding: 15px 0;
}
::v-deep .el-textarea__inner {
  height: 140px;
}
</style>