<script lang="ts" setup>
import { useAuthStore } from '../stores'

const store: any = useAuthStore()
</script>

<template>
  <div class="info-container">
    <el-row type="flex" justify="center" class="content">
      <el-col :span="8">
        <div class="user">
          <img
            v-if="store.userAuth.avatar"
            :src="store.userAuth.avatar"
            class="avatar"
            alt="avatar"
          />
          <img v-else src="../assets/default.jpeg" class="avatar" alt="avatar" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{ store.userAuth.name }}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{ store.userAuth.identity == 'employee' ? '一般職員' : '管理員' }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.info-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.content {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>
