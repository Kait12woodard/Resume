<template>
  <ScrollCharacter />
  <h1 class="text-3xl font-bold my-8">About Me</h1>

  <section class="about-me space-y-16">
    <img :src="swishLine" alt="" class="swish-line swish-top" />

    <div class="story-block left">
      <p>
        My journey into software engineering hasn't followed a straight line — but it's that winding
        trail that's shaped me into a curious, adaptable, and driven developer.
      </p>
    </div>

    <img :src="gradphoto" alt="Graduation Photo" id="grad-photo" />

    <div class="story-block right">
      <p>
        Right out of high school, I jumped into both work and college. I started as a Sandwich Artist
        at Subway while attending Portland Community College full-time. I quickly moved into a Shift
        Lead role, taking on more responsibility and discovering how much I enjoyed solving problems
        and helping a team grow.
      </p>
    </div>

    <img :src="subway" alt="Sandwich Artist" id="subway-photo" />

    <div class="story-block left">
      <p>
        At PCC, I focused on general studies while exploring a variety of subjects to find my direction.
        When I relocated to the Salem area, I joined Carhartt as a Brand Ambassador. After finishing
        my associate's degree, I continued growing professionally and eventually worked my way up to
        Supervisor. That role gave me the opportunity to develop real leadership skills — from team
        communication to problem-solving under pressure.
      </p>
    </div>

    <img :src="carhartt" alt="Carhartt" id="carhartt-photo" />
    <img :src="swishLine" alt="" class="swish-line swish-bottom" />

    <div class="story-block right">
      <p>
        It was during this time that I became “the techy one” at our store — the person everyone
        turned to for troubleshooting software, submitting IT tickets, and making sense of the tools
        we relied on. That experience sparked something deeper: a desire to understand not just how
        the systems worked, but how they could be improved.
      </p>
    </div>

    <img :src="supervisor" alt="Supervisor Carhartt" id="supervisor-photo" />

    <div class="story-block left">
      <p>
        So I made the leap and enrolled at Western Oregon University to pursue a Bachelor's degree
        in Computer Science. Over the course of three years, I gained hands-on experience with
        full-stack development and deepened my understanding of how software is built from the ground
        up. For a few months during that time, I also worked as a research assistant for a CS professor,
        where I explored AI tools and created educational videos to support student learning — a unique
        project that expanded both my technical and creative skill sets. During this transition, I was
        fortunate to be supported by my husband, which allowed me to fully focus on my education and
        growth. That time gave me the space I needed to invest in becoming the engineer I am today.
      </p>
    </div>

    <img :src="wouPhoto" alt="WOU Photo" id="wou-photo" />

    <div class="story-block center">
      <p>
        Now, I'm excited to bring my background in leadership, user experience, and full-stack
        development into the software industry. Whether working on front-end interfaces or
        back-end systems, I'm passionate about building thoughtful, resilient tools — and telling
        a great story through the code I write.
      </p>
    </div>
  </section>
</template>

<script setup>
import gradphoto   from '@/assets/gradphoto.jpeg';
import swishLine   from '@/assets/swish-line.svg';
import subway      from '@/assets/subway.PNG';
import carhartt    from '@/assets/carhartt.jpg';
import supervisor  from '@/assets/supervisor-carhartt.jpg';
import wouPhoto    from '@/assets/wou-photo.jpg';
import ScrollCharacter from '@/components/ScrollCharacter.vue'
</script>

<style scoped>
#grad-photo,
#carhartt-photo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0,0,0,.1);
  border: 5px solid black;
  align-self: flex-end;
  margin-left: auto;
}

#subway-photo,
#supervisor-photo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0,0,0,.1);
  border: 5px solid black;
  align-self: flex-start;
  margin-right: auto;
  transform: scaleX(-1);
}

#wou-photo {
  width: 600px;
  height: 400px;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0,0,0,.1);
  border: 5px solid black;
  align-self: center;
  margin: 0 auto;
}

.swish-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2000px;
  height: auto;
  pointer-events: none;
  opacity: 0.4;
  z-index: 0;
}

.swish-top {
  top: 0;
}

.swish-bottom {
  top: 1800px;
  transform: translate(-50%);
}

.about-me {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 1rem;
}

.story-block {
  position: relative;
  z-index: 1;
  max-width: 700px;
}

.story-block.left {
  align-self: flex-start;
  text-align: left;
}

.story-block.right {
  align-self: flex-end;
  text-align: right;
}

.story-block.center {
  align-self: center;
  text-align: center;
}
</style>
