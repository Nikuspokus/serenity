<template>
  <div class="space-y-10 lg:space-y-14 max-w-5xl mx-auto pb-20">
    <!-- Header Section -->
    <header class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-primary text-3xl">stethoscope</span>
        <h1 class="text-4xl lg:text-5xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">Suivi de santé</h1>
      </div>
      <p class="text-on-surface-variant text-lg font-medium opacity-80 max-w-2xl">
        Comment vous sentez-vous aujourd'hui ? Prenez un instant pour noter vos ressentis, cela aide votre équipe médicale à mieux vous accompagner.
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- Left Column: Main Inputs -->
      <div class="lg:col-span-8 space-y-10">
        
        <!-- Échelle de Douleur (EVA) -->
        <section class="bg-white/50 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm transition-all hover:shadow-md">
          <div class="flex items-center justify-between mb-10">
            <h2 class="text-2xl font-bold font-headline">Niveau de douleur</h2>
            <div class="px-4 py-2 bg-primary-fixed rounded-xl text-primary font-bold shadow-sm">
              {{ painValue }}/10
            </div>
          </div>
          <div class="relative pt-12">
            <input 
              v-model="painValue" 
              type="range" min="0" max="10" 
              class="w-full h-4 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary transition-all slider-thumb" 
            />
            <div class="flex justify-between px-2 mt-8">
              <span v-for="n in 11" :key="n" class="text-xs font-bold font-label transition-all duration-300" :class="[
                painValue == n-1 ? 'text-primary scale-150 rotate-0' : 'text-on-surface-variant/40'
              ]">
                {{ n-1 }}
              </span>
            </div>
            <div class="flex justify-between px-1 mt-6">
              <span class="text-[10px] font-bold uppercase tracking-widest text-secondary">Nulle</span>
              <span class="text-[10px] font-bold uppercase tracking-widest text-tertiary">Maximale</span>
            </div>
          </div>
        </section>

        <!-- Fatigue / Énergie -->
        <section class="bg-white/50 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm group">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold font-headline">État de fatigue</h2>
            <span class="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">bolt</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              v-for="s in ['Pleine forme', 'Légère', 'Modérée', 'Intense']" 
              :key="s"
              @click="fatigue = s"
              class="px-6 py-5 rounded-2xl border-2 font-bold transition-all text-sm tracking-wide"
              :class="[
                fatigue === s ? 'bg-primary text-on-primary border-primary shadow-lg scale-105' : 'bg-surface-container-lowest border-transparent hover:border-primary/20'
              ]"
            >
              {{ s }}
            </button>
          </div>
        </section>

        <!-- Symptômes Qualitatifs -->
        <section class="bg-white/50 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
          <h2 class="text-2xl font-bold font-headline mb-8">Autres symptômes</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <button 
              v-for="symp in symptomsList" 
              :key="symp.id"
              @click="toggleSymptom(symp.id)"
              class="flex flex-col items-center gap-4 p-6 rounded-3xl border-2 transition-all group"
              :class="[
                selectedSymptoms.includes(symp.id) ? 'bg-secondary-container text-on-secondary-container border-secondary-container shadow-md' : 'bg-surface-container-lowest border-transparent hover:bg-surface-container-high'
              ]"
            >
              <span class="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">{{ symp.icon }}</span>
              <span class="text-xs font-bold font-label uppercase text-center leading-tight tracking-tighter">{{ symp.name }}</span>
            </button>
          </div>
        </section>

        <!-- Notes Section -->
        <section class="bg-white/50 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
          <h2 class="text-2xl font-bold font-headline mb-6">Notes & Observations</h2>
          <textarea 
            v-model="notes"
            placeholder="Décrivez comment vous vous sentez, l'évolution de vos symptômes ou toute autre remarque importante..."
            class="w-full h-40 bg-surface-container-lowest rounded-2xl border-none focus:ring-4 focus:ring-primary/10 p-6 text-on-surface font-body resize-none shadow-inner"
          ></textarea>
        </section>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 items-center justify-end pt-5">
          <button class="w-full sm:w-auto px-10 py-5 rounded-3xl font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors tracking-widest text-sm" @click="$router.push('/')">
            ANNULER
          </button>
          <button class="w-full sm:w-auto px-12 py-5 bg-primary text-on-primary rounded-3xl font-extrabold text-lg shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all tracking-tight uppercase flex items-center justify-center gap-3" @click="save" :disabled="saving">
            <span v-if="saving" class="material-symbols-outlined animate-spin text-xl">progress_activity</span>
            Enregistrer
          </button>
        </div>
      </div>
      
      <!-- Right Column: History -->
      <div class="lg:col-span-4">
        <section class="bg-white/50 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm transition-all h-full sticky top-10">
          <h2 class="text-2xl font-bold font-headline mb-8">Ouvrages précédents</h2>
          
          <div v-if="loadingHistory" class="flex justify-center p-8">
             <span class="material-symbols-outlined animate-spin text-primary">progress_activity</span>
          </div>
          
          <div v-else-if="history.length === 0" class="flex flex-col items-center justify-center p-12 text-center opacity-60">
             <span class="material-symbols-outlined text-5xl mb-4">analytics</span>
             <p class="font-bold text-sm">Aucun historique.</p>
             <p class="text-xs mt-2 font-medium">Votre premier compte rendu apparaîtra ici après enregistrement.</p>
          </div>
          
          <div v-else class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div v-for="log in history" :key="log.id" class="flex flex-col gap-3 p-5 rounded-3xl bg-surface-container-lowest hover:bg-surface-container-low transition-all border border-transparent hover:border-primary/10 group">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <span class="material-symbols-outlined text-xl">{{ log.pain_level > 6 ? 'warning' : 'monitor_heart' }}</span>
                </div>
                <div>
                  <span class="font-bold text-on-surface block text-sm capitalize">{{ new Date(log.created_at).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }}</span>
                  <span class="text-xs text-on-surface-variant font-medium">Douleur: {{ log.pain_level }}/10 • Fatigue: {{ log.fatigue_level }}</span>
                </div>
              </div>
              <div v-if="log.symptoms && log.symptoms.length > 0" class="flex flex-wrap gap-2 mt-2">
                <span v-for="sympId in log.symptoms" :key="sympId" class="text-[9px] font-bold uppercase tracking-wider bg-primary-fixed/50 text-primary px-2 py-1 rounded-md">
                   {{ getSymptomName(sympId) }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const painValue = ref(2)
const fatigue = ref('Modérée')
const notes = ref('')
const selectedSymptoms = ref([])
const history = ref([])
const loadingHistory = ref(true)
const saving = ref(false)

const symptomsList = [
  { id: 'nausea', name: 'Nausées', icon: 'sick' },
  { id: 'headache', name: 'Maux de tête', icon: 'psychology' },
  { id: 'appetite', name: 'Manque d’appétit', icon: 'no_food' },
  { id: 'sleep', name: 'Sommeil perturbé', icon: 'bedtime' },
  { id: 'breath', name: 'Essoufflement', icon: 'air' },
  { id: 'digestion', name: 'Digestion', icon: 'cardiology' },
  { id: 'skin', name: 'Irritations', icon: 'dermatology' },
  { id: 'mood', name: 'Moral bas', icon: 'mood_bad' }
]

function getSymptomName(id) {
  const symptom = symptomsList.find(s => s.id === id)
  return symptom ? symptom.name : id
}

onMounted(async () => {
  if (user.value) {
    const { data } = await supabase
      .from('symptom_logs')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (data) history.value = data
  }
  loadingHistory.value = false
})

function toggleSymptom(id) {
  if (selectedSymptoms.value.includes(id)) {
    selectedSymptoms.value = selectedSymptoms.value.filter(s => s !== id)
  } else {
    selectedSymptoms.value.push(id)
  }
}

async function save() {
  if (!user.value) return
  saving.value = true
  
  const { error } = await supabase.from('symptom_logs').insert({
    user_id: user.value.id,
    pain_level: Number(painValue.value),
    fatigue_level: fatigue.value,
    symptoms: selectedSymptoms.value,
    notes: notes.value ? notes.value : null
  })
  
  saving.value = false
  
  if (error) {
    alert("Erreur base de données (Il faut exécuter le script SQL de création) : " + error.message)
    return
  }
  
  alert("Vos symptômes ont bien été enregistrés. Merci !")
  router.push('/')
}
</script>

<style scoped>
.slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 32px;
  height: 32px;
  background: white;
  border: 4px solid #005da9;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 93, 169, 0.3);
  transition: all 0.2s;
}
.slider-thumb:active::-webkit-slider-thumb {
  transform: scale(1.2);
  box-shadow: 0 6px 15px rgba(0, 93, 169, 0.4);
}
</style>
