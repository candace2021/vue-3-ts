<script lang="ts" setup>
import { ref } from 'vue'
import type { registerType, registerRulesType, userType } from '../utils/types'
import { type FormInstance } from 'element-plus'
import axios from '@/utils/http'
import { RouterLink, useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '../stores'

const router = useRouter()
const store = useAuthStore()

const ruleFormRef = ref<FormInstance>()
const loginUser = ref<registerType>({
  email: '27732357b@qq.com',
  password: '321321',
})
const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (valid) {
      apiAxios()
    }
  })
}
const rules = ref<registerRulesType>({
  email: [{ type: 'email', required: true, message: '信箱格式不正確', trigger: 'blur' }],
  password: [
    { required: true, message: '密碼不可為空', trigger: 'blur' },
    { min: 6, max: 30, message: '長度在6~30個字符之間', trigger: 'blur' },
  ],
})

const apiAxios = async () => {
  try {
    const {
      data: { success, token },
    } = await axios.post('/api/users/login', loginUser.value)

    if (success && token) {
      localStorage.setItem('token', token)

      //解析token
      const decoded: userType = jwtDecode(token)

      store.setAuth(!!decoded)
      store.setUser(decoded)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ElMessage({
      message: '用戶登入成功',
      type: 'success',
    })
    router.push('/')
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ElMessage.error(error.response.data.msg)
  }
}
</script>

<template>
  <div class="login">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">後台管理系統</span>
      </div>
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="loginUser"
        class="loginForm"
        label-width="80px"
      >
        <el-form-item label="信箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="請輸入信箱"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input
            v-model="loginUser.password"
            placeholder="請輸入密碼"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleSubmit(ruleFormRef)" class="submit-btn">登入</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>還沒有帳號? 現在<RouterLink to="/register">註冊</RouterLink></p>
        </div>
      </el-form>
    </section>
  </div>
</template>
