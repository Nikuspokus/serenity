<template>
  <div class="space-y-10 pb-20">
    <!-- Header -->
    <header class="flex flex-col gap-6 max-w-4xl">
      <div class="flex items-center gap-4">
        <NuxtLink to="/meds" class="p-2 hover:bg-surface-container-high rounded-full transition-colors">
          <span class="material-symbols-outlined text-primary text-3xl">arrow_back</span>
        </NuxtLink>
        <h1 class="text-4xl lg:text-5xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">Détails Médicament</h1>
      </div>
    </header>

    <div class="bg-white rounded-[3rem] p-10 lg:p-14 border border-outline-variant/10 shadow-sm relative overflow-hidden">
      <div class="flex flex-col md:flex-row gap-12 items-start">
        <div class="w-24 h-24 rounded-3xl bg-primary-fixed flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-primary text-5xl">pill</span>
        </div>
        <div class="space-y-6 flex-1">
          <div>
            <h2 class="text-3xl font-black font-headline text-on-surface capitalize">{{ med?.name || route.params.id.replace(/-/g, ' ') }}</h2>
            <p class="text-on-surface-variant font-medium opacity-70">Posologie : {{ med?.frequency || '1 comprimé, 2 fois par jour.' }}</p>
          </div>
          
          <div class="flex flex-wrap gap-4">
            <div class="bg-secondary-container/20 px-6 py-3 rounded-full border border-secondary-container/10 flex items-center gap-3">
              <span class="material-symbols-outlined text-secondary text-sm">event</span>
              <span class="text-xs font-black uppercase tracking-widest text-secondary">Prochaine prise : 20:00</span>
            </div>
            <div class="bg-error-container/10 px-6 py-3 rounded-full border border-error-container/10 flex items-center gap-3">
              <span class="material-symbols-outlined text-error text-sm">inventory_2</span>
              <span class="text-xs font-black uppercase tracking-widest text-error">Stock : 12 comprimés</span>
            </div>
          </div>
        </div>
      </div>

      <section class="mt-14 space-y-8">
        <h3 class="text-xl font-bold font-headline">Instructions & Précautions</h3>
        <p class="text-on-surface-variant leading-relaxed font-medium">
          À prendre impérativement pendant le repas avec un grand verre d'eau. Éviter toute exposition prolongée au soleil durant le traitement.
        </p>
        
        <div class="p-8 bg-surface-container-low rounded-3xl border border-outline-variant/5">
          <h4 class="font-black text-xs uppercase tracking-[0.2em] text-on-surface mb-4">Effets Secondaires Possibles</h4>
          <ul class="space-y-3">
            <li class="flex items-center gap-3 text-sm font-medium text-on-surface-variant">
              <div class="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
              Nausées légères
            </li>
            <li class="flex items-center gap-3 text-sm font-medium text-on-surface-variant">
              <div class="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
              Fatigue passagère
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const med = ref(null)

onMounted(async () => {
  if (user.value) {
    const { data } = await supabase
      .from('medications')
      .select('*')
      .ilike('name', route.params.id.replace(/-/g, ' '))
      .order('created_at', { ascending: false })
      .maybeSingle()
    if (data) med.value = data
  }
})
</script>
