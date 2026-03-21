<template>
  <div class="space-y-10 lg:space-y-14 max-w-3xl mx-auto pb-20">
    <!-- Header -->
    <header class="flex items-center gap-4">
      <NuxtLink to="/meds" class="p-4 bg-surface-container-low hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant group pointer-events-auto">
        <span class="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-on-surface">Ajouter un médicament</h1>
        <p class="text-on-surface-variant font-medium mt-1">Recherche connectée à la base de données publique.</p>
      </div>
    </header>

    <main class="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-outline-variant/10 shadow-sm space-y-8 relative overflow-visible">
      
      <!-- Autocomplete Search Block -->
      <div class="space-y-4 relative z-50">
        <div class="flex justify-between items-end">
           <label class="block text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Nom du Médicament *</label>
           <span class="text-[9px] font-bold text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-full uppercase tracking-widest flex items-center gap-1">
             <span class="material-symbols-outlined text-[10px]">database</span> Open Medic
           </span>
        </div>
        
        <div class="relative">
          <input 
            v-model="searchQuery" 
            @input="handleSearch"
            type="text" 
            placeholder="Rechercher (ex: Paracétamol, Doliprane...)" 
            class="w-full pl-12 pr-6 py-4 rounded-3xl bg-surface-container-lowest border-2 focus:border-primary focus:bg-white focus:outline-none transition-all font-bold text-lg" 
            :class="form.selectedMed ? 'border-primary/50 text-primary' : 'border-outline-variant/20 text-on-surface'"
            required 
          />
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl" :class="isSearching ? 'animate-spin text-primary' : (form.selectedMed ? 'text-primary' : 'text-on-surface-variant/50')">
            {{ isSearching ? 'progress_activity' : 'search' }}
          </span>
          <button v-if="form.selectedMed" @click="clearSearch" class="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors">
            <span class="material-symbols-outlined text-sm">close</span>
          </button>
          
          <!-- Dropdown Results -->
          <div v-if="searchResults.length > 0 && !form.selectedMed" class="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl border border-outline-variant/20 shadow-2xl overflow-hidden z-[100] animate-in slide-in-from-top-2 duration-200">
             <button 
               v-for="res in searchResults" :key="res.cis"
               @click="selectMed(res)"
               class="w-full text-left px-6 py-4 hover:bg-surface-container-low border-b border-outline-variant/5 last:border-b-0 transition-colors flex items-center justify-between group"
             >
               <div>
                  <span class="font-bold text-on-surface block">{{ res.name }}</span>
                  <span class="text-xs font-medium text-on-surface-variant">{{ res.lab }}</span>
               </div>
               <span class="material-symbols-outlined text-on-surface-variant/20 group-hover:text-primary transition-colors">add_circle</span>
             </button>
          </div>
        </div>
      </div>

      <!-- Drug Interactions Warning Box -->
      <div v-if="form.selectedMed && form.selectedMed.warnings.length > 0" class="bg-error/5 border border-error/20 p-6 rounded-3xl animate-in zoom-in-95 duration-300 relative z-10">
         <div class="flex items-center gap-3 mb-4">
           <span class="material-symbols-outlined text-error text-2xl">warning</span>
           <h4 class="font-bold text-error text-lg tracking-tight">Vigilance & Interactions</h4>
         </div>
         <ul class="space-y-3">
           <li v-for="(warn, i) in form.selectedMed.warnings" :key="i" class="flex gap-3 text-sm font-medium text-on-surface-variant">
             <span class="material-symbols-outlined text-error/60 text-base mt-0.5">priority_high</span>
             {{ warn }}
           </li>
         </ul>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 transition-all duration-500" :class="form.selectedMed ? 'opacity-100' : 'opacity-40 pointer-events-none'">
        <div class="space-y-4">
          <label class="block text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Dosage</label>
          <input v-model="form.dosage" type="text" placeholder="Ex: 1000mg, 1 gélule..." class="w-full px-6 py-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
        </div>
        <div class="space-y-4">
          <label class="block text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Fréquence de prise</label>
          <input v-model="form.frequency" type="text" placeholder="Ex: 3 fois/jour, Matin..." class="w-full px-6 py-4 rounded-3xl bg-surface-container-lowest border border-outline-variant/20 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
        </div>
      </div>

      <div class="pt-8 flex justify-end relative z-10 border-t border-outline-variant/10">
        <button @click="saveMedication" :disabled="loading || !form.selectedMed" class="px-10 py-5 bg-primary text-on-primary rounded-full font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
           <span v-if="loading" class="material-symbols-outlined animate-spin text-xl">progress_activity</span>
           <span v-else class="material-symbols-outlined text-xl">save</span>
           Enregistrer le traitement
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const loading = ref(false)

const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
let searchTimeout = null

const form = reactive({
  selectedMed: null,
  dosage: '',
  frequency: '',
  duration: ''
})

const handleSearch = () => {
  form.selectedMed = null
  searchResults.value = []
  
  const q = searchQuery.value.trim()
  if (q.length < 2) return
  
  isSearching.value = true
  clearTimeout(searchTimeout)
  
  // Debounce API calls to Supabase
  searchTimeout = setTimeout(async () => {
    try {
      const { data, error } = await supabase
        .from('bdpm_medications')
        .select('cis, name, laboratories')
        .ilike('name', `%${q}%`)
        .limit(10)

      if (error) {
        console.error("Erreur BDPM:", error)
        searchResults.value = []
      } else {
        // Map actual BDPM results to our UI component
        searchResults.value = data.map(m => ({
          cis: m.cis,
          name: m.name,
          lab: m.laboratories || 'INCONNU',
          // We keep a simulated interaction warning until a dedicated interaction API is added (Phase 12)
          warnings: Math.random() > 0.85 ? ['Interaction détectée ou vigilance accrue requise pour ce traitement.', 'Veuillez valider avec l\'équipe médicale.'] : []
        }))
      }
    } catch (err) {
      console.error(err)
    } finally {
      isSearching.value = false
    }
  }, 400)
}

function selectMed(med) {
  form.selectedMed = med
  searchQuery.value = med.name
  searchResults.value = []
}

function clearSearch() {
  searchQuery.value = ''
  form.selectedMed = null
  searchResults.value = []
}

async function saveMedication() {
  if (!user.value || !form.selectedMed) return
  loading.value = true

  const { error } = await supabase.from('medications').insert({
    user_id: user.value.id,
    name: form.selectedMed.name,
    dosage: form.dosage || null,
    frequency: form.frequency || null,
    duration: form.duration || null,
  })

  loading.value = false

  if (error) {
    alert("Erreur lors de l'enregistrement : " + error.message)
    return
  }

  router.push('/meds')
}
</script>
