<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 2,
      totalCount: 0,
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let { pageNum, pageSize } = this;
      let res = await this.$emit("list", {
        pageNum,
        pageSize,
      });
      console.log('-----------res-------------')
      console.log(res);
      console.log('----------res end------------')
    //this.totalCount = res.data.data.count;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getTableData();
    },
  },
};
</script>

<style scoped>
.pagination {
  padding: 0 20px 20px;
}
</style>
