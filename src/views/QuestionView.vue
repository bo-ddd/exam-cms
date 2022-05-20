<template>
  <div class="question">
    <!-- header -->
    <div class="condition">
      <div class="align-center">
        <label class="title mr-15">所属题型</label>
        <div class="types flex">
          <div class="type active">全部(1000)</div>
          <div class="type">单选题(34)</div>
          <div class="type">多选题(409)</div>
          <div class="type">判断题(100)</div>
        </div>
      </div>
      <div class="align-center">
        <label class="title mr-15">难易程度</label>
        <div class="types flex">
          <div class="type active">全部(1000)</div>
          <div class="type">简单(34)</div>
          <div class="type">普通(409)</div>
          <div class="type">困难(100)</div>
        </div>
      </div>
      <div class="operation">
        <div class="buttons">
          <el-button type="primary" @click="showDialog">添加习题</el-button>
          <el-button type="primary">批量导入</el-button>
          <el-button type="primary">加入公共练习题</el-button>
        </div>

        <el-input
          placeholder="请输入要搜索的内容"
          suffix-icon="el-icon-search"
        ></el-input>
      </div>
    </div>
    <!-- list -->
    <div class="list">
      <div class="item" v-for="item in questionList" :key="item.id">
        <div class="header flex-between">
          <div class="flex-center">
            <div class="created-time">
              <span>创建时间：</span>
              <span>{{ formatDate(item.createdAt) }}</span>
            </div>
            <div class="types ml-50">
              <span class="type">{{ getTypeName(item.type) }}</span>
              <span class="type type-level">{{
                getLevelName(item.level)
              }}</span>
            </div>
          </div>
          <div class="operation">
            <span class="el-icon-edit-outline" @click="showDialog(item)"></span>
            <span class="el-icon-delete" @click="openDeletePopup(item)"></span>
          </div>
        </div>

        <div class="container">
          <div class="title flex">
            <el-checkbox></el-checkbox>
            <div class="ml-5">{{ item.title }}</div>
          </div>
          <div class="options">
            <el-radio disabled v-model="item.answer" label="A">{{
              item.questionA
            }}</el-radio>
            <el-radio disabled v-model="item.answer" label="B">{{
              item.questionB
            }}</el-radio>
            <el-radio
              v-if="item.questionC"
              disabled
              v-model="item.answer"
              label="C"
              >{{ item.questionC }}</el-radio
            >
            <el-radio
              v-if="item.questionD"
              disabled
              v-model="item.answer"
              label="D"
              >{{ item.questionD }}</el-radio
            >
          </div>
          <div class="answer">
            <span>答案：</span>
            <span>{{ item.answer }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>

    <!-- dialog  注意： 在项目中，弹层都会在最外层 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="dialog"
    >
      <div class="form">
        <div class="item">
          <label>
            <span class="c-ff4400">*</span>
            <span>题目标题:</span>
          </label>
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </div>
        <div
          class="item"
          v-for="(option, index) in questionOptions"
          :key="option.id"
        >
          <label>
            <span v-if="index <= 1" class="c-ff4400">*</span>
            <span>{{ option.label }}:</span>
          </label>
          <el-input
            v-model="option.value"
            :placeholder="option.placeholder"
          ></el-input>
          <div>
            <span
              @click="addQuestionOption"
              v-if="index == questionOptions.length - 1 && index < 3"
              class="btn el-icon-circle-plus-outline"
            ></span>
            <span
              @click="removeQuestionOption"
              v-if="index > 1 && index == questionOptions.length - 1"
              class="btn el-icon-remove-outline"
            ></span>
          </div>
        </div>
        <div class="item">
          <label>
            <span class="c-ff4400">*</span>
            <span>答案:</span>
          </label>
          <el-select v-model="answer" placeholder="请选择">
            <el-option
              v-for="item in questionOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label>
            <span class="c-ff4400">*</span>
            <span>难易程度:</span>
          </label>
          <el-select v-model="form.level" placeholder="请选择">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hiddenDialog">取 消</el-button>
        <el-button type="primary" @click="createQuestion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getQuestionListApi,
  deleteQuestionApi,
  createQuestionApi,
  updateQuestionApi,
} from "@/api/api";
import formatDate from "@/mixins/formatDate";

// 总结 ：
// 1. JSON.parse(JSOn.stringify) 解决深浅拷贝及应用场景
export default {
  mixins: [formatDate],
  data() {
    return {
      selectedData: {}, //代表就是我们选听那一行；
      title: "",
      questionList: [],
      dialogVisible: false,
      form: {},
      levelOptions: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "普通",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
      questionOptions: [],   //  option.value = '';  questionA = 'aaaaa'
      answer: "",
      pageNum: 1,
      pageSize: 2,
      totalCount: 0,
      questionOptionsTemp: [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: "",
          placeholder: "请输入选项A的值",
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: "",
          placeholder: "请输入选项B的值",
        },
        {
          id: 3,
          key: "C",
          label: "选项C",
          value: "",
          placeholder: "请输入选项C的值,非必填",
        },
        {
          id: 4,
          key: "D",
          label: "选项D",
          value: "",
          placeholder: "请输入选项D的值,非必填",
        },
      ],
      isCreateEvent: true,
    };
  },
  watch: {
    questionOptions(newValue) {
      let res = newValue.find((item) => item.key == this.answer);
      this.answer = !res ? "" : res.key;
    },
  },
  created() {
    this.initFormPrams();
    this.getQuestionList();
  },
  methods: {
    removeQuestionOption() {
      this.questionOptions.pop();
    },
    addQuestionOption() {
      let option = JSON.parse(JSON.stringify(this.questionOptionsTemp));
      this.questionOptions.push(option[this.questionOptions.length]);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getQuestionList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getQuestionList();
    },
    // 服务端要的那个创建/修改题目的入参；
    formatFormParams() {
      let res = {};
      res.type = this.form.type;
      res.title = this.form.title;
      this.questionOptions.forEach((item) => {
        res["question" + item.key] = item.value;
      });
      res.answer = this.answer;
      res.level = this.form.level;

      if (!this.isCreateEvent) res.id = this.selectedData.id;
      return res;
    },
    initFormPrams() {
      this.form = {
        type: 1,
        title: "",
        answer: "",
        level: "",
      };
      this.questionOptions = JSON.parse(
        JSON.stringify(this.questionOptionsTemp)
      ).slice(0, 2);
      this.answer = "";
    },
    validateFormParams(params) {
      let res = true;
      let rule = {
        title: "题目标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项C",
        questionD: "选项D",
        answer: "答案",
        level: "难易程度",
      };

      for (let key in params) {
        if (!params[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空！", //  key  questionC
          });
          res = false;
          break;
        }
      }
      return res;
    },

    // 创建/编辑题
    async createQuestion() {
      let validate = this.validateFormParams(params);
      let params = this.formatFormParams();
      if (!validate) return;
      if(!params.questionC) params.questionC = '';
      if(!params.questionD) params.questionD = '';
      let successMsg = "";
      let res;
      if (this.isCreateEvent) {
        res = await createQuestionApi(params);
        successMsg = "创建成功";
      } else {
        res = await updateQuestionApi(params);
        successMsg = "编辑成功";
      }

      if (res.data.status == 1) {
        this.getQuestionList();
        this.$message({
          type: "success",
          message: successMsg,
        });
        this.hiddenDialog();
      }
    },
    hiddenDialog() {
      this.dialogVisible = false;
    },
    showDialog(data) {
      this.dialogVisible = true;
      this.initFormPrams();
      console.log(data);
      let isCreateEvent = data instanceof PointerEvent;
      if (isCreateEvent) {
        console.log("创建");
        this.isCreateEvent = true;
      } else {
        console.log("编辑");
        this.selectedData = data;
        this.isCreateEvent = false;
        this.form.title = data.title;

        let questionOptions = JSON.parse(
          JSON.stringify(this.questionOptionsTemp)
        );

        questionOptions.forEach((item, index) => {
          questionOptions[index].value = data["question" + item.key];
        });
        
        this.questionOptions = questionOptions.filter((item) => item.value);
        this.answer = data.answer;
        this.form.level = data.level;
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    async getQuestionList() {
      const { pageSize, pageNum } = this;
      let res = await getQuestionListApi({
        type: 1,
        pageSize,
        pageNum,
      });
      this.questionList = res.data.data.rows;
      this.totalCount = res.data.data.count;
    },
    async deleteQuestion({ type, id }) {
      let res = await deleteQuestionApi({ id, type });
      if (res.data.status == 1) {
        this.getQuestionList();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } else {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
    openDeletePopup(data) {
      this.$confirm("您是否确认删除该题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteQuestion(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getLevelName(level) {
      switch (level) {
        case 1:
          return "简单";
        case 2:
          return "普通";
        case 3:
          return "困难";
      }
    },
    getTypeName(type) {
      switch (type) {
        case 1:
          return "单";
        case 2:
          return "多";
        case 3:
          return "填";
        case 4:
          return "问";
      }
    },
  },
};
</script>


<style scoped lang="scss">
.condition {
  border-radius: 4px;
  background: #f9f9f9;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  & .title {
    font-weight: bold;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  & .types {
    gap: 0 10px;
    color: #ccc;
    & .type {
      padding: 4px 10px;
      border-radius: 15px;
      border: 1px solid #b7b7b7;
    }

    & .active {
      color: #f25342;
      border: 1px solid #f25342;
    }
  }
  & .operation {
    display: grid;
    grid-template-columns: 2fr auto;
    & .buttons {
      align-self: center;
    }
  }
}
.list {
  display: flex;
  flex-direction: column; //  flex 默认是 横向布局，  这个是把横向转成竖向
  gap: 10px 0;
  margin-top: 20px;
  & .item {
    border: 1px solid #e2e5ea;
    border-radius: 4px;
    padding: 14px 20px;
    .header {
      & .created-time {
        color: #bababa;
      }
      & .types {
        color: #fff;
        display: flex;
        gap: 0 10px;
        padding: 4px 0;
        & .type {
          padding: 4px;
          border-radius: 4px;
          background-image: linear-gradient(#f24a38, #fa7d65);
        }
        & .type-level {
          padding: 4px 7px;
          background-image: linear-gradient(#72d98f, #72d9cb);
        }
      }

      & .operation {
        display: flex;
        gap: 0 14px;
      }
    }
    & .container {
      & .title {
        padding: 12px 0;
      }
      & .options {
        padding: 12px 22px;
      }

      & .answer {
        padding: 12px 22px;
      }
    }
  }
}

.pagination {
  padding: 15px 0;
}

.dialog {
  ::v-deep .el-dialog {
    width: 440px !important;
  }
  & .form {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    padding: 20px;
    & .item {
      display: grid;
      grid-template-columns: 70px 240px 50px;
      gap: 0 10px;
      align-items: center;
      & label {
        text-align: right;
      }
      & .btn {
        padding: 4px;
        display: inline-block;
      }
    }
  }
}
</style>