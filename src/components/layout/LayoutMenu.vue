<template>
  <el-menu
    :default-active="defaultActive"
    unique-opened
    class="el-menu-vertical-demo"
    background-color="#0b1b34"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu :index="item.name" v-for="item in menu" :key="item.name">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item
        :index="sub.name"
        v-for="sub in item.children"
        :key="sub.name"
        @click="$navigator(sub.name)"
        >{{ sub.label }}</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<script>
import menu from "@/config/menu.config";
export default {
  data() {
    return {
      defaultActive: "",
      menu,
    };
  },
  async created() {
    this.defaultActive = this.$route.name;
  },
};
</script>