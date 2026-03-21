<template>
  <div class="space-y-10 pb-20">
    <!-- Header -->
    <header class="flex flex-col gap-6 max-w-4xl">
      <div class="flex items-center gap-4">
        <NuxtLink to="/symptoms" class="p-2 hover:bg-surface-container-high rounded-full transition-colors">
          <span class="material-symbols-outlined text-primary text-3xl">arrow_back</span>
        </NuxtLink>
        <h1 class="text-4xl lg:text-5xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">Analyse Symptôme</h1>
      </div>
    </header>

    <div class="bg-white rounded-[3rem] p-10 lg:p-14 border border-outline-variant/10 shadow-sm relative overflow-hidden">
      <div class="flex flex-col md:flex-row gap-12 items-start">
        <div class="w-24 h-24 rounded-3xl bg-secondary-container flex items-center justify-center shrink-0 shadow-sm">
          <span class="material-symbols-outlined text-on-secondary-container text-5xl">monitoring</span>
        </div>
        <div class="space-y-6 flex-1">
          <div>
            <h2 class="text-3xl font-black font-headline text-on-surface capitalize">{{ route.params.id }}</h2>
            <p class="text-on-surface-variant font-medium opacity-70">Identifié comme une douleur de type inflammatoire.</p>
          </div>
          
          <div class="flex flex-wrap gap-4">
            <div class="bg-primary-container/20 px-6 py-3 rounded-full border border-primary-container/10 flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-sm">speed</span>
              <span class="text-xs font-black uppercase tracking-widest text-primary">Intensité : 6/10</span>
            </div>
            <div class="bg-surface-container px-6 py-3 rounded-full border border-outline-variant/10 flex items-center gap-3">
              <span class="material-symbols-outlined text-on-surface-variant text-sm">history</span>
              <span class="text-xs font-black uppercase tracking-widest text-on-surface-variant">Fréquence : Quotidienne</span>
            </div>
          </div>
        </div>
      </div>

      <section class="mt-14 space-y-10">
        <div class="space-y-4">
          <h3 class="text-xl font-bold font-headline">Évolution Temporelle</h3>
          <div class="h-48 w-full bg-surface-container-lowest rounded-3xl border border-outline-variant/5 flex items-end p-6 gap-2">
            <div v-for="h in [40, 60, 80, 50, 70, 90, 60]" :key="h" :style="{ height: h + '%' }" class="flex-1 bg-primary/20 rounded-t-lg hover:bg-primary transition-all cursor-pointer"></div>
          </div>
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-center opacity-40">Derniers 7 jours</p>
        </div>

        <div class="space-y-6">
          <h3 class="text-xl font-bold font-headline">Recommandations</h3>
          <div class="bg-primary/5 p-8 rounded-3xl border border-primary/10 border-l-4 border-l-primary">
            <p class="text-on-surface-variant font-medium leading-relaxed">
              D'après votre historique, ce symptôme s'intensifie après l'exercice physique. Pensez à bien vous hydrater et à privilégier des séances de relaxation douce.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
