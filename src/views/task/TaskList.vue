<template>
  <div class="create-task">
    <h1 class="title-1">任务列表</h1>
    <div class="header wrap">
      <div class="align-center">
        <label class="mr-5">任务名称:</label>
        <el-input
          class="w-180"
          v-model="searchParams.taskId"
          placeholder="请输入任务名称"
        ></el-input>
      </div>
      <div class="align-center">
        <label class="mr-5">创建时间:</label>
        <el-date-picker
          v-model="searchParams.date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <div class="align-center">
        <label class="mr-5">任务执行人:</label>
        <el-select
          v-model="searchParams.userIds"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in users"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">搜索</el-button>
        <el-button>清空</el-button>
      </div>
    </div>
    <div class="wrap mt-20 table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="id" align="center" width="80">
        </el-table-column>
        <el-table-column prop="taskName" label="任务名称" width="170">
        </el-table-column>
        <el-table-column label="是否紧急" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 1" type="danger">紧急</el-tag>
            <el-tag v-else>普通</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="任务时长" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.duration }}小时</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center">
        </el-table-column>
        <el-table-column label="任务描述" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.desc">{{ scope.row.desc }}</div>
            <div v-else class="c-909090">暂无描述</div>
          </template>
        </el-table-column>
        <el-table-column label="是否领取" align="center" width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isReceived == 1"
              >已领取</el-tag
            >
            <el-tag type="warning" v-else>未领取</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="operation">
              <el-link type="primary" @click="openFormDialog(scope.row)"
                >编辑任务</el-link
              >
              <el-link type="primary">发布任务</el-link>
              <el-link
                v-if="scope.row.isReceived != 1"
                type="primary"
                @click="receiveTask"
                >领取任务</el-link
              >
              <el-link type="primary">查看详情</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>

    <el-dialog title="编辑任务" :visible.sync="dialogFormVisible">
      <task-form ref="form" @submit="editTask"></task-form>
    </el-dialog>
  </div>
</template>

<script>
import TaskForm from '@/components/task/TaskForm.vue'
import { getTaskListApi,releaseTaskApi, getUserListApi, updateTaskApi } from "@/api/api";
export default {
  components:{
    TaskForm
  },
  data() {
    return {      
      dialogComponentName:'',
      dialogFormVisible: false,
      taskId:null,
      searchParams: {
        taskId: null,
        date: "",
        userIds: "",
      },
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      totalCount: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      users: [],
    };
  },
  created() {
    // 获取任务列表
    this.getTaskList();
    //获取用户列表
    this.getUserList();
  },
  methods: {
    // 发布任务；
    async releaseTask(taskId,userIds) {
      if(!userIds || !userIds.length) return;
      await releaseTaskApi({
        userIds,
        taskId,
      });
    },
    async openFormDialog(data){
      this.taskId = data.id;
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
        this.$refs.form.init(this.taskId);
      })
    },
    async editTask(form,userIds) {
      await updateTaskApi(form);
      this.$message({
        type:'success',
        message:'任务编辑成功'
      })
      await this.releaseTask(this.taskId,userIds);
      this.getTaskList();
      this.dialogFormVisible = false;
    },
    // 领取任务
    receiveTask() {
      
    },
    async getUserList() {
      let res = await getUserListApi({ pagination: false });
      this.users = res.data.data.data.rows;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTaskList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTaskList();
    },
    async getTaskList() {
      let { pageSize, pageNum } = this;
      let res = await getTaskListApi({pageSize,pageNum});
      this.tableData = res.data.data.rows;
      this.totalCount = res.data.data.count;
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  color: #606266;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.operation {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>