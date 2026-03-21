<template>
  <div class="space-y-10 lg:space-y-14 max-w-4xl mx-auto pb-20">
    <!-- Date Header -->
    <header class="text-center space-y-4">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-fixed rounded-full text-primary font-bold text-xs uppercase tracking-widest shadow-sm">
        <span class="material-symbols-outlined text-sm">calendar_today</span>
        Aujourd'hui
      </div>
      <h1 class="font-headline font-extrabold text-4xl lg:text-5xl tracking-tight text-on-surface">Ma Journée</h1>
      <p class="text-on-surface-variant font-medium text-lg opacity-70">{{ formattedDate }}</p>
    </header>

    <!-- Empty State -->
    <div v-if="loading" class="flex justify-center py-20">
      <span class="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
    </div>
    
    <div v-else-if="events.length === 0" class="bg-surface-container-low rounded-[2.5rem] p-10 lg:p-14 text-center flex flex-col items-center border border-outline-variant/10 shadow-sm mt-10">
      <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
        <span class="material-symbols-outlined text-5xl text-on-surface-variant opacity-50">event_note</span>
      </div>
      <h2 class="text-2xl lg:text-3xl font-bold font-headline mb-3 text-on-surface">Votre journée est calme</h2>
      <p class="text-on-surface-variant text-lg font-medium max-w-md">Vous n'avez pas d'événements prévus aujourd'hui. Profitez-en pour vous reposer ou explorer les exercices de relaxation.</p>
      
      <div class="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-lg justify-center">
        <NuxtLink to="/meds" class="flex-1 px-6 py-4 bg-primary text-on-primary rounded-full font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm">
          <span class="material-symbols-outlined text-xl">medication</span> Mes prises
        </NuxtLink>
        <NuxtLink to="/symptoms" class="flex-1 px-6 py-4 bg-surface-container-high text-on-surface-variant rounded-full font-black uppercase tracking-wider hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2 text-sm">
          <span class="material-symbols-outlined text-xl">stethoscope</span> Suivi
        </NuxtLink>
      </div>
    </div>

    <!-- Timeline Container (Hidden if empty) -->
    <div v-else class="relative lg:px-10">
      <div class="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-bottom from-transparent via-outline-variant/30 to-transparent lg:-translate-x-1/2"></div>
      
      <div class="space-y-12 lg:space-y-20">
        <div v-for="(event, index) in events" :key="index" class="relative group">
          <!-- Desktop Alt Layout: Left/Right side -->
          <div :class="['flex flex-col lg:flex-row items-center gap-8 lg:gap-20', index % 2 === 0 ? 'lg:flex-row-reverse' : '']">
            <!-- Contextual Info -->
            <div class="hidden lg:block lg:w-1/2 text-right" :class="index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'">
              <span class="text-sm font-bold uppercase tracking-[0.3em] text-on-surface-variant/40">
                {{ event.time }}
              </span>
            </div>

            <!-- Indicator Dot -->
            <div class="absolute left-6 lg:left-1/2 top-4 w-5 h-5 rounded-full border-4 border-white shadow-xl lg:-translate-x-1/2 z-10 transition-transform group-hover:scale-125 bg-outline-variant"></div>

            <!-- Event Card -->
            <div class="pl-16 lg:pl-0 lg:w-1/2 w-full">
              <div class="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(23,28,31,0.05)] border border-outline-variant/10 hover:shadow-xl transition-all cursor-pointer group/card relative overflow-hidden">                
                <div class="flex flex-col gap-4">
                  <div class="lg:hidden">
                    <span class="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                      {{ event.time }}
                    </span>
                  </div>
                  
                  <div>
                    <h3 class="font-headline font-bold text-2xl text-on-surface group-hover/card:text-primary transition-colors">{{ event.title }}</h3>
                    <p class="text-on-surface-variant font-medium mt-2 leading-relaxed opacity-80">{{ event.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const events = ref([]) // In a future phase, we fetch symptom_logs and daily medications here

const formattedDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })

onMounted(() => {
  // Empty array representing pure empty state for the generic timeline before complex queries are written
  events.value = []
  loading.value = false
})
</script>
