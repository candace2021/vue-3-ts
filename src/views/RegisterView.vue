<script lang="ts" setup>
import { ref } from 'vue'
import type { registerType, registerRulesType } from '../utils/types'
import { type FormInstance } from 'element-plus'
import axios from '@/utils/http'
import { useRouter } from 'vue-router'

const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const registerUser = ref<registerType>({
  name: '米斯特吴',
  email: '27732357b@qq.com',
  password: '321321',
  password2: '321321',
  identity: '管理员',
})
const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (valid) {
      apiAxios()
    }
  })
}
const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value !== registerUser.value.password) {
    callback(new Error('密碼不一致!'))
  } else if (value !== '') {
    callback()
  }
}
const rules = ref<registerRulesType>({
  name: [
    { required: true, message: '用戶名不可為空', trigger: 'blur' },
    { min: 2, max: 30, message: '長度在2~30個字符之間', trigger: 'blur' },
  ],
  email: [{ type: 'email', required: true, message: '信箱格式不正確', trigger: 'blur' }],
  password: [
    { required: true, message: '密碼不可為空', trigger: 'blur' },
    { min: 6, max: 30, message: '長度在6~30個字符之間', trigger: 'blur' },
  ],
  password2: [
    { required: true, message: '密碼不可為空', trigger: 'blur' },
    { min: 6, max: 30, message: '長度在6~30個字符之間', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' },
  ],
})

const apiAxios = async () => {
  try {
    const { data } = await axios.post('/api/users/register', registerUser.value)
    console.log(data)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ElMessage({
      message: '用戶註冊成功',
      type: 'success',
    })
    router.push('/login')
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ElMessage.error(error.response.data.msg)
  }
}
</script>

<template>
  <div class="register">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">後台管理系統</span>
      </div>
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="registerUser"
        class="registerForm"
        label-width="80px"
      >
        <el-form-item label="用戶名" prop="name">
          <el-input v-model="registerUser.name" placeholder="請輸入用戶名"></el-input>
        </el-form-item>
        <el-form-item label="信箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="請輸入信箱"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input
            v-model="registerUser.password"
            placeholder="請輸入密碼"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="確認密碼" prop="password2">
          <el-input
            v-model="registerUser.password2"
            placeholder="請確認密碼"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="選擇身份">
          <el-select v-model="registerUser.identity" placeholder="選擇身份">
            <el-option label="管理員" value="manager"></el-option>
            <el-option label="員工" value="employee"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleSubmit(ruleFormRef)" class="submit-btn">註冊</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>已經有帳號，請前往<RouterLink to="/login">登入</RouterLink></p>
        </div>
      </el-form>
    </section>
  </div>
</template>
