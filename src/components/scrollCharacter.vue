<template>
  <svg class="scroll-path" :style="{ height: svgHeight + 'px' }" :viewBox="`0 0 ${svgWidth} ${svgHeight}`">
    <path :d="pathData" class="walk-line" />
  </svg>

  <div class="scroll-character" :style="{ left: `${left}px`, top: `${top}px` }">
    <img :src="characterSrc" :class="{ flipped: facing === 'right' }" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import hipPose        from '@/assets/character/hip_pose.png'
import standingPose   from '@/assets/character/standing_pose.png'
import running1       from '@/assets/character/running1.png'
import running2       from '@/assets/character/running2.png'

const charW=100,charH=150,margin=20,inset=60,cycles=3,samples=200,frameMS=200,flipTol=0.5,idleMS=800
const characterSrc=ref(hipPose),left=ref(0),top=ref(0),facing=ref('left')
const pathData=ref(''),svgWidth=ref(0),svgHeight=ref(0)
let running=false,toggleFrame=false,rafId=0,lastFrameTime=0,lastScroll=0,startY=0,travelY=0,lastX=0

function frameLoop(now){
  if(now-lastFrameTime>=frameMS){
    characterSrc.value=toggleFrame?running1:running2
    toggleFrame=!toggleFrame
    lastFrameTime=now
  }
  if(running)rafId=requestAnimationFrame(frameLoop)
}

function startRun(){
  lastScroll=performance.now()
  if(running)return
  running=true
  toggleFrame=false
  characterSrc.value=standingPose
  lastFrameTime=lastScroll
  rafId=requestAnimationFrame(frameLoop)
}

function maybeStopRun(){
  if(running&&performance.now()-lastScroll>idleMS){
    running=false
    cancelAnimationFrame(rafId)
    characterSrc.value=standingPose
    setTimeout(()=> {
        if(!running) characterSrc.value=hipPose
    },500)
  }
  requestAnimationFrame(maybeStopRun)
}

document.addEventListener('visibilitychange',()=>{
  if(!document.hidden&&running){
    cancelAnimationFrame(rafId)
    lastFrameTime=performance.now()
    rafId=requestAnimationFrame(frameLoop)
  }
})

const ease=t=>Math.pow(t,0.7)

function update(){
  const maxScroll=document.documentElement.scrollHeight-window.innerHeight
  const t=maxScroll?window.scrollY/maxScroll:0
  const waveW=window.innerWidth-charW-margin*2-inset*2
  const centerX=margin+inset+waveW/2
  const amp=waveW/2
  const x=centerX+amp*Math.cos(2*Math.PI*cycles*t-Math.PI/2)
  left.value=t>=1?centerX:Math.round(x)
  const delta=x-lastX
  if(Math.abs(delta)>flipTol)facing.value=delta<0?'left':'right'
  lastX=x
  top.value=startY+ease(t)*travelY
  startRun()
}

function buildPath(){
  const docHeight=document.documentElement.scrollHeight-window.innerHeight
  const waveW=window.innerWidth-charW-margin*2-inset*2
  const centerX=margin+inset+waveW/2
  const amp=waveW/2
  svgWidth.value=window.innerWidth
  svgHeight.value=docHeight+window.innerHeight
  const pts=[]
  for(let i=0;i<=samples;i++){
    const t=i/samples
    const x=centerX+amp*Math.cos(2*Math.PI*cycles*t-Math.PI/2)
    const absY=startY+ease(t)*travelY+t*docHeight+charH
    pts.push(`${Math.round(x)},${Math.round(absY)}`)
  }
  pathData.value=`M${pts[0]} L${pts.slice(1).join(' ')}`
}

function recomputeTravel(){
  travelY=Math.max(0,window.innerHeight-charH-margin-startY)
}

onMounted(async()=>{
  await nextTick()
  const house=document.getElementById('house-photo')
  if(house)startY=house.getBoundingClientRect().bottom+window.scrollY-charH
  recomputeTravel()
  buildPath()
  update()
  requestAnimationFrame(maybeStopRun)
  window.addEventListener('scroll',update,{passive:true})
  window.addEventListener('resize',()=>{
    recomputeTravel()
    buildPath()
    update()
  })
})

onUnmounted(()=>{
  window.removeEventListener('scroll',update)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.scroll-character{position:fixed;width:100px;height:150px;z-index:20;pointer-events:none;display:flex;align-items:flex-end;justify-content:center;transition:left .12s linear,top .18s linear}
.scroll-character img{width:100%;height:100%;object-fit:contain;transition:transform .1s}
.scroll-character img.flipped{transform:scaleX(-1)}
.scroll-path{position:absolute;top:0;left:0;width:100%;pointer-events:none;z-index:5}
.walk-line{fill:none;stroke:#555;stroke-width:8;stroke-dasharray:6 6;opacity:.4}
</style>
