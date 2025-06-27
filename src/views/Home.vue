<template>
  <div class="home">
    <h1>Let's Code Together</h1>

    <div class="frame-container">
      <div class="frame" @click="goTo('about')">
        <img src="/painting.png" alt="About Me" />
        <h2>About</h2>
        <p>A brief introduction to my journey and background.</p>
      </div>

      <div class="frame" @click="goTo('experiences')">
        <img src="/painting.png" alt="Experiences" />
        <h2>Experiences</h2>
        <p>Highlights of jobs that shaped who I am professionally.</p>
      </div>

      <div class="frame" @click="goTo('videos')">
        <img src="/painting.png" alt="Project Videos" />
        <h2>Project Videos</h2>
        <p>See my work in action.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(routeName) {
  router.push(`/${routeName}`)
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.frame-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.frame {
  border: 2px solid #ccc;
  border-radius: 12px;
  width: 250px;
  padding: 1rem;
  transition: transform 0.3s;
  cursor: pointer;
  background: #f9f9f9;
}

.frame:hover {
  transform: scale(1.05);
  border-color: #646cff;
}

.frame img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
