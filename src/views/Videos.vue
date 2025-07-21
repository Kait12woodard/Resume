<template>
  <div class="video-page">
    <h1 class="page-title">Video Showcase</h1>

    <div class="video-layout-wrapper">
      <div
        class="video-info-card"
        id="capstone-info"
        :class="{ active: activeCard === 'capstone-info' }"
        @click="toggleCard('capstone-info')"
        :style="activeCard === 'capstone-info' ? 'z-index: 9999;' : ''"
      >
        <button class="close-button" @click.stop="toggleCard(null)" aria-label="Close card">×</button>
        <div class="video-text-top"><h2>Capstone</h2></div>
        <div class="video-text">
          <p>Practiced Agile and Scrum methodologies including BDD and TDD. Applied DRY principles in a full-stack C# ASP.NET project. Worked with HTML, CSS, JavaScript, Git/GitHub, and two databases — Microsoft Identity for user accounts and another for app-specific data using Entity Framework. Collaborated with a team across multiple sprints.</p>
        </div>
      </div>

      <div
        class="video-card"
        id="capstone-video"
        :class="{ active: activeCard === 'capstone-video' }"
        @click="toggleCard('capstone-video')"
        :style="activeCard === 'capstone-video' ? 'z-index: 9999;' : ''"
      >
        <button class="close-button" @click.stop="toggleCard(null)" aria-label="Close card">×</button>
        <div class="video-text-top"><h2>Movie Magic</h2></div>
        <div class="video-frame" @wheel.stop>
          <iframe src="https://www.youtube.com/embed/zs7uhIZOo04" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-text">
          <p>A walkthrough of my senior capstone project — a search engine that helps users find where movies are currently streaming.</p>
        </div>
      </div>

      <div
        class="video-info-card"
        id="research-info"
        :class="{ active: activeCard === 'research-info' }"
        @click="toggleCard('research-info')"
        :style="activeCard === 'research-info' ? 'z-index: 9999;' : ''"
      >
        <button class="close-button" @click.stop="toggleCard(null)" aria-label="Close card">×</button>
        <div class="video-text-top"><h2>Research Assistant Videos</h2></div>
        <div class="video-text">
          <p>Gained experience working independently and reporting to a professor. Used self-motivation and research skills to learn and apply AI tools like DaVinci Resolve, ComfyUI (node-based programming), RunwayML, ChatGPT, Sora, and ElevenLabs. Learned how to work with new technologies and produce educational content.</p>
        </div>
      </div>

      <div
        class="video-card"
        id="research-video"
        :class="{ active: activeCard === 'research-video' }"
        @click="toggleCard('research-video')"
        :style="activeCard === 'research-video' ? 'z-index: 9999;' : ''"
      >
        <button class="close-button" @click.stop="toggleCard(null)" aria-label="Close card">×</button>
        <div class="video-text-top"><h2>What is a Computer?</h2></div>
        <div class="video-frame" @wheel.stop>
          <iframe src="https://www.youtube.com/embed/kW2wL5mKzic" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-text">
          <p>Explains the foundational concept of what a computer is, created as part of a video series while working as a research assistant.<br><strong>Tools used:</strong> Sora, ChatGPT, ElevenLabs, DaVinci Resolve</p>
        </div>
      </div>

      <div
        class="video-card"
        id="machine-cycle"
        :class="{ active: activeCard === 'machine-cycle' }"
        @click="toggleCard('machine-cycle')"
        :style="activeCard === 'machine-cycle' ? 'z-index: 9999;' : ''"
      >
        <button class="close-button" @click.stop="toggleCard(null)" aria-label="Close card">×</button>
        <div class="video-text-top"><h2>The Machine Cycle</h2></div>
        <div class="video-frame" @wheel.stop>
          <iframe src="https://www.youtube.com/embed/u3KsbF0U8mo" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-text">
          <p>Covers the fetch-decode-execute cycle in computers and how instructions are processed, explained in accessible terms.<br><strong>Tools used:</strong> RunwayML, ComfyUI, ChatGPT, ElevenLabs, DaVinci Resolve</p>
        </div>
      </div>

      <div
        class="video-card"
        id="parallelism-video"
        :class="{ active: activeCard === 'parallelism-video' }"
        @click="toggleCard('parallelism-video')"
        :style="activeCard === 'parallelism-video' ? 'z-index: 9999;' : ''"
      >
        <button class="close-button" @click.stop="toggleCard(null)" aria-label="Close card">×</button>
        <div class="video-text-top"><h2>Control Parallelism</h2></div>
        <div class="video-frame" @wheel.stop>
          <iframe src="https://www.youtube.com/embed/J6QzEUpEAFc" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-text">
          <p>Introduces parallelism in computing — why it matters and how it works — created to help CS students grasp core concepts more clearly.<br><strong>Tools used:</strong> RunwayML, ComfyUI, ChatGPT, ElevenLabs, DaVinci Resolve</p>
        </div>
      </div>

      <div
        class="video-info-card"
        id="other-info"
        :class="{ active: activeCard === 'other-info' }"
        @click="toggleCard('other-info')"
        :style="activeCard === 'other-info' ? 'z-index: 9999;' : ''"
      >
        <button class="close-button" @click.stop="toggleCard(null)" aria-label="Close card">×</button>
        <div class="video-text-top"><h2>Other Project Videos</h2></div>
        <div class="video-text">
          <p>These videos reflect my ability to research and present unfamiliar programming languages or CS concepts. Projects like my SWI Prolog presentation demonstrate the skill of learning new technologies and effectively communicating them to others — a key part of my academic experience.</p>
        </div>
      </div>

      <div
        class="video-card"
        id="prolog-video"
        :class="{ active: activeCard === 'prolog-video' }"
        @click="toggleCard('prolog-video')"
        :style="activeCard === 'prolog-video' ? 'z-index: 9999;' : ''"
      >
        <button class="close-button" @click.stop="toggleCard(null)" aria-label="Close card">×</button>
        <div class="video-text-top"><h2>SWI Prolog Presentation</h2></div>
        <div class="video-frame" @wheel.stop>
          <iframe src="https://www.youtube.com/embed/pDTdjXu4AUw" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-text">
          <p>For the final project in my Programming Languages course, I chose SWI Prolog. This video presents the language's fundamentals and showcases my ability to learn and explain unfamiliar technologies.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, watchEffect } from 'vue'

const activeCard = ref(null)

const cardOrder = [
  'capstone-info',
  'capstone-video',
  'research-info',
  'research-video',
  'machine-cycle',
  'parallelism-video',
  'other-info',
  'prolog-video'
]

function toggleCard(id) {
  activeCard.value = activeCard.value === id ? null : id
}

watch(activeCard, async (newVal, oldVal) => {
  document.body.style.overflow = newVal ? 'hidden' : ''
  if (oldVal) {
    const prev = document.getElementById(oldVal)
    if (prev) prev.style.transform = ''
  }
  if (newVal) {
    await nextTick()
    const el = document.getElementById(newVal)
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offsetX = (window.innerWidth / 2) - (rect.left + rect.width / 2)
    const offsetY = (window.innerHeight / 2) - (rect.top + rect.height / 2)
    el.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`
  }
})

function onKeydown(e) {
  if (e.key === 'Escape') {
    activeCard.value = null
  }
}

let scrollHandler = null

watchEffect(() => {
  const currentId = activeCard.value
  if (!currentId) return

  const el = document.getElementById(currentId)
  if (!el) return

  if (scrollHandler) {
    el.removeEventListener('wheel', scrollHandler)
  }

  scrollHandler = (e) => {
    const currentIndex = cardOrder.indexOf(currentId)
    if (currentIndex === -1) return

    let newIndex = currentIndex
    if (e.deltaY > 0 && currentIndex > 0) {
      newIndex = currentIndex - 1
    } else if (e.deltaY < 0 && currentIndex < cardOrder.length - 1) {
      newIndex = currentIndex + 1
    }

    if (newIndex !== currentIndex) {
      activeCard.value = cardOrder[newIndex]
    }
  }

  el.addEventListener('wheel', scrollHandler, { passive: true })
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (scrollHandler) {
    const el = document.getElementById(activeCard.value)
    if (el) el.removeEventListener('wheel', scrollHandler)
  }
})
</script>

<style scoped>
.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: #444;
  cursor: pointer;
  z-index: 10000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.video-card.active .close-button,
.video-info-card.active .close-button {
  opacity: 1;
  pointer-events: auto;
}

.close-button:hover {
  color: #000;
}

.video-layout-wrapper {
  position: relative;
  width: 200rem;
  padding-top: 2rem;
  min-height: 75rem;
  left: 40%;
  transform: translateX(-50%);
}

.video-layout-wrapper::before {
  content: '';
  display: block;
  height: 30rem; 
}

#capstone-info {
  position: absolute;
  bottom: -1rem;
  left: calc(50% - 33rem);
  z-index: 999;
}

#capstone-video {
  position: absolute;
  bottom: 8rem;
  left: calc(50% - 28rem);
  z-index: 998;
}

#research-info {
  position: absolute;
  bottom: 9rem;
  left: calc(50% - 23rem);
  z-index: 997;
}

#research-video {
  position: absolute;
  bottom: 16rem;
  left: calc(50% - 18rem);
  z-index: 996;
}

#machine-cycle {
  position: absolute;
  bottom: 19rem;
  left: calc(50% - 13rem);
  z-index: 995;
}

#parallelism-video {
  position: absolute;
  bottom: 24rem;
  left: calc(50% - 8rem);
  z-index: 994;
}

#other-info {
  position: absolute;
  bottom: 29rem;
  left: calc(50% - 3rem);
  z-index: 993;
}

#prolog-video {
  position: absolute;
  bottom: 36rem;
  left: calc(50% + 2rem);
  z-index: 992;
}

.video-page {
  width: 100%;
  margin: 0 auto;
}

.page-title {
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  color: black;
  margin-bottom: 4rem;
  padding: 1rem 2rem;
  border: 4px solid #82d6fa;
  border-radius: 20px;
  font-family: "Georgia", serif;
  background: rgba(255, 255, 255, 0.89);
  backdrop-filter: blur(4px);
}

.video-group {
  margin-bottom: 5rem;
}

.video-card,
.video-info-card {
  background-color: #82d6fa;
  border-radius: 20px;
  overflow: hidden;
  margin: 2rem auto;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  border: 15px solid #82d6fa;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease,
    z-index 0s;
}

.video-card:hover,
.video-info-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.video-card.active,
.video-info-card.active {
  position: absolute;
  width: 90vw;
  max-width: 1000px;
  max-height: 70vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #eaf6fb;
  border: 5px solid #82d6fa;
  border-radius: 1rem;
  overflow-y: auto;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.6);
  transition:
    transform 0.2s ease,
    width 0.2s ease,
    height 0.2s ease,
    padding 0.2s ease,
    border-radius 0.2s ease,
    box-shadow 0.2s ease;
}

.video-card.active .video-frame,
.video-info-card.active .video-frame {
  position: relative;
  padding-bottom: 56.25%;
}

.video-card.active .video-frame iframe,
.video-info-card.active .video-frame iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

iframe:hover {
  border: 10px solid #5475eb;
  box-shadow: 0 0 30px #5475eb;
}

.video-text-top {
  padding: 1rem 2rem 0.5rem;
  font-family: "Georgia", serif;
  background: rgba(255, 255, 255, 0.85);
  text-align: center;
}

.video-text-top h2 {
  font-size: 2rem;
  color: #1a1a1a;
  margin: 0;
}

.video-frame {
  width: 100%;
  height: 0;
  flex: 1 0 auto;
  padding-bottom: 56.25%;
  position: relative;
  background: black;
}

.video-frame iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
}

.video-card .video-text {
  padding: 1.5rem 2rem;
  font-family: "Georgia", serif;
  background: rgba(255, 255, 255, 0.85);
  border-top: 1px solid #ccc;
  text-align: center;
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}

.video-info-card .video-text {
  padding: 2rem;
  font-family: "Georgia", serif;
  background: rgba(255, 255, 255, 0.85);
  text-align: center;
  font-size: 1.7rem;
  line-height: 1.7;
  color: #333;
  min-height: 460px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
