<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import SelectingCharacter from '@/components/SelectingCharacter.vue'

const router = useRouter()
function goTo(routeName) {
  router.push(`/${routeName}`)
}

const target = ref({ x: 0, y: 0 })

function updateTarget(el) {
  const homeRect = document.querySelector('.home').getBoundingClientRect()
  const rect = el.getBoundingClientRect()
  const charWidth = 120 // width of character in px (match CSS)

  target.value = {
    x: rect.left - homeRect.left + rect.width / 2 - charWidth / 2,
    y: rect.bottom - homeRect.top + 20
  }
}

onMounted(() => {
  nextTick(() => {
    const first = document.querySelector('.frame')
    if (first) updateTarget(first)
  })
})
</script>

<template>
  <div class="home">
    <h1>Let's Code Together</h1>

    <div class="frame-container">
      <div
        class="frame"
        @click="goTo('about')"
        @mouseenter="updateTarget($event.currentTarget)"
      >
        <img src="/painting.png" alt="About Me" />
        <h2>About</h2>
        <p>A brief introduction to my journey and background.</p>
      </div>

      <div
        class="frame"
        @click="goTo('experiences')"
        @mouseenter="updateTarget($event.currentTarget)"
      >
        <img src="/painting.png" alt="Experiences" />
        <h2>Experiences</h2>
        <p>Highlights of jobs that shaped who I am professionally.</p>
      </div>

      <div
        class="frame"
        @click="goTo('videos')"
        @mouseenter="updateTarget($event.currentTarget)"
      >
        <img src="/painting.png" alt="Project Videos" />
        <h2>Project Videos</h2>
        <p>See my work in action.</p>
      </div>
    </div>

    <SelectingCharacter :target="target" />
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem 2rem 160px 2rem;
  position: relative;
}

.frame-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
  flex-wrap: wrap;
}

.frame {
  border: 10px solid #000;
  border-radius: 10px;
  width: 250px;
  padding: 1.25rem;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  background: #fff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

.frame:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px 15px rgba(0, 191, 255, 0.9);
}

.frame img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #000;
}

</style>
