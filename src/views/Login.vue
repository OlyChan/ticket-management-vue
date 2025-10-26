<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Login to access your account</p>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-group">
            <label for="email" class="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              :class="['form-input', { error: errors.email }]"
              placeholder="you@example.com"
              :disabled="isLoading"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              :class="['form-input', { error: errors.password }]"
              placeholder="Enter your password"
              :disabled="isLoading"
            />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <button
            type="submit"
            class="btn btn-submit"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>
            Don't have an account?
            <RouterLink to="/auth/signup" class="auth-link">
              Sign up here
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { findUserByEmail, createSession } from '../utils/localStorage'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({})
const isLoading = ref(false)

const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!formData.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!formData.password) {
    errors.password = 'Password is required'
  }

  return Object.keys(errors).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  isLoading.value = true

  // Simulate network delay
  setTimeout(() => {
    const user = findUserByEmail(formData.email)

    if (!user) {
      toast.error('No account found with this email. Please sign up first.')
      isLoading.value = false
      return
    }

    if (user.password !== formData.password) {
      toast.error('Invalid credentials. Please check your password.')
      errors.password = 'Incorrect password'
      isLoading.value = false
      return
    }

    // Create session
    const session = createSession(user)
    authStore.login(session)

    toast.success(`Welcome back, ${user.name}!`)
    isLoading.value = false
    router.push('/dashboard')
  }, 800)
}
</script>

<style src="../assets/auth.css" scoped></style>
