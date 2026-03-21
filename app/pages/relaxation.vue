<template>
  <div class="min-h-screen flex flex-col overflow-hidden slow-gradient font-body text-on-surface">
    <!-- Top Action Bar (Minimal) -->
    <header class="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-20">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-primary">spa</span>
        <span class="font-headline font-bold tracking-tight text-primary">Relaxation</span>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest/40 backdrop-blur-md rounded-full text-on-surface-variant hover:bg-surface-container-lowest/60 transition-all duration-300" @click="$router.back()">
        <span class="material-symbols-outlined text-sm">close</span>
        <span class="text-sm font-medium">Fermer</span>
      </button>
    </header>

    <!-- Main Immersive Canvas -->
    <main class="flex-grow flex flex-col items-center justify-center px-6 relative">
      <!-- Breathing Sphere Container -->
      <div class="relative flex items-center justify-center w-full max-w-md aspect-square">
        <!-- Animated Halo Layers -->
        <div class="absolute w-48 h-48 bg-secondary-fixed-dim rounded-full breathe-animation blur-3xl"></div>
        <div class="absolute w-64 h-64 bg-primary-fixed-dim rounded-full breathe-animation blur-2xl" style="animation-delay: -2s;"></div>
        <!-- Central Visual Anchor -->
        <div class="relative z-10 w-40 h-40 rounded-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center">
          <div class="w-full h-full rounded-full border-4 border-primary/20 absolute breathe-animation"></div>
          <p class="text-primary font-headline font-bold text-xl tracking-wide">{{ breathText }}</p>
          <div class="mt-2 flex gap-1">
            <div class="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-primary/10"></div>
          </div>
        </div>
        <!-- Floating Progress Rings (Subtle) -->
        <svg class="absolute w-80 h-80 -rotate-90 opacity-20">
          <circle class="text-primary" cx="160" cy="160" fill="transparent" r="150" stroke="currentColor" stroke-dasharray="942" stroke-dashoffset="300" stroke-width="2"></circle>
        </svg>
      </div>

      <!-- Feedback Text -->
      <div class="mt-12 text-center max-w-xs">
        <h2 class="font-headline text-2xl font-bold text-primary mb-2">Trouvez votre rythme</h2>
        <p class="text-on-surface-variant leading-relaxed opacity-80">Laissez la bulle guider votre souffle pour apaiser votre esprit.</p>
      </div>
    </main>

    <!-- Contextual Controls (Glassmorphism Dock) -->
    <section class="fixed bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-xl">
      <div class="bg-surface-container-lowest/60 backdrop-blur-2xl rounded-xl p-6 shadow-lg border border-white/30 flex flex-col gap-8">
        <!-- Duration Selector -->
        <div class="flex flex-col gap-3">
          <label class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60 px-1">Durée de la séance</label>
          <div class="grid grid-cols-3 gap-3">
            <button v-for="time in [2, 5, 10]" :key="time" class="py-3 px-4 rounded-xl font-medium transition-all shadow-md" :class="time === 2 ? 'bg-primary text-on-primary' : 'bg-surface-container-high/50 text-on-surface-variant hover:bg-surface-container-high'">
              {{ time }} min
            </button>
          </div>
        </div>
        <!-- Sound Atmosphere -->
        <div class="flex flex-col gap-3">
          <div class="flex justify-between items-center px-1">
            <label class="text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">Ambiance sonore</label>
            <span class="text-xs font-medium text-primary">Pluie douce</span>
          </div>
          <div class="flex justify-between items-center bg-surface-container-high/40 rounded-xl p-2">
            <button v-for="sound in sounds" :key="sound.name" class="flex-1 flex flex-col items-center py-3 gap-1 rounded-lg transition-all" :class="sound.active ? 'text-primary bg-surface-container-lowest shadow-sm' : 'text-on-surface-variant opacity-60 hover:opacity-100'">
              <span class="material-symbols-outlined">{{ sound.icon }}</span>
              <span class="text-[10px] font-medium">{{ sound.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Decorative Corner Elements -->
    <div class="fixed -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
    <div class="fixed -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const breathText = ref('Inspirez')
const sounds = [
  { name: 'Pluie', icon: 'water_drop', active: true },
  { name: 'Forêt', icon: 'forest', active: false },
  { name: 'Vent', icon: 'air', active: false },
  { name: 'Silence', icon: 'volume_off', active: false }
]

// Simple toggle for text demo
onMounted(() => {
  setInterval(() => {
    breathText.value = breathText.value === 'Inspirez' ? 'Expirez' : 'Inspirez'
  }, 5000)
})
</script>

<style scoped>
.breathe-animation {
  animation: breathe 10s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.6); opacity: 0.6; }
}

.slow-gradient {
  background: linear-gradient(-45deg, #f6fafd, #e0f2f1, #d4e3ff, #f6fafd);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
