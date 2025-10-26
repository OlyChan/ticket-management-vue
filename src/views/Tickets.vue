<template>
  <div class="tickets-page">
    <div class="tickets-container">
      <!-- Header -->
      <div class="tickets-header">
        <div>
          <h1 class="tickets-title">Ticket Management</h1>
          <p class="tickets-subtitle">
            Create, view, edit, and manage all your tickets
          </p>
        </div>
        <button class="btn-create" @click="openModal()">
          <span>➕</span> Create Ticket
        </button>
      </div>

      <!-- Tickets Grid -->
      <div v-if="tickets.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <h2>No Tickets Yet</h2>
        <p>Create your first ticket to get started</p>
        <button class="btn-create" @click="openModal()">
          Create Ticket
        </button>
      </div>

      <div v-else class="tickets-grid">
        <div 
          v-for="ticket in tickets" 
          :key="ticket.id" 
          class="ticket-card"
        >
          <div class="ticket-header">
            <span :class="['status-badge', getStatusColor(ticket.status)]">
              {{ getStatusLabel(ticket.status) }}
            </span>
            <span 
              v-if="ticket.priority" 
              :class="['priority-badge', getPriorityColor(ticket.priority)]"
            >
              {{ ticket.priority }}
            </span>
          </div>
          
          <h3 class="ticket-title">{{ ticket.title }}</h3>
          
          <p v-if="ticket.description" class="ticket-description">
            {{ ticket.description }}
          </p>
          
          <div class="ticket-meta">
            <span class="ticket-date">
              📅 {{ formatDate(ticket.createdAt) }}
            </span>
          </div>
          
          <div class="ticket-actions">
            <button class="btn-edit" @click="openModal(ticket)">
              ✏️ Edit
            </button>
            <button class="btn-delete" @click="openDeleteModal(ticket)">
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div 
        v-if="isModalOpen" 
        class="modal-overlay" 
        @click="closeModal"
      >
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
            <button class="modal-close" @click="closeModal">✕</button>
          </div>
          
          <form @submit.prevent="handleSubmit" class="ticket-form">
            <div class="form-group">
              <label for="title" class="form-label">
                Title <span class="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                v-model="formData.title"
                :class="['form-input', { error: errors.title }]"
                placeholder="Enter ticket title"
              />
              <span v-if="errors.title" class="error-message">
                {{ errors.title }}
              </span>
            </div>

            <div class="form-group">
              <label for="description" class="form-label">Description</label>
              <textarea
                id="description"
                v-model="formData.description"
                :class="['form-textarea', { error: errors.description }]"
                placeholder="Enter ticket description"
                rows="4"
              />
              <span v-if="errors.description" class="error-message">
                {{ errors.description }}
              </span>
              <span class="char-count">
                {{ formData.description.length }} / 500 characters
              </span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="status" class="form-label">
                  Status <span class="required">*</span>
                </label>
                <select
                  id="status"
                  v-model="formData.status"
                  :class="['form-select', { error: errors.status }]"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <span v-if="errors.status" class="error-message">
                  {{ errors.status }}
                </span>
              </div>

              <div class="form-group">
                <label for="priority" class="form-label">Priority</label>
                <select
                  id="priority"
                  v-model="formData.priority"
                  class="form-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-cancel" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="btn-submit">
                {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div 
        v-if="isDeleteModalOpen" 
        class="modal-overlay" 
        @click="closeDeleteModal"
      >
        <div class="modal-content delete-modal" @click.stop>
          <div class="modal-header">
            <h2>Confirm Delete</h2>
            <button class="modal-close" @click="closeDeleteModal">✕</button>
          </div>
          
          <div class="delete-content">
            <div class="delete-icon">⚠️</div>
            <p>
              Are you sure you want to delete this ticket?<br />
              <strong>"{{ ticketToDelete?.title }}"</strong>
            </p>
            <p class="delete-warning">This action cannot be undone.</p>
          </div>

          <div class="modal-footer">
            <button class="btn-cancel" @click="closeDeleteModal">
              Cancel
            </button>
            <button class="btn-delete-confirm" @click="handleDelete">
              Delete Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'
import { getTickets, addTicket, updateTicket, deleteTicket } from '../utils/localStorage'
import { useAuthStore } from '../stores/auth'

const toast = useToast()
const authStore = useAuthStore()

const tickets = ref([])
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const editingTicket = ref(null)
const ticketToDelete = ref(null)

const formData = reactive({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
})

const errors = reactive({})

const loadTickets = () => {
  const allTickets = getTickets()
  // Sort by newest first
  tickets.value = allTickets.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  )
}

const openModal = (ticket = null) => {
  if (ticket) {
    editingTicket.value = ticket
    formData.title = ticket.title
    formData.description = ticket.description || ''
    formData.status = ticket.status
    formData.priority = ticket.priority || 'medium'
  } else {
    editingTicket.value = null
    formData.title = ''
    formData.description = ''
    formData.status = 'open'
    formData.priority = 'medium'
  }
  Object.keys(errors).forEach(key => delete errors[key])
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingTicket.value = null
  formData.title = ''
  formData.description = ''
  formData.status = 'open'
  formData.priority = 'medium'
  Object.keys(errors).forEach(key => delete errors[key])
}

const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!formData.title.trim()) {
    errors.title = 'Title is required'
  }

  if (!formData.status) {
    errors.status = 'Status is required'
  } else if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
    errors.status = 'Invalid status value'
  }

  if (formData.description && formData.description.length > 500) {
    errors.description = 'Description must be less than 500 characters'
  }

  return Object.keys(errors).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  if (editingTicket.value) {
    // Update existing ticket
    updateTicket(editingTicket.value.id, {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority
    })
    toast.success('Ticket updated successfully!')
  } else {
    // Create new ticket
    const newTicket = {
      id: uuidv4(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      createdBy: authStore.user?.id || 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    addTicket(newTicket)
    toast.success('Ticket created successfully!')
  }

  loadTickets()
  closeModal()
}

const openDeleteModal = (ticket) => {
  ticketToDelete.value = ticket
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  ticketToDelete.value = null
}

const handleDelete = () => {
  if (ticketToDelete.value) {
    deleteTicket(ticketToDelete.value.id)
    toast.success('Ticket deleted successfully!')
    loadTickets()
    closeDeleteModal()
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'status-open'
    case 'in_progress':
      return 'status-progress'
    case 'closed':
      return 'status-closed'
    default:
      return ''
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'in_progress':
      return 'In Progress'
    case 'open':
      return 'Open'
    case 'closed':
      return 'Closed'
    default:
      return status
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'priority-high'
    case 'medium':
      return 'priority-medium'
    case 'low':
      return 'priority-low'
    default:
      return ''
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  loadTickets()
})
</script>

<style src="../assets/tickets.css" scoped></style>
