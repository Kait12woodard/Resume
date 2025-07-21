<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<style>
  body {
    margin: 0;
    background-color: #eef2f6;
  }
</style>
