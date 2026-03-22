<template>
  <!-- Fullscreen wrapper -->
  <div class="bg-black min-h-[100dvh] flex flex-col font-body selection:bg-primary-fixed relative overflow-x-hidden">
    
    <!-- ==================== -->
    <!-- STEP 1 : SCAN CAMERA -->
    <!-- ==================== -->
    <div v-if="step === 'scan'" class="flex-1 flex flex-col relative">
      <!-- Video Element -->
      <video ref="videoElement" class="absolute inset-0 w-full h-full object-cover" autoplay playsinline muted></video>
      
      <!-- Camera Overlay UI -->
      <div class="absolute inset-0 z-10 flex flex-col">
        <!-- Top HUD -->
        <div class="flex-none bg-gradient-to-b from-black/80 to-transparent pt-8 pb-12 px-6 flex justify-between items-start">
           <NuxtLink to="/profile" class="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform">
             <span class="material-symbols-outlined text-2xl">close</span>
           </NuxtLink>
           <button @click="toggleFlash" class="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform">
             <span class="material-symbols-outlined text-2xl" :class="flashOn ? 'text-primary' : 'text-white'">flash_on</span>
           </button>
        </div>
        
        <!-- Center Targeting Box with darkened edges -->
        <div class="flex-1 flex px-8 sm:px-16 pb-8">
           <!-- The shadow box simulates the darkened area around the transparent scanner window -->
           <div class="flex-1 relative rounded-[2rem] border-2 border-white/30 shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] overflow-hidden">
             <!-- Animated scanning laser -->
             <div class="absolute inset-x-0 h-1 bg-primary/80 shadow-[0_0_20px_rgba(0,93,169,1)] animate-scan"></div>
             <!-- Corner Accents -->
             <div class="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-[2rem]"></div>
             <div class="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-[2rem]"></div>
             <div class="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-[2rem]"></div>
             <div class="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-[2rem]"></div>
           </div>
        </div>
        
        <!-- Bottom Controls -->
        <div class="flex-none bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-14 flex flex-col items-center justify-center gap-8">
          <p class="text-white/90 text-xs sm:text-sm font-black uppercase tracking-widest text-center px-10 animate-pulse">
            Positionnez l'ordonnance dans le cadre
          </p>
          <button @click="takePhoto" class="w-20 h-20 rounded-full border-[5px] border-white flex items-center justify-center p-1 group active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
             <div class="w-full h-full bg-white rounded-full transition-all group-active:scale-90 opacity-90"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== -->
    <!-- STEP 2 : VERIFICATION-->
    <!-- ==================== -->
    <div v-else class="min-h-[100dvh] bg-surface-container-lowest text-on-surface flex flex-col relative">
      <!-- Header -->
      <header class="bg-white/80 backdrop-blur-xl border-b border-outline-variant/10 sticky top-0 z-30 pt-4 pb-4 px-6 md:px-10">
        <div class="flex items-center gap-4 max-w-4xl mx-auto">
          <button @click="retakeScan" class="p-2 hover:bg-surface-container rounded-full transition-colors -ml-2">
            <span class="material-symbols-outlined text-on-surface-variant text-3xl">arrow_back</span>
          </button>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-headline tracking-tight text-primary">Vérification</h1>
        </div>
      </header>

      <main class="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full space-y-10 sm:space-y-14 animate-in-up pb-32">
        <section class="space-y-6 sm:space-y-8">
          <div class="flex items-center gap-4">
             <div class="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary shadow-[0_4px_20px_rgba(0,93,169,0.15)]">
               <span class="material-symbols-outlined text-2xl">auto_awesome</span>
             </div>
             <div>
               <h2 class="text-xl sm:text-2xl font-bold font-headline">Intelligence Artificielle</h2>
               <p class="text-[11px] sm:text-xs font-black tracking-widest uppercase text-on-surface-variant/60">Données extraites</p>
             </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div class="space-y-2 sm:space-y-3">
              <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Médicament ciblé</label>
              <input v-model="form.name" type="text" class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold text-sm sm:text-base shadow-sm" />
            </div>
            <div class="space-y-2 sm:space-y-3">
              <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Fréquence (Posologie)</label>
              <input v-model="form.frequency" type="text" class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold text-sm sm:text-base shadow-sm" />
            </div>
            <div class="space-y-2 sm:space-y-3">
              <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Début du traitement</label>
              <div class="relative">
                <input v-model="form.startDate" type="date" class="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-bold text-sm sm:text-base date-input-sexy shadow-sm" />
                <span class="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-primary/70 pointer-events-none text-lg">calendar_month</span>
              </div>
            </div>
            <div class="space-y-2 sm:space-y-3">
              <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Fin du traitement</label>
              <div class="relative">
                <input v-model="form.endDate" type="date" class="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-bold text-sm sm:text-base date-input-sexy shadow-sm" />
                <span class="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-primary/70 pointer-events-none text-lg">calendar_month</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Safety Photos -->
        <section class="space-y-6 pt-8 border-t border-outline-variant/10 relative">
          <div class="flex items-center gap-3 mb-2">
            <span class="material-symbols-outlined text-secondary">verified_user</span>
            <h2 class="text-xl sm:text-2xl font-bold font-headline text-secondary">Sécurité Absolue</h2>
          </div>
          <p class="text-on-surface-variant text-xs sm:text-sm font-medium opacity-90 leading-relaxed border-l-2 border-secondary/30 pl-4">
            Prenez en photo la boîte d'origine et l'aspect visuel du comprimé. Ces images vous permettront de vérifier vos prises quotidiennes sans risque d'erreur.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div class="bg-surface-container-lowest rounded-[2rem] p-6 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-3 group cursor-pointer hover:bg-surface-container-low hover:border-secondary/50 transition-all min-h-[140px]">
              <div v-if="!form.photoBox" class="flex flex-col items-center gap-3">
                <span class="material-symbols-outlined text-3xl sm:text-4xl text-secondary opacity-40 group-hover:scale-110 group-hover:opacity-80 transition-all">inventory_2</span>
                <span class="text-[10px] sm:text-xs font-black uppercase tracking-widest text-on-surface-variant/80">Boîte d'origine</span>
              </div>
              <img v-else :src="form.photoBox" class="w-full h-24 object-contain rounded-xl shadow-sm" />
            </div>
            <div class="bg-surface-container-lowest rounded-[2rem] p-6 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-3 group cursor-pointer hover:bg-surface-container-low hover:border-secondary/50 transition-all min-h-[140px]">
              <div v-if="!form.photoPill" class="flex flex-col items-center gap-3">
                <span class="material-symbols-outlined text-3xl sm:text-4xl text-secondary opacity-40 group-hover:scale-110 group-hover:opacity-80 transition-all">pill</span>
                <span class="text-[10px] sm:text-xs font-black uppercase tracking-widest text-on-surface-variant/80">Comprimé / Gélule</span>
              </div>
              <img v-else :src="form.photoPill" class="w-full h-24 object-contain rounded-xl shadow-sm" />
            </div>
          </div>
        </section>

        <!-- Strict Double Validation -->
        <section class="bg-error/5 border border-error/20 p-5 sm:p-8 rounded-[2rem] flex items-start gap-4 shadow-sm animate-in-up" style="animation-delay: 0.2s;">
          <input type="checkbox" id="double-validation" v-model="form.confirmed" class="mt-1 w-6 h-6 rounded border-error text-error focus:ring-error focus:ring-offset-0 bg-white cursor-pointer" />
          <div class="space-y-1 sm:space-y-2">
            <label for="double-validation" class="font-black text-error text-sm sm:text-base block cursor-pointer uppercase tracking-widest">Responsabilité Médicale</label>
            <p class="text-error/90 text-xs sm:text-sm font-semibold leading-relaxed">
              En cochant cette case, je confirme sous ma responsabilité devoir prendre le <b>{{ form.name || 'traitement' }}</b> aux dosages indiqués, et avoir rigoureusement vérifié ces informations avec la prescription originale de mon spécialiste.
            </p>
          </div>
        </section>

      </main>
      
      <!-- Footer Action -->
      <div class="fixed bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-background via-background to-transparent z-40 flex justify-end max-w-4xl mx-auto w-full">
        <button @click="save" :disabled="!form.confirmed" 
                class="w-full md:w-auto px-10 sm:px-14 py-5 sm:py-6 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 border-2" 
                :class="form.confirmed ? 'bg-error text-on-error border-error shadow-[0_10px_30px_rgba(179,38,30,0.3)] hover:-translate-y-1' : 'bg-surface-container-high text-on-surface-variant/50 border-outline-variant/10 cursor-not-allowed'">
          <span class="material-symbols-outlined text-xl">medication</span>
          Ajouter au pilulier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

// UI State
const step = ref('scan')
const flashOn = ref(false)

// Logic State
const videoElement = ref(null)
let stream = null

const form = reactive({
  name: '',
  frequency: '',
  startDate: '',
  endDate: '',
  photoBox: null,
  photoPill: null,
  confirmed: false
})

onMounted(() => {
  if (step.value === 'scan') {
    startCamera()
  }
})

onBeforeUnmount(() => {
  stopCamera()
})

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { 
        facingMode: 'environment', // Request back camera
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    })
    if (videoElement.value) {
      videoElement.value.srcObject = stream
    }
  } catch (err) {
    console.error("Erreur d'accès à la caméra:", err)
    alert("Impossible d'accéder à la caméra de votre téléphone. Vérifiez que vous avez autorisé Serenity à utiliser l'appareil photo dans les réglages de votre navigateur.")
  }
}

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
}

const toggleFlash = async () => {
  if (!stream) return
  const track = stream.getVideoTracks()[0]
  const capabilities = track.getCapabilities()
  if (capabilities.torch) {
    try {
      flashOn.value = !flashOn.value
      await track.applyConstraints({
        advanced: [{ torch: flashOn.value }]
      })
    } catch (e) {
      console.error(e)
    }
  } else {
    alert("Désolé, votre navigateur ou appareil ne permet pas d'activer le flash.")
  }
}

const takePhoto = () => {
  // Optionnel : on pourrait capturer une vraie frame de la vidéo ici pour l'envoyer à l'OCR
  stopCamera()
  
  // Simulation temps d'analyse OCR
  setTimeout(() => {
    form.name = 'Levothyrox 75µg'
    form.frequency = '1 fois/j (Matin)'
    form.startDate = new Date().toISOString().split('T')[0]
    form.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    form.confirmed = false // reset for safety
    step.value = 'verify'
  }, 1000)
}

const retakeScan = () => {
  step.value = 'scan'
  // Ne pas oublier d'attendre que la video soit render dans le DOM avant de re-start la cam
  setTimeout(() => {
    startCamera()
  }, 100)
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
          photo_box_url: form.photoBox,
          photo_pill_url: form.photoPill
        })
      if (error) throw error
      
      router.push(`/meds/${form.name.toLowerCase().replace(/\s+/g, '-')}`)
    } catch (e) {
      alert("Erreur lors de l'enregistrement : " + e.message)
    }
  } else {
    localStorage.setItem('last_prescription', JSON.stringify(form))
    router.push('/meds/levothyrox-75µg')
  }
}

definePageMeta({
  layout: false // Force the component to take over the whole screen
})
</script>

<style scoped>
.animate-scan {
  animation: scan-move 3s ease-in-out infinite;
}

@keyframes scan-move {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.animate-in-up {
  animation: fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Hide date picker calendar icon to use ours */
.date-input-sexy::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: auto; height: auto;
  color: transparent; background: transparent;
  cursor: pointer; opacity: 0;
}
</style>
