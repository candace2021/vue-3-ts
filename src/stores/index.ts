import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { userType } from '@/utils/types'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const userAuth = ref<userType | null>(null)

  const getAuthenticated = () => isAuthenticated.value
  const getUser = () => userAuth.value

  const setAuth = (isAuth: boolean) => {
    if (isAuth) {
      isAuthenticated.value = isAuth
    } else {
      isAuthenticated.value = false
    }
  }
  const setUser = (user: userType | null) => {
    if (user) {
      userAuth.value = user
    } else {
      userAuth.value = null
    }
  }

  return { isAuthenticated, userAuth, getAuthenticated, getUser, setAuth, setUser }
})
