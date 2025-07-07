<template>
  <transition name="spin-slide">
    <img v-if="visible" :src="sandwich" alt="Sandwich" class="sandwich" />
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import sandwich from '@/assets/sandwich.png'

const visible = ref(false)

function trigger () {
  visible.value = !visible.value
}

defineExpose({ trigger })
</script>

<style scoped>
.sandwich{
  width:300px;
  position:absolute;
  top:50%;
  left:360px;
  transform:translateY(-50%);
  z-index:10
}

.spin-slide-enter-active{
  animation:spinIn .8s ease-out forwards
}
.spin-slide-leave-active{
  animation:spinOut .8s ease-in forwards
}

@keyframes spinIn{
  0%{transform:translateY(-50%) rotate(0deg)   scale(0);opacity:0}
  100%{transform:translateY(-50%) rotate(720deg) scale(1);opacity:1}
}
@keyframes spinOut{
  0%{transform:translateY(-50%) rotate(720deg)  scale(1);opacity:1}
  100%{transform:translateY(-50%) rotate(0deg)   scale(0);opacity:0}
}
</style>
