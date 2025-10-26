<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Create Account</h1>
        <p class="auth-subtitle">Sign up to get started with TicketFlow</p>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-group">
            <label for="name" class="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              :class="['form-input', { error: errors.name }]"
              placeholder="John Doe"
              :disabled="isLoading"
            />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

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
              placeholder="At least 6 characters"
              :disabled="isLoading"
            />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              v-model="formData.confirmPassword"
              :class="['form-input', { error: errors.confirmPassword }]"
              placeholder="Confirm your password"
              :disabled="isLoading"
            />
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>

          <button
            type="submit"
            class="btn btn-submit"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>
            Already have an account?
            <RouterLink to="/auth/login" class="auth-link">
              Login here
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
import { v4 as uuidv4 } from 'uuid'
import { saveUser, findUserByEmail, createSession } from '../utils/localStorage'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({})
const isLoading = ref(false)

const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!formData.name.trim()) {
    errors.name = 'Name is required'
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!formData.password) {
    errors.password = 'Password is required'
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
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
    // Check if user already exists
    const existingUser = findUserByEmail(formData.email)

    if (existingUser) {
      toast.error('An account with this email already exists. Please login.')
      errors.email = 'Email already registered'
      isLoading.value = false
      return
    }

    // Create new user
    const newUser = {
      id: uuidv4(),
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      createdAt: new Date().toISOString()
    }

    // Save user to localStorage
    saveUser(newUser)

    // Create session
    const session = createSession(newUser)
    authStore.login(session)

    toast.success(`Account created successfully! Welcome, ${newUser.name}!`)
    isLoading.value = false
    router.push('/dashboard')
  }, 800)
}
</script>

<style src="../assets/auth.css" scoped></style>
