<template>
  <div>
    <div class="item" v-for="item in menu" :key="item.name">
      <el-checkbox
        :indeterminate="item.isIndeterminate"
        v-model="item.checkAll"
        @change="handleCheckAllChange($event, item)"
        >{{ item.label }}</el-checkbox
      >
      <div style="margin: 15px 0"></div>
      <el-checkbox-group
        v-model="item.checkedChildren"
        @change="handleCheckedChildrenMenuChange($event,item)"
      >
        <el-checkbox
          v-for="children in item.children"
          :label="children.name"
          :key="children.name"
        >
          {{ children.label }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import menu from "@/config/menu.config";
export default {
  data() {
    return {
      menu: [],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.menu = menu.map((item) => {
        let data = JSON.parse(JSON.stringify(item));
        data.checkAll = false;
        data.checkedChildren = [];
        data.isIndeterminate = false;
        return data;
      });
    },
    handleCheckAllChange(val, item) {
      item.checkedChildren = val ? item.children.map((item) => item.name) : [];
      item.isIndeterminate =  false;
    },
    handleCheckedChildrenMenuChange(value, item) {
      let checkedCount = value.length;
      item.checkAll = checkedCount === item.children.length;
      item.isIndeterminate = checkedCount > 0 && checkedCount < item.children.length;
    },
  },
};
</script>

<style scoped lang="scss">
.item {
  padding: 20px;
}
</style>