<template>
  <nav class="navbar">
    <RouterLink v-for="link in links" :key="link.name" :to="link.to" class="nav-link">
      {{ link.name }}
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { name: 'Home', to: '/home' },
  { name: 'About', to: '/about' },
  { name: 'Experiences', to: '/experiences' },
  { name: 'Videos', to: '/videos' }
]
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1.5rem;
  background: linear-gradient(to bottom, #89c2ff, #4db477);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  font-family: 'Quicksand', sans-serif;
  border-radius: 24px;
  position: sticky;
  top: 0;
  z-index: 999;
}

.nav-link {
  position: relative;
  font-size: 1.3rem;
  text-decoration: none;
  color: white;
  transition: transform 0.2s ease-in-out;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 0%;
  height: 3px;
  background: white;
  transition: 0.3s ease;
  transform: translateX(-50%);
  border-radius: 2px;
}

.nav-link:hover {
  transform: scale(1.1);
  text-shadow: 0 0 8px white;
}

.nav-link:hover::after {
  width: 80%;
}

.router-link-active {
  font-weight: bold;
  text-shadow: 0 0 6px white;
}
</style>
