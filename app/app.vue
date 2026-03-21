<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  // Simple check for first visit (demo purpose)
  const hasSeenOnboarding = localStorage.getItem('onboarding_completed')
  if (!hasSeenOnboarding && route.path !== '/onboarding') {
    router.push('/onboarding')
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
