<template>
  <div class="page">
    <h1 class="title">Work Experience</h1>

    <div class="content">
      <section class="experience-card blue tilt-left">
        <h2>Research Assistant</h2>
        <p class="meta">Sept 2024 – Jan 2025 · Western Oregon University — Monmouth, OR</p>

        <div class="details">
          <div>
            <h3>AI Research &amp; Experimentation</h3>
            <p>Under the guidance of a professor, I independently explored AI-based video creation tools like Stable Diffusion, RunwayML, AnimateDiff, and ElevenLabs. I tested their limits and evaluated their practical use in media workflows.</p>
          </div>
          <div>
            <h3>Content Creation</h3>
            <p>I used tools like ChatGPT, DaVinci Resolve, and ComfyUI to create educational videos that explained concepts like the machine cycle, data parallelism, and control parallelism in a digestible way for beginners.</p>
          </div>
          <div>
            <h3>Workflow Optimization</h3>
            <p>My work contributed to more efficient AI-assisted content production by streamlining rendering setups and improving visual quality, demonstrating both technical precision and creative problem-solving.</p>
          </div>
        </div>
      </section>

      <section class="experience-card green tilt-right">
        <h2>Consumer Experience Leader / Brand Ambassador</h2>
        <p class="meta">May 2017 – Sept 2022 · Carhartt — Keizer, OR</p>

        <div class="details">
          <div>
            <h3>Team Leadership &amp; Mentorship</h3>
            <p>I led a team of Brand Ambassadors, mentoring new hires and promoting a culture of inclusion, collaboration, and mutual support. I emphasized empowerment and growth, which helped reduce turnover and build a high-performing team.</p>
          </div>
          <div>
            <h3>Customer Relationship Management</h3>
            <p>I built deep customer loyalty by matching expert product knowledge with attentive service. I resolved complex disputes and personalized service to ensure every customer felt seen and valued.</p>
          </div>
          <div>
            <h3>Operations &amp; Reporting</h3>
            <p>I managed inventory, merchandising, and register operations while interpreting sales reports to drive store improvements. I regularly presented insights to leadership, demonstrating strong analytical and communication skills.</p>
          </div>
          <div>
            <h3>Recognition</h3>
            <p>I was awarded Brand Ambassador of the Month multiple times and achieved both Journeyman and Master level during my time at Carhartt.</p>
          </div>
        </div>
      </section>

      <section class="experience-card purple tilt-left">
        <h2>Sandwich Artist / Supervisor</h2>
        <p class="meta">Dec 2014 – Mar 2017 · Subway — North Plains, OR</p>

        <div class="details">
          <div>
            <h3>Customer Service Excellence</h3>
            <p>I consistently delivered quick, friendly, and efficient service in a fast-paced environment while maintaining quality and accuracy.</p>
          </div>
          <div>
            <h3>Operations &amp; Food Safety</h3>
            <p>I managed store open/close duties, cash handling, inventory rotation, and compliance with food safety standards. I proactively forecasted demand and ensured fresh product availability throughout the day.</p>
          </div>
          <div>
            <h3>Leadership &amp; Training</h3>
            <p>I trained new hires and led catering orders. I also organized store parties and events, showing initiative and leadership beyond my daily responsibilities.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;600;700&display=swap');

.page {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #bae6ff 0%, #6ee7b7 100%);
  min-height: 100vh;
  padding: 4rem 1.5rem;
  box-sizing: border-box;
  border-radius: 2rem;
  margin: 2rem auto;
  max-width: 90rem;
  box-shadow: inset 0 0 0.75rem rgba(0, 0, 0, 0.04);
}

.title {
  font-family: 'DM Serif Display', serif;
  font-size: 3rem;
  text-align: center;
  background: linear-gradient(180deg, #3b82f6, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 5rem;
}

.content {
  max-width: 60rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.experience-card {
  background: radial-gradient(circle at top left, #ffffff 0%, #fdfdfd 100%);
  border-radius: 1.75rem;
  padding: 2.5rem;
  border: 3px dashed;
  border-style: dashed;
  box-shadow:
    inset 0 0 0.5rem rgba(0, 0, 0, 0.03),
    0 12px 24px rgba(0, 0, 0, 0.12),
    0 0 0 2px rgba(255, 255, 255, 0.6);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  text-align: left;
}

.experience-card:hover {
  transform: scale(1.015);
  box-shadow:
    inset 0 0 0.5rem rgba(0, 0, 0, 0.05),
    0 16px 36px rgba(0, 0, 0, 0.15),
    0 0 0 2px rgba(255, 255, 255, 0.8);
}

.blue { border-color: #93c5fd; }
.green { border-color: #6ee7b7; }
.purple { border-color: #d8b4fe; }

.tilt-left:hover { transform: scale(1.015) rotate(-1deg); }
.tilt-right:hover { transform: scale(1.015) rotate(1deg); }

.experience-card h2 {
  font-family: 'DM Serif Display', serif;
  font-size: 1.875rem;
  margin: 0 0 0.5rem;
  color: #1f2937;
}

.meta {
  font-size: 0.875rem;
  font-style: italic;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.details h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.details p {
  margin: 0 0 1.25rem;
  line-height: 1.7;
}
</style>

