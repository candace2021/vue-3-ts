<script lang="ts" setup>
import { ref } from 'vue'

const menus = ref([
  {
    icon: 'Money',
    name: '資金管理',
    path: 'fund',
    children: [{ path: 'fundList', name: '資金流水' }],
  },
  {
    icon: 'InfoFilled',
    name: '信息管理',
    path: 'info',
    children: [{ path: 'userinfo', name: '個人信息' }],
  },
])
</script>

<template>
  <el-row class="menu-container">
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#074c62"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
      >
        <RouterLink to="/">
          <el-menu-item index="1">
            <el-icon><HomeFilled /></el-icon>
            <span>首頁</span>
          </el-menu-item>
        </RouterLink>
        <template v-for="(menu, idx) in menus" :key="idx">
          <el-sub-menu v-if="menu.children" :index="String(idx + 2)">
            <template #title>
              <el-icon>
                <component :is="menu.icon"></component>
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>

            <RouterLink :to="sub.path" v-for="(sub, idx2) in menu.children" :key="idx2">
              <el-menu-item :index="`${idx + 1}-${idx2 + 1}`">
                {{ sub.name }}
              </el-menu-item>
            </RouterLink>
          </el-sub-menu>

          <RouterLink :to="menu.path" v-else>
            <el-menu-item :index="String(idx + 2)">
              <el-icon>
                <component :is="menu.icon"></component>
              </el-icon>
              <span>{{ menu.name }}</span>
            </el-menu-item>
          </RouterLink>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>
.menu-container {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #074c62;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 100vh;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-sub-menu .el-menu-item {
  min-width: 180px;
  padding-left: 48px !important;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
