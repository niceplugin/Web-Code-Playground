<template>
  <router-view/>
</template>

<script setup>
document.addEventListener('keydown', function(event) {
  const ctrlKey = (event.ctrlKey || event.metaKey)
  const sKey = event.key === 's'
  if (ctrlKey && sKey) {
    event.preventDefault();
  }
});
</script>

<style scoped>
</style>
