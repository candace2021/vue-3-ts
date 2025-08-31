<script lang="ts" setup>
import axios from '@/utils/http'
import { ref, watchEffect } from 'vue'
import DialogModal from '@/components/DialogModal.vue'
import type { formDataType } from '@/utils/types'
import { useAuthStore } from '@/stores'

const store = useAuthStore()

const show = ref<boolean>(false)
const titles = [
  '序號',
  '創建時間',
  '收支類型',
  '收支描述',
  '收入',
  '支出',
  '帳戶現金',
  '備註',
  '操作',
]
const tableData = ref<formDataType[]>([])
const allData = ref<formDataType[]>([])
const sortData = ref<formDataType[]>([])
const editData = ref<formDataType>()

const page_index = ref(1)
const page_size = ref(5)
const page_total = ref(0)

const getProfiles = async () => {
  try {
    const { data } = await axios.get('/api/profiles/')
    tableData.value = data
    allData.value = data
    sortData.value = data
    setPaginations()
  } catch (error) {
    console.log(error)
  }
}

watchEffect(() => getProfiles())

const handleAdd = () => {
  show.value = true
}
const handleEdit = (row: formDataType) => {
  show.value = true
  editData.value = { ...row }
}
const handleDelete = async (row: formDataType) => {
  await axios.delete(`/api/profiles/delete/${row._id}`)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  ElMessage.success('刪除成功')
  getProfiles()
}
const handleUpdateProfile = () => {
  getProfiles()
}

const handleSizeChange = (pages: number) => {
  page_size.value = pages
  page_index.value = 1

  tableData.value = allData.value.filter((item: any, index: number) => {
    return index < page_size.value
  })
}
const handleCurrentChange = (page: number) => {
  const currentPage = page_size.value * (page - 1)
  const pageData = allData.value.filter((item: any, index: number) => {
    return index >= currentPage
  })
  tableData.value = pageData.filter((item: any, index: number) => {
    return index < page_size.value
  })
}

const setPaginations = () => {
  page_total.value = allData.value.length
  page_index.value = 1
  page_size.value = 5
  tableData.value = allData.value.filter((item: any, index: number) => {
    return index < page_size.value
  })
}

const startTime = ref<Date>()
const endTime = ref<Date>()
const handleSort = () => {
  if (!startTime.value || !endTime.value) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ElMessage({
      message: '請選擇時間區間',
      type: 'warning',
    })
    getProfiles()
    return
  }

  const stime = startTime.value.getTime()
  const etime = endTime.value.getTime()

  allData.value = sortData.value.filter((item: any) => {
    const date = new Date(item.date)
    const time = date.getTime()
    return time >= stime && time <= etime
  })

  setPaginations()
}
</script>

<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" v-if="store.userAuth.identity == '管理员'">
        <el-form-item label="時間篩選">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            placeholder="選擇開始時間"
          ></el-date-picker>
          --
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="選擇結束時間"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSort">篩選</el-button>
        </el-form-item>
        <el-form-item class="btn-right">
          <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="450"
      border
      v-if="tableData.length > 0"
    >
      <el-table-column type="index" :label="titles[0]" align="center" width="70" />
      <el-table-column prop="date" :label="titles[1]" align="center" width="auto">
        <template #default="scope">
          <el-icon><Timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date.slice(0, 10) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" :label="titles[2]" align="center" width="auto" />
      <el-table-column prop="describe" :label="titles[3]" align="center" width="auto" />
      <el-table-column prop="income" :label="titles[4]" align="center" width="auto">
        <template #default="scope">
          <span style="color: #00d053">+{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expend" :label="titles[5]" align="center" width="auto">
        <template #default="scope">
          <span style="color: #f56767">-{{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cash" :label="titles[6]" align="center" width="auto">
        <template #default="scope">
          <span style="color: #4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" :label="titles[7]" align="center" width="auto" />
      <el-table-column
        prop="operation"
        :label="titles[8]"
        align="center"
        width="auto"
        v-if="store.userAuth.identity == '管理员'"
      >
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">編輯</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="page_total > 0">
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            v-model:current-page="page_index"
            v-model:page-size="page_size"
            small="small"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page_total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
  <DialogModal
    :editData
    :show="show"
    @closeModal="show = false"
    @handleUpdateProfile="handleUpdateProfile"
  />
</template>

<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.btn-right {
  float: right;
}

.pagination {
  float: right;
  margin-top: 10px;
}
</style>
