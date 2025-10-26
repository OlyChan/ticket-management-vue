<template>
  <nav class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="navbar-logo" @click="closeMenu">
        TicketFlow
      </RouterLink>

      <!-- Hamburger Icon -->
      <button 
        :class="['hamburger', { active: isMenuOpen }]" 
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation Links -->
      <div :class="['navbar-menu', { active: isMenuOpen }]">
        <template v-if="authStore.isAuthenticated">
          <RouterLink 
            to="/dashboard" 
            :class="['navbar-link', { active: isActive('/dashboard') }]"
            @click="closeMenu"
          >
            Dashboard
          </RouterLink>
          <RouterLink 
            to="/tickets" 
            :class="['navbar-link', { active: isActive('/tickets') }]"
            @click="closeMenu"
          >
            Tickets
          </RouterLink>
          <div class="navbar-user">
            <span class="user-name">👋 {{ authStore.user?.name }}</span>
          </div>
          <button class="navbar-button logout" @click="handleLogout">
            Logout
          </button>
        </template>
        <template v-else>
          <RouterLink 
            to="/auth/login" 
            class="navbar-button login"
            @click="closeMenu"
          >
            Login
          </RouterLink>
          <RouterLink 
            to="/auth/signup" 
            class="navbar-button signup"
            @click="closeMenu"
          >
            Get Started
          </RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const isActive = (path) => {
  return route.path === path
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  closeMenu()
}
</script>

<style scoped>
.navbar {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.navbar-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar-logo:hover {
  color: #2563eb;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: #1f2937;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar-link {
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  position: relative;
}

.navbar-link:hover {
  color: #3b82f6;
  background-color: #eff6ff;
}

.navbar-link.active {
  color: #3b82f6;
  background-color: #dbeafe;
}

.navbar-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 2px;
  background-color: #3b82f6;
}

.navbar-user {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
}

.user-name {
  color: #1f2937;
  font-weight: 500;
  font-size: 0.9rem;
}

.navbar-button {
  padding: 0.625rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
}

.navbar-button.login {
  background-color: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.navbar-button.login:hover {
  background-color: #eff6ff;
}

.navbar-button.signup {
  background-color: #3b82f6;
  color: white;
}

.navbar-button.signup:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.navbar-button.logout {
  background-color: #ef4444;
  color: white;
}

.navbar-button.logout:hover {
  background-color: #dc2626;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .navbar-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    max-width: 300px;
    height: 100vh;
    background: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 5rem 2rem 2rem;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    overflow-y: auto;
  }

  .navbar-menu.active {
    right: 0;
  }

  .navbar-link,
  .navbar-user,
  .navbar-button {
    width: 100%;
    text-align: left;
  }

  .navbar-link.active::after {
    display: none;
  }

  .navbar-button.login,
  .navbar-button.signup,
  .navbar-button.logout {
    margin-top: 0.5rem;
  }
}

/* Focus states for accessibility */
.navbar-link:focus,
.navbar-button:focus,
.hamburger:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
