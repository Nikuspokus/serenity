<template>
  <div class="space-y-10 lg:space-y-14 pb-20">
    <!-- Hero Section -->
    <header class="flex flex-col gap-4 max-w-4xl">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-secondary-container rounded-2xl">
          <span class="material-symbols-outlined text-on-secondary-container text-4xl">medication</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">Mes Médicaments</h1>
      </div>
      <p class="text-on-surface-variant text-lg font-medium opacity-80">
        Suivez vos prises quotidiennes et gérez vos traitements pour ne jamais manquer l'essentiel.
      </p>
    </header>

    <div v-if="loading" class="flex justify-center p-20">
      <span class="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="medications.length === 0" class="bg-surface-container-low rounded-[2.5rem] p-10 lg:p-14 text-center flex flex-col items-center border border-outline-variant/10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
        <span class="material-symbols-outlined text-5xl text-on-surface-variant opacity-50">inventory_2</span>
      </div>
      <h2 class="text-2xl lg:text-3xl font-bold font-headline mb-3 text-on-surface">Aucun médicament enregistré</h2>
      <p class="text-on-surface-variant text-lg font-medium max-w-md">Vous n'avez pas encore de traitements prescrits sur l'application. Ajoutez votre première ordonnance pour commencer le suivi.</p>
      
      <div class="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-lg justify-center">
        <NuxtLink to="/profile/scan-prescription" class="flex-1 px-6 py-4 bg-primary text-on-primary rounded-full font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm">
          <span class="material-symbols-outlined text-xl">document_scanner</span> Scan
        </NuxtLink>
        <NuxtLink to="/meds/new" class="flex-1 px-6 py-4 bg-surface-container-high text-on-surface-variant rounded-full font-black uppercase tracking-wider hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2 text-sm">
          <span class="material-symbols-outlined text-xl">edit</span> Saisie manuelle
        </NuxtLink>
      </div>
    </div>

    <!-- Filled State -->
    <template v-else>
      <section class="pt-8 animate-in fade-in duration-500">
        <div class="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-outline-variant/10 shadow-sm">
          <div class="flex justify-between items-center mb-10">
            <h2 class="text-2xl font-bold font-headline">Ma Pharmacie</h2>
          </div>
          
          <div class="space-y-6">
            <div v-for="med in medications" :key="med.id" class="group flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl bg-surface-container-low hover:bg-surface-container-high transition-all border border-transparent hover:border-primary/10">
              <div class="flex items-center gap-6 w-full sm:w-auto mb-4 sm:mb-0">
                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:-rotate-3 transition-transform">
                  <span class="material-symbols-outlined text-3xl">medication</span>
                </div>
                <div>
                  <h4 class="font-bold text-lg font-headline text-on-surface">{{ med.name }}</h4>
                  <p class="text-sm text-on-surface-variant font-medium opacity-70">{{ med.frequency }} <span v-if="med.dosage">• {{ med.dosage }}</span></p>
                </div>
              </div>
              
              <div class="flex items-center gap-10 w-full sm:w-auto justify-end">
                <div class="flex gap-2">
                  <button @click.prevent class="p-4 rounded-2xl bg-white text-on-surface-variant hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md" title="Marquer comme pris">
                    <span class="material-symbols-outlined text-xl">check_circle</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <NuxtLink to="/profile/scan-prescription" class="fixed bottom-28 right-8 lg:bottom-12 lg:right-12 w-20 h-20 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group">
      <span class="material-symbols-outlined text-4xl group-hover:rotate-90 transition-transform">add</span>
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const medications = ref([])
const loading = ref(true)

onMounted(async () => {
  if (user.value) {
    const { data } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
      
    if (data) {
      medications.value = data
    }
  }
  loading.value = false
})
</script>
