<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <div>
          <h1 class="dashboard-title">Welcome back, {{ authStore.user?.name }}! 👋</h1>
          <p class="dashboard-subtitle">
            Here's your ticket information 
          </p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div 
          v-for="(stat, index) in statCards" 
          :key="index" 
          :class="['stat-card', stat.color]"
        >
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-content">
            <h3 class="stat-title">{{ stat.title }}</h3>
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-description">{{ stat.description }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2 class="section-title">Quick Actions</h2>
        <div class="actions-grid">
          <RouterLink 
            v-for="(action, index) in actions" 
            :key="index"
            :to="action.to" 
            class="action-card"
          >
            <div class="action-icon">{{ action.icon }}</div>
            <div class="action-content">
              <h3>{{ action.title }}</h3>
              <p>{{ action.description }}</p>
            </div>
            <span class="action-arrow">→</span>
          </RouterLink>
        </div>
      </div>

      <!-- Info Cards -->
     
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getTickets } from '../utils/localStorage'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0
})

const loadStats = () => {
  const tickets = getTickets()
  
  stats.value = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  }
}

const statCards = computed(() => [
  {
    title: 'Total Tickets',
    value: stats.value.total,
    icon: '🎫',
    color: 'blue',
    description: 'All tickets in the system'
  },
  {
    title: 'Open Tickets',
    value: stats.value.open,
    icon: '🟢',
    color: 'green',
    description: 'Tickets awaiting action'
  },
  {
    title: 'In Progress',
    value: stats.value.inProgress,
    icon: '🟡',
    color: 'amber',
    description: 'Tickets being worked on'
  },
  {
    title: 'Resolved Tickets',
    value: stats.value.closed,
    icon: '✅',
    color: 'gray',
    description: 'Completed tickets'
  }
])

const actions = [
  {
    to: '/tickets',
    icon: '📋',
    title: 'View All Tickets',
    description: 'Browse and manage all tickets'
  },
  {
    to: '/tickets?action=create',
    icon: '➕',
    title: 'Create New Ticket',
    description: 'Add a new ticket to the system'
  },
  {
    to: '/tickets?filter=open',
    icon: '🔍',
    title: 'View Open Tickets',
    description: 'See all tickets awaiting action'
  }
]

const performanceText = computed(() => {
  if (stats.value.closed > 0) {
    const percentage = ((stats.value.closed / stats.value.total) * 100).toFixed(1)
    return `${percentage}% of tickets have been resolved.`
  }
  return 'Start resolving tickets to see performance metrics.'
})

onMounted(() => {
  loadStats()
})
</script>

<style scoped>
.dashboard-page {
  min-height: calc(100vh - 80px);
  background-color: #f9fafb;
  padding: 2rem;
}

.dashboard-container {
  max-width: 1440px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2.5rem;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.dashboard-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.stat-card.blue {
  border-left-color: #3b82f6;
}

.stat-card.green {
  border-left-color: #10b981;
}

.stat-card.amber {
  border-left-color: #f59e0b;
}

.stat-card.gray {
  border-left-color: #6b7280;
}

.stat-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.stat-content {
  flex: 1;
}

.stat-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.stat-description {
  font-size: 0.875rem;
  color: #9ca3af;
}

/* Quick Actions */
.quick-actions {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.action-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
}

.action-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  flex-shrink: 0;
}

.action-content {
  flex: 1;
}

.action-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.action-content p {
  font-size: 0.875rem;
  color: #6b7280;
}

.action-arrow {
  font-size: 1.5rem;
  color: #3b82f6;
  font-weight: 700;
  transition: transform 0.3s ease;
}

.action-card:hover .action-arrow {
  transform: translateX(4px);
}

/* Info Section */
.info-section {
  margin-bottom: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  padding: 2rem;
  border-radius: 1rem;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.info-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.info-card p {
  font-size: 1rem;
  opacity: 0.95;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-page {
    padding: 1.5rem 1rem;
  }

  .dashboard-title {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard-title {
    font-size: 1.75rem;
  }

  .stat-value {
    font-size: 2rem;
  }

  .action-card {
    padding: 1.25rem;
  }

  .action-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
}

/* Focus states for accessibility */
.action-card:focus {
  outline: 3px solid #3b82f6;
  outline-offset: 2px;
}
</style>
