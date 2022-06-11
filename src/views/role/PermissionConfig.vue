<template>
  <el-wrap>
    <el-title>权限配置</el-title>
    <el-button
      type="primary"
      class="ml-15 mb-10"
      size="mini"
      @click="openDialogWithCreateRoot"
      >创建root权限</el-button
    >
    <el-container class="container">
      <el-tree
        :data="tree"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="treeProps"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span class="ml-50">
            <el-button type="text" size="mini" @click="() => edit(data)"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="() => append(data)"
              >增加</el-button
            >
            <el-button
              v-if="!data.children.length"
              type="text"
              size="mini"
              @click="() => remove(data)"
              >删除</el-button
            >
          </span>
        </span>
      </el-tree>
    </el-container>

    <el-dialog title="编辑权限" :visible.sync="dialogEditFormVisible">
      <el-form :model="editForm">
        <el-form-item label="权限名称" :label-width="formLabelWidth">
          <el-input
            v-model="editForm.title"
            autocomplete="off"
            placeholder="请输入权限名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限类型" :label-width="formLabelWidth">
          <el-select v-model="editForm.type" placeholder="请选择权限类型">
            <el-option label="模块" :value="1"></el-option>
            <el-option label="页面" :value="2"></el-option>
            <el-option label="功能" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在目录" :label-width="formLabelWidth">
          <el-select v-model="editForm.pid" placeholder="请选择所在目录">
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="item in list.filter(item=>editForm.id != item.id)"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onEditSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="创建权限" :visible.sync="dialogCreateFormVisible">
      <el-form :model="createForm">
        <el-form-item label="权限名称" :label-width="formLabelWidth">
          <el-input
            v-model="createForm.title"
            autocomplete="off"
            placeholder="请输入权限名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限类型" :label-width="formLabelWidth"> 
          <el-select v-model="createForm.type" placeholder="请选择权限类型">
            <el-option label="模块" :value="1"></el-option>
            <el-option label="页面" :value="2"></el-option>
            <el-option label="功能" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCreateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </el-wrap>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  createPermissionApi,
  deletePermissionApi,
  updatePermissionApi,
} from "@/api/api";

export default {
  data() {
    return {
      list: [],
      treeProps: {
        label: "title",
        children: "children",
      },
      editForm: {
        title: "",
        type: 1,
        pid: "",
      },
      createForm: {},
      dialogEditFormVisible: false,
      dialogCreateFormVisible: false,
      formLabelWidth: "72px",
    };
  },
  computed:{
    ...mapGetters({
      tree:'permissionListTree'
    })
  },
  created() {
    this.initCreateFormParams();
    this.getPermissionList();
  },
  methods: {
    ...mapActions(['getPermissionListApi']),
    initCreateFormParams() {
      this.createForm = {
        title: "",
        type: 1,
        pid: null,
      };
    },
    async onCreateSubmit() {
      await createPermissionApi(this.createForm);
      this.$message.success("创建成功!");
      this.dialogCreateFormVisible = false;
      this.getPermissionList();
    },
    async onEditSubmit() {
      await updatePermissionApi(this.editForm);
      this.$message.success("修改成功!");
      this.dialogEditFormVisible = false;
      this.getPermissionList();
    },
    async getPermissionList() {
      this.list = await this.getPermissionListApi()
    },
    async openDialogWithCreateRoot() {
      this.initCreateFormParams()
      this.dialogCreateFormVisible = true;
    },
    async edit(data) {
      this.dialogEditFormVisible = true;
      const { id, pid, title, type } = data;
      this.editForm = { id, pid, title, type };
    },
    append(data) {
      Object.assign(this.createForm, {pid:data.id})
      this.dialogCreateFormVisible = true;
    },
    remove(data) {
      this.$confirm("此操作将永久删除该项权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deletePermissionApi({ id: data.id });
          this.$message.success("删除成功");
          this.getPermissionList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: auto 120px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.container {
  padding: 0 20px;
}
</style>