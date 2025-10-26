<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <img 
        :src="circleDecorator" 
        alt="" 
        class="circle-decorator circle-1"
        aria-hidden="true"
      />
      <img 
        :src="circleDecorator" 
        alt="" 
        class="circle-decorator circle-2"
        aria-hidden="true"
      />
      
      <div class="hero-content">
        <h1 class="hero-title">
          Welcome to <span class="brand-name">TicketFlow</span>
        </h1>
        <p class="hero-description">
          Streamline your workflow with our powerful ticket management system. 
          Track, manage, and resolve tickets efficiently with an intuitive interface.
        </p>
        <div class="hero-buttons">
          <RouterLink to="/auth/signup" class="btn btn-primary">
            Get Started
          </RouterLink>
          <RouterLink to="/auth/login" class="btn btn-secondary">
            Login
          </RouterLink>
        </div>
      </div>
      
      <img 
        :src="waveHero" 
        alt="" 
        class="wave-background"
        aria-hidden="true"
      />
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-container">
        <h2 class="section-title">Why Choose TicketFlow?</h2>
        <p class="section-subtitle">
          Everything you need to manage tickets effectively
        </p>
        
        <div class="features-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="section-container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Get Started?</h2>
          <p class="cta-description">
            Join thousands of teams already using TicketFlow to streamline their workflow
          </p>
          <RouterLink to="/auth/signup" class="btn btn-cta">
            Create Your Account
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import waveHero from '../assets/svgs/wave-hero.svg'
import circleDecorator from '../assets/svgs/circle-decorator.svg'

const features = [
  {
    icon: '🎫',
    title: 'Easy Ticket Management',
    description: 'Create, track, and manage tickets effortlessly with our intuitive interface.'
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Get instant insights into your ticket status and team performance.'
  },
  {
    icon: '🔔',
    title: 'Smart Notifications',
    description: 'Stay updated with intelligent alerts and status change notifications.'
  },
  {
    icon: '👥',
    title: 'Team Collaboration',
    description: 'Work together seamlessly with built-in collaboration tools.'
  },
  {
    icon: '🎨',
    title: 'Customizable Workflows',
    description: 'Adapt the system to match your unique business processes.'
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    description: 'Your data is protected with enterprise-grade security measures.'
  }
]
</script>

<style scoped>
.landing-page {
  width: 100%;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 4rem 2rem;
}

.circle-decorator {
  position: absolute;
  width: 300px;
  height: 300px;
  pointer-events: none;
}

.circle-1 {
  top: -50px;
  right: 10%;
  opacity: 1;
  animation: float 6s ease-in-out infinite;
}

.circle-2 {
  bottom: 100px;
  left: 5%;
  opacity: 1;
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.hero-content {
  max-width: 800px;
  text-align: center;
  z-index: 2;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.brand-name {
  color: #fbbf24;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #fbbf24;
  color: #1f2937;
}

.btn-primary:hover {
  background-color: #f59e0b;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(251, 191, 36, 0.4);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.wave-background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background-color: #f9fafb;
}

.section-container {
  max-width: 1440px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  text-align: center;
  color: #6b7280;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
}

.cta-content {
  text-align: center;
  color: white;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.btn-cta {
  background-color: white;
  color: #3b82f6;
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.btn-cta:hover {
  background-color: #f3f4f6;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }

  .circle-1,
  .circle-2 {
    width: 200px;
    height: 200px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .section-title,
  .cta-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-section {
    min-height: 500px;
    padding: 3rem 1rem;
  }

  .features-section,
  .cta-section {
    padding: 3rem 1rem;
  }
}

/* Focus states for accessibility */
.btn:focus {
  outline: 3px solid #fbbf24;
  outline-offset: 3px;
}
</style>
