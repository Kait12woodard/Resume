<template>
  <div class="carousel">
    <div class="slides">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="experience-card"
        :class="{ active: index === activeIndex }"
      >
        <h2>{{ card.title }}</h2>
        <p class="meta">{{ card.meta }}</p>
        <div class="details">
          <div v-for="(section, i) in card.sections" :key="i">
            <h3>{{ section.heading }}</h3>
            <p>{{ section.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <ul class="nav-links">
      <li v-for="(card, index) in cards" :key="index">
        <a
          href="#"
          class="nav-link"
          :class="{ active: index === activeIndex }"
          @click.prevent="activeIndex = index"
        >{{ card.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)

const cards = [
  {
    title: 'B.S. in Computer Science',
    meta: '2022 – 2025 · Western Oregon University — Monmouth, OR',
    sections: [
      {
        heading: 'Languages & Frameworks',
        text: 'C, C#, Python, JavaScript, HTML, CSS, Vue.js, ASP.NET, Entity Framework.'
      },
      {
        heading: 'Tools & Platforms',
        text: 'Visual Studio, VS Code, Git/GitHub, Azure DevOps, DaVinci Resolve, ComfyUI, Stable Diffusion, RunwayML, AnimateDiff, ElevenLabs.'
      },
      {
        heading: 'Databases',
        text: 'SQL Server, Microsoft Identity, relational schema design, normalization, and repository design pattern.'
      },
      {
        heading: 'Methodologies',
        text: 'Agile, Scrum, Test-Driven Development (TDD), Behavior-Driven Development (BDD), UML, MVVM, MVC, SDLC.'
      },
      {
        heading: 'Coursework Highlights',
        text: 'Full-stack web development, software architecture, systems programming, database management, data structures & algorithms, operating systems, and AI applications.'
      }
    ]
  },
  {
    title: 'Research Assistant',
    meta: 'Sept 2024 – Jan 2025 · Western Oregon University — Monmouth, OR',
    sections: [
      {
        heading: 'AI Research & Experimentation',
        text: 'Under the guidance of a professor, I independently explored AI-based video creation tools like Stable Diffusion, RunwayML, AnimateDiff, and ElevenLabs. I tested their limits and evaluated their practical use in media workflows.'
      },
      {
        heading: 'Content Creation',
        text: 'I used tools like ChatGPT, DaVinci Resolve, and ComfyUI to create educational videos that explained concepts like the machine cycle, data parallelism, and control parallelism in a digestible way for beginners.'
      },
      {
        heading: 'Workflow Optimization',
        text: 'My work contributed to more efficient AI-assisted content production by streamlining rendering setups and improving visual quality, demonstrating both technical precision and creative problem-solving.'
      }
    ]
  },
  {
    title: 'Consumer Experience Leader / Brand Ambassador',
    meta: 'May 2017 – Sept 2022 · Carhartt — Keizer, OR',
    sections: [
      {
        heading: 'Team Leadership & Mentorship',
        text: 'I led a team of Brand Ambassadors, mentoring new hires and promoting a culture of inclusion, collaboration, and mutual support. I emphasized empowerment and growth, which helped reduce turnover and build a high-performing team.'
      },
      {
        heading: 'Customer Relationship Management',
        text: 'I built deep customer loyalty by matching expert product knowledge with attentive service. I resolved complex disputes and personalized service to ensure every customer felt seen and valued.'
      },
      {
        heading: 'Operations & Reporting',
        text: 'I managed inventory, merchandising, and register operations while interpreting sales reports to drive store improvements. I regularly presented insights to leadership, demonstrating strong analytical and communication skills.'
      },
      {
        heading: 'Recognition',
        text: 'I was awarded Brand Ambassador of the Month multiple times and achieved both Journeyman and Master level during my time at Carhartt.'
      }
    ]
  },
  {
    title: 'Sandwich Artist / Supervisor',
    meta: 'Dec 2014 – Mar 2017 · Subway — North Plains, OR',
    sections: [
      {
        heading: 'Customer Service Excellence',
        text: 'I consistently delivered quick, friendly, and efficient service in a fast-paced environment while maintaining quality and accuracy.'
      },
      {
        heading: 'Operations & Food Safety',
        text: 'I managed store open/close duties, cash handling, inventory rotation, and compliance with food safety standards. I proactively forecasted demand and ensured fresh product availability throughout the day.'
      },
      {
        heading: 'Leadership & Training',
        text: 'I trained new hires and led catering orders. I also organized store parties and events, showing initiative and leadership beyond my daily responsibilities.'
      }
    ]
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:400,400i,700&display=swap');

body {
  margin: 0;
  background: #ECEFFC;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 4rem;
  max-width: 1200px;
  margin: 4rem auto;
}

.slides {
  position: relative;
  width: 600px;
  height: 550px;
}

.experience-card {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transform: scale(0.95);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.experience-card.active {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}

.experience-card h2 {
  margin: 0 0 0.5rem;
}

.meta {
  font-style: italic;
  color: #555;
  margin-bottom: 1rem;
}

.details h3 {
  margin: 1rem 0 0.25rem;
}

.details p {
  margin: 0;
}

.nav-links {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.nav-links li {
  margin-bottom: 1rem;
}

.nav-link {
  font-size: 1.25rem;
  font-family: 'Lora', serif;
  text-decoration: none;
  color: #7f8c8d;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #1c1e1f;
}

.nav-link.active {
  color: black;
  font-weight: bold;
  pointer-events: none;
}
</style>
