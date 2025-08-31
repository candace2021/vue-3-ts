<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { formDataType, formRulesType } from '@/utils/types'
import type { FormInstance } from 'element-plus'
import axios from '@/utils/http'

const props = defineProps({
  show: Boolean,
  editData: Object as () => formDataType,
})
const typeList = ref(['提現', '提現手續費', '充值', '優惠券', '充值禮券', '轉帳'])
const formData = ref<formDataType | any>({
  type: '',
  describe: '',
  income: '',
  expend: '',
  cash: '',
  remark: '',
})

watch(
  () => props.editData,
  () => {
    formData.value = props.editData
  },
)
const formRules: formRulesType = {
  describe: [{ required: true, message: '收支描述不能為空', trigger: 'blur' }],
  income: [{ required: true, message: '收入金額不能為空', trigger: 'blur' }],
  expend: [{ required: true, message: '支出金額不能為空', trigger: 'blur' }],
  cash: [{ required: true, message: '帳戶現金不能為空', trigger: 'blur' }],
}

const form = ref<FormInstance>()
const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const url = !props.editData?._id ? 'add' : `edit/${props.editData._id}`
      await axios.post(`/api/profiles/${url}`, formData.value)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ElMessage.success(!props.editData?._id ? '新增成功' : '修改成功')
      emit('handleUpdateProfile')
      emit('closeModal')
    } else {
      console.log('error submit!')
    }
  })
}
const handleClose = () => {
  emit('closeModal')
}

const emit = defineEmits(['closeModal', 'handleUpdateProfile'])
</script>

<template>
  <el-dialog
    :before-close="handleClose"
    :model-value="show"
    :title="editData ? '編輯收支信息' : '新增收支信息'"
  >
    <el-form
      :rules="formRules"
      :model="formData"
      ref="form"
      style="margin: 10px; width: auto"
      label-width="120px"
    >
      <el-form-item label="收支類型:">
        <el-select placeholder="收支類型" v-model="formData.type">
          <el-option v-for="(list, idx) in typeList" :key="idx" :label="list" :value="list" />
        </el-select>
      </el-form-item>
      <el-form-item label="收支描述:" prop="describe">
        <el-input type="describe" v-model="formData.describe" />
      </el-form-item>
      <el-form-item label="收入:" prop="income">
        <el-input type="income" v-model="formData.income" />
      </el-form-item>
      <el-form-item label="支出:" prop="expend">
        <el-input type="expend" v-model="formData.expend" />
      </el-form-item>
      <el-form-item label="帳戶現金:" prop="cash">
        <el-input type="cash" v-model="formData.cash" />
      </el-form-item>
      <el-form-item label="備註:">
        <el-input type="textarea" v-model="formData.remark" />
      </el-form-item>
      <el-form-item class="text-right">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit(form)">送出</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped></style>
