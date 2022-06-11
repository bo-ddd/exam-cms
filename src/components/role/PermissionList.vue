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
        @change="handleCheckedChildrenMenuChange($event, item)"
      >
        <el-checkbox
          v-for="children in item.children"
          :label="children.name"
          :key="children.name"
          :disabled="children.disabled"
        >
          {{ children.label }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.commit("ROLE_PERMISSION_MENU_LIST");
  },
  computed: {
    ...mapState({
      menu: (state) => state.role.rolePermissionMenuList,
    }),
  },
  methods: {
    handleCheckAllChange(val, item) {
      console.log(val);
      item.checkedChildren = (() => {
        let res = [];
        item.children.forEach((item) => {
          if (val && item.modifiable) {
            res.push(item.name);
          }
          if(!val && !item.modifiable){
            res.push(item.name);
          }
        });
        return res;
      })();
      item.isIndeterminate = false;
    },
    handleCheckedChildrenMenuChange(value, item) {
      let checkedCount = value.length;
      item.checkAll = checkedCount === item.children.length;
      item.isIndeterminate =
        checkedCount > 0 && checkedCount < item.children.length;
    },
  },
};
</script>

<style scoped lang="scss">
.item {
  padding: 20px;
}
</style>