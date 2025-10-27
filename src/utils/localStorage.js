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

