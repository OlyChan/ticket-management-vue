import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getSession, clearSession, isAuthenticated as checkAuth } from '../utils/localStorage'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  const isAuthenticated = computed(() => user.value !== null)

  const initAuth = () => {
    const session = getSession()
    if (session) {
      user.value = {
        id: session.userId,
        email: session.email,
        name: session.name
      }
    }
    loading.value = false
  }

  const login = (session) => {
    user.value = {
      id: session.userId,
      email: session.email,
      name: session.name
    }
  }

  const logout = () => {
    clearSession()
    user.value = null
  }

  const checkAuthentication = () => {
    return checkAuth()
  }

  return {
    user,
    loading,
    isAuthenticated,
    initAuth,
    login,
    logout,
    checkAuthentication
  }
})
