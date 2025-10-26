// localStorage keys
export const STORAGE_KEYS = {
  USERS: 'ticketapp_users',
  SESSION: 'ticketapp_session',
  TICKETS: 'ticketapp_tickets'
}

// User management
export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS)
  return users ? JSON.parse(users) : []
}

export const saveUser = (user) => {
  const users = getUsers()
  users.push(user)
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

export const findUserByEmail = (email) => {
  const users = getUsers()
  return users.find(user => user.email === email)
}

// Session management
export const getSession = () => {
  const session = localStorage.getItem(STORAGE_KEYS.SESSION)
  return session ? JSON.parse(session) : null
}

export const createSession = (user) => {
  const session = {
    token: Math.random().toString(36).substring(2) + Date.now().toString(36),
    userId: user.id,
    email: user.email,
    name: user.name,
    createdAt: Date.now()
  }
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))
  return session
}

export const clearSession = () => {
  localStorage.removeItem(STORAGE_KEYS.SESSION)
}

export const isAuthenticated = () => {
  return getSession() !== null
}

// Ticket management
export const getTickets = () => {
  const tickets = localStorage.getItem(STORAGE_KEYS.TICKETS)
  return tickets ? JSON.parse(tickets) : []
}

export const saveTickets = (tickets) => {
  localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets))
}

export const addTicket = (ticket) => {
  const tickets = getTickets()
  tickets.push(ticket)
  saveTickets(tickets)
}

export const updateTicket = (ticketId, updatedTicket) => {
  const tickets = getTickets()
  const index = tickets.findIndex(t => t.id === ticketId)
  if (index !== -1) {
    tickets[index] = { ...tickets[index], ...updatedTicket, updatedAt: new Date().toISOString() }
    saveTickets(tickets)
  }
}

export const deleteTicket = (ticketId) => {
  const tickets = getTickets()
  const filteredTickets = tickets.filter(t => t.id !== ticketId)
  saveTickets(filteredTickets)
}

// Seed default tickets
export const seedDefaultTickets = () => {
  const existingTickets = getTickets()
  if (existingTickets.length === 0) {
    const defaultTickets = [
      {
        id: 'ticket-1',
        title: 'Fix login authentication bug',
        description: 'Users are experiencing issues logging in with special characters in their passwords.',
        status: 'open',
        priority: 'high',
        createdBy: 'system',
        createdAt: new Date('2025-10-20T10:00:00').toISOString(),
        updatedAt: new Date('2025-10-20T10:00:00').toISOString()
      },
      {
        id: 'ticket-2',
        title: 'Update dashboard UI components',
        description: 'Modernize the dashboard with new card designs and better responsive layout.',
        status: 'in_progress',
        priority: 'medium',
        createdBy: 'system',
        createdAt: new Date('2025-10-22T14:30:00').toISOString(),
        updatedAt: new Date('2025-10-23T09:15:00').toISOString()
      },
      {
        id: 'ticket-3',
        title: 'Add email notification feature',
        description: 'Implement email notifications for ticket status changes and assignments.',
        status: 'open',
        priority: 'medium',
        createdBy: 'system',
        createdAt: new Date('2025-10-21T11:20:00').toISOString(),
        updatedAt: new Date('2025-10-21T11:20:00').toISOString()
      },
      {
        id: 'ticket-4',
        title: 'Database performance optimization',
        description: 'Optimize slow queries and add proper indexing to improve response times.',
        status: 'closed',
        priority: 'high',
        createdBy: 'system',
        createdAt: new Date('2025-10-18T08:00:00').toISOString(),
        updatedAt: new Date('2025-10-24T16:45:00').toISOString()
      },
      {
        id: 'ticket-5',
        title: 'Mobile app navigation improvements',
        description: 'Enhance mobile navigation with better touch targets and smoother transitions.',
        status: 'in_progress',
        priority: 'low',
        createdBy: 'system',
        createdAt: new Date('2025-10-23T13:00:00').toISOString(),
        updatedAt: new Date('2025-10-24T10:30:00').toISOString()
      }
    ]
    saveTickets(defaultTickets)
  }
}
