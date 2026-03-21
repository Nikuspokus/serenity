<template>
  <div class="space-y-10 pb-20 max-w-4xl mx-auto">
    <!-- Header -->
    <header class="flex flex-col gap-6">
      <div class="flex items-center gap-4">
        <NuxtLink to="/profile" class="p-2 hover:bg-surface-container-high rounded-full transition-colors">
          <span class="material-symbols-outlined text-primary text-3xl">arrow_back</span>
        </NuxtLink>
        <h1 class="text-4xl lg:text-5xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">Numériser Ordonnance</h1>
      </div>
    </header>

    <div class="bg-white rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-sm">
      <!-- Simulated Camera View -->
      <div v-if="step === 'scan'" class="relative aspect-[4/3] bg-black flex items-center justify-center group overflow-hidden">
        <div class="absolute inset-0 opacity-40">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtSsf6OajInF5tWflNzbghRMexFwi5ANN2tYkKWW1ubIi2JC13wZhARDdj47Aq4cIJxn86UZ_81yTJEfSeNLQZyTXOiuwhJZLXAl3an3M2-6iaIFoGQ86gQgqowLlt2LshdxEnTlFBzV5jhq9DE14rFoeTg0QOER18Hni8Yhi_nVPUbPiOV_9YdLMGYiFNFo-PYS0-IaceAjU5FtAMdEPcFPsDVw858T1jPxGca9Db1uZUA8QkltQRGc-bBS_ddbYUfx0s9Y5z9ag" class="w-full h-full object-cover grayscale" />
        </div>
        
        <!-- Scanning Box Interface -->
        <div class="relative w-64 h-80 border-2 border-white/50 rounded-lg flex items-center justify-center">
          <div class="absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_15px_rgba(0,93,169,0.8)] animate-scan"></div>
          <div class="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary"></div>
          <div class="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary"></div>
          <div class="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary"></div>
          <div class="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary"></div>
        </div>

        <!-- Overlay Text -->
        <div class="absolute bottom-8 inset-x-0 text-center px-10">
          <p class="text-white text-sm font-bold bg-black/40 backdrop-blur-md py-3 px-6 rounded-full inline-block border border-white/10 uppercase tracking-widest">Positionnez l'ordonnance dans le cadre</p>
        </div>

        <!-- Shutter Button -->
        <button @click="simulateScan" class="absolute bottom-24 w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 group active:scale-95 transition-all">
          <div class="w-full h-full bg-white rounded-full transition-all group-hover:scale-90"></div>
        </button>
      </div>

      <!-- Result / Verification View -->
      <div v-if="step === 'verify'" class="p-10 lg:p-14 space-y-12 animate-in-up">
        <section class="space-y-8">
          <div class="flex items-center gap-4 mb-4">
             <div class="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
               <span class="material-symbols-outlined">auto_awesome</span>
             </div>
             <h2 class="text-2xl font-bold font-headline">Informations extraites</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <label class="block text-sm font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Médicament</label>
              <input v-model="form.name" type="text" class="w-full px-8 py-5 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
            </div>
            <div class="space-y-4">
              <label class="block text-sm font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Fréquence (par jour)</label>
              <input v-model="form.frequency" type="text" class="w-full px-8 py-5 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
            </div>
            <div class="space-y-4">
              <label class="block text-sm font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Date de début</label>
              <input v-model="form.startDate" type="date" class="w-full px-8 py-5 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
            </div>
            <div class="space-y-4">
              <label class="block text-sm font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Date de fin</label>
              <input v-model="form.endDate" type="date" class="w-full px-8 py-5 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
            </div>
          </div>
        </section>

        <!-- Safety Photos -->
        <section class="space-y-8 pt-8 border-t border-outline-variant/10">
          <h2 class="text-2xl font-bold font-headline">Photos de sécurité</h2>
          <p class="text-on-surface-variant text-sm font-medium">Pour éviter toute erreur, prenez une photo de la boîte et du comprimé.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-surface-container-low rounded-[2rem] p-8 border border-dashed border-outline-variant/50 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-surface-container-high transition-all">
              <div v-if="!form.photoBox" class="flex flex-col items-center gap-2">
                <span class="material-symbols-outlined text-4xl text-primary opacity-60 group-hover:scale-110 transition-transform">inventory_2</span>
                <span class="text-xs font-black uppercase tracking-widest text-on-surface-variant">Photo de la boîte</span>
              </div>
              <img v-else :src="form.photoBox" class="w-full h-32 object-contain rounded-xl" />
            </div>
            <div class="bg-surface-container-low rounded-[2rem] p-8 border border-dashed border-outline-variant/50 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-surface-container-high transition-all">
              <div v-if="!form.photoPill" class="flex flex-col items-center gap-2">
                <span class="material-symbols-outlined text-4xl text-primary opacity-60 group-hover:scale-110 transition-transform">pill</span>
                <span class="text-xs font-black uppercase tracking-widest text-on-surface-variant">Photo du comprimé</span>
              </div>
              <img v-else :src="form.photoPill" class="w-full h-32 object-contain rounded-xl" />
            </div>
          </div>
        </section>

        <!-- Strict Double Validation -->
        <section class="bg-error/5 border-l-4 border-error p-6 rounded-2xl flex items-start gap-4 shadow-sm animate-in-up" style="animation-delay: 0.1s;">
          <input type="checkbox" id="double-validation" v-model="form.confirmed" class="mt-1 w-6 h-6 rounded text-error focus:ring-error shadow-sm cursor-pointer" />
          <div>
            <label for="double-validation" class="font-black text-error md:text-lg block cursor-pointer">Avertissement de sécurité</label>
            <p class="text-error/90 text-sm font-semibold mt-1 leading-relaxed">Conformément aux protocoles stricts de Serenity, <b>je confirme devoir prendre ce médicament</b> ({{ form.name || '...' }}) aux dosages et fréquences indiqués, et avoir vérifié avec ma prescription originale.</p>
          </div>
        </section>

        <!-- Actions -->
        <div class="pt-8 flex flex-col md:flex-row gap-4 justify-end">
          <button @click="step = 'scan'" class="px-12 py-5 rounded-full font-black text-on-surface-variant hover:bg-surface-container transition-all text-sm uppercase tracking-widest text-center border-2 border-transparent">
            Refaire le scan
          </button>
          <button @click="save" :disabled="!form.confirmed" class="px-14 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-lg transition-all text-center border-2" :class="form.confirmed ? 'bg-error text-on-error border-error shadow-error/20 hover:shadow-xl hover:-translate-y-0.5' : 'bg-surface-container-high text-on-surface-variant/50 border-outline-variant/20 cursor-not-allowed'">
            Ajouter au pilulier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const step = ref('scan')

const form = reactive({
  name: '',
  frequency: '',
  startDate: '',
  endDate: '',
  photoBox: null,
  photoPill: null,
  confirmed: false
})

const simulateScan = () => {
  // Simulating the OCR result
  setTimeout(() => {
    form.name = 'Levothyrox 75µg'
    form.frequency = '1 fois par jour (Matin)'
    form.startDate = new Date().toISOString().split('T')[0]
    form.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    step.value = 'verify'
  }, 1000)
}

const save = async () => {
  if (user.value) {
    try {
      const { error } = await supabase
        .from('medications')
        .insert({
          user_id: user.value.id,
          name: form.name,
          frequency: form.frequency,
          start_date: form.startDate,
          end_date: form.endDate,
          // note: photo uploads would go to storage first, then we'd save URLs here
          photo_box_url: form.photoBox,
          photo_pill_url: form.photoPill
        })
      if (error) throw error
      
      // Navigate to the detail page (dynamic route)
      router.push(`/meds/${form.name.toLowerCase().replace(/\s+/g, '-')}`)
    } catch (e) {
      alert("Erreur lors de l'enregistrement : " + e.message)
    }
  } else {
    // Fallback for local testing
    localStorage.setItem('last_prescription', JSON.stringify(form))
    router.push('/meds/levothyrox-75µg')
  }
}
</script>

<style scoped>
.animate-scan {
  animation: scan-move 3s ease-in-out infinite;
}

@keyframes scan-move {
  0% { top: 0; }
  50% { top: 100%; }
  100% { top: 0; }
}

.animate-in-up {
  animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
