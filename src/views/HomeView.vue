<script setup lang="ts">
import axios from '@/utils/http'
import { onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/users/current')
    // console.log(data)
  } catch (error) {
    // console.log(error)
  }
})
</script>

<template>
  <div class="home">
    <NavBar />
    <SideBar />
    <div class="container-right">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.container-right {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>
