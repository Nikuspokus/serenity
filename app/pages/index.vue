<template>
  <div class="space-y-10 lg:space-y-14">
    <!-- Hero Section -->
    <section class="max-w-4xl">
      <div class="flex flex-col gap-4">
        <p class="text-primary font-bold tracking-[0.2em] font-label uppercase text-xs lg:text-sm">VOTRE TABLEAU DE BORD • 20 MARS</p>
        <h1 class="text-4xl lg:text-5xl font-extrabold font-headline text-on-surface leading-tight tracking-tight">
          Bonjour {{ profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || user?.user_metadata?.name?.split(' ')[0] || 'sur Serenity' }},<br />
          <span class="text-primary-container font-semibold opacity-90">Prenez un instant pour respirer.</span>
        </h1>
      </div>
    </section>

    <!-- Main Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
      
      <!-- À prendre maintenant (Priority Card) - Spans full width on mobile, 8 cols on laptop -->
      <div class="md:col-span-2 lg:col-span-8">
        <div v-if="nextMed" class="bg-surface-container-lowest rounded-[2rem] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full shadow-[0_20px_50px_rgba(23,28,31,0.05)] relative overflow-hidden group border border-outline-variant/10">
          <div class="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125"></div>
          
          <div class="flex items-center gap-8 z-10 w-full md:w-auto">
            <div class="w-20 h-20 rounded-3xl bg-secondary-container flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
              <span class="material-symbols-outlined text-on-secondary-container text-4xl">medication</span>
            </div>
            <div class="flex-1">
              <p class="text-on-surface-variant font-label text-[10px] lg:text-xs uppercase tracking-[0.2em] mb-2 font-bold opacity-60">À PRENDRE MAINTENANT</p>
              <h3 class="text-2xl lg:text-3xl font-bold font-headline text-on-surface">{{ nextMed.name }}</h3>
              <p class="text-on-surface-variant text-sm lg:text-base mt-1 font-medium">Dose : {{ nextMed.frequency }}</p>
            </div>
          </div>
          
          <button class="bg-gradient-to-br from-primary via-primary to-primary-container text-white px-10 py-5 rounded-[1.5rem] font-bold shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-1 active:scale-95 transition-all z-10 w-full md:w-auto">
            Confirmer
          </button>
        </div>
        <div v-else class="bg-surface-container-lowest rounded-[2rem] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full shadow-[0_20px_50px_rgba(23,28,31,0.05)] relative overflow-hidden group border border-outline-variant/10">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125"></div>
          <div class="flex items-center gap-8 z-10 w-full md:w-auto">
            <div class="w-16 h-16 rounded-3xl bg-surface-container-high flex items-center justify-center shadow-inner group-hover:-rotate-6 transition-transform">
              <span class="material-symbols-outlined text-on-surface-variant text-3xl">task_alt</span>
            </div>
            <div class="flex-1">
              <p class="text-on-surface-variant font-label text-[10px] lg:text-xs uppercase tracking-[0.2em] mb-2 font-bold opacity-60">TRAITEMENT</p>
              <h3 class="text-xl lg:text-2xl font-bold font-headline text-on-surface">Vous êtes à jour</h3>
              <p class="text-on-surface-variant text-sm lg:text-base mt-1 font-medium">Aucune prise prévue dans l'immédiat.</p>
            </div>
          </div>
          <NuxtLink to="/profile/scan-prescription" class="bg-white text-primary border border-primary/20 hover:border-primary/50 px-8 py-4 rounded-[1.5rem] font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all z-10 w-full md:w-auto text-center flex items-center gap-2 justify-center">
             <span class="material-symbols-outlined text-xl">add</span> Ordonnance
          </NuxtLink>
        </div>
      </div>

      <!-- Mon état (Symptom Summary) - Spans 1 col on mobile, 4 on laptop -->
      <div class="lg:col-span-4 h-full">
        <NuxtLink to="/symptoms" class="bg-surface-container-low rounded-[2rem] p-8 h-full flex flex-col justify-between hover:bg-surface-container-high transition-all cursor-pointer group border border-outline-variant/10">
          <div>
            <div class="flex justify-between items-start mb-10">
              <div class="p-4 bg-primary-fixed rounded-2xl group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span class="material-symbols-outlined text-3xl">stethoscope</span>
              </div>
              <span class="text-[10px] font-bold text-primary bg-primary-fixed/50 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Dernier relevé</span>
            </div>
            <h3 class="text-2xl font-bold font-headline mb-3 text-on-surface">Mon état</h3>
            <p class="text-on-surface-variant leading-relaxed font-medium">Aucun symptôme signalé aujourd'hui. Prenez un instant pour faire le point.</p>
          </div>
          <div class="mt-10 flex items-center text-primary font-bold text-sm tracking-wide">
            Mettre à jour mes symptômes
            <span class="material-symbols-outlined text-base ml-2 group-hover:translate-x-2 transition-transform">arrow_forward_ios</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Activités suggérées (Bento style) -->
      <div class="md:col-span-2 lg:col-span-7">
        <div class="bg-surface-container-lowest rounded-[2rem] p-8 lg:p-10 shadow-[0_15px_45px_rgba(23,28,31,0.04)] h-full border border-outline-variant/5">
          <div class="flex justify-between items-center mb-10">
            <h3 class="text-2xl font-bold font-headline tracking-tight">Pour votre bien-être</h3>
            <div class="p-3 bg-surface-container-high/50 rounded-xl">
              <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="bg-secondary-container/20 rounded-[1.5rem] p-6 flex flex-col gap-6 border border-secondary-container/10 hover:bg-secondary-container/30 transition-colors cursor-pointer group">
              <div class="w-14 h-14 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-secondary text-3xl transition-transform group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">self_improvement</span>
              </div>
              <div>
                <h4 class="font-bold text-on-secondary-container text-lg">Respiration guidée</h4>
                <p class="text-xs text-on-secondary-container/60 mt-2 font-semibold uppercase tracking-wider">5 minutes • Calme</p>
              </div>
            </div>
            <div class="bg-primary-fixed/20 rounded-[1.5rem] p-6 flex flex-col gap-6 border border-primary-fixed/10 hover:bg-primary-fixed/30 transition-colors cursor-pointer group">
              <div class="w-14 h-14 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-primary text-3xl transition-transform group-hover:scale-110" style="font-variation-settings: 'FILL' 1;">play_circle</span>
              </div>
              <div>
                <h4 class="font-bold text-on-primary-fixed text-lg">Yoga doux (APA)</h4>
                <p class="text-xs text-on-primary-fixed/60 mt-2 font-semibold uppercase tracking-wider">12 minutes • Adapté</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mon Cercle (News/Support) -->
      <div class="md:col-span-2 lg:col-span-5">
        <NuxtLink to="/circle" class="bg-surface-container-low rounded-[2rem] p-8 lg:p-10 h-full cursor-pointer hover:bg-surface-container-high transition-all flex flex-col border border-outline-variant/10 group">
          <div class="flex justify-between items-center mb-10">
            <h3 class="text-2xl font-bold font-headline tracking-tight">Mon Cercle</h3>
            <span class="material-symbols-outlined text-primary-container text-xl animate-pulse">favorite</span>
          </div>
          <div class="space-y-4 flex-1 flex flex-col items-center justify-center text-center p-4">
            <span class="material-symbols-outlined text-5xl text-on-surface-variant/20 mb-3 group-hover:scale-110 transition-transform">group_add</span>
            <p class="text-base font-bold text-on-surface-variant">Votre cercle est vide.</p>
            <p class="text-xs text-on-surface-variant/70 mt-1 max-w-[200px]">Invitez un proche pour partager l'aventure ensemble.</p>
          </div>
          <div class="mt-10 flex items-center text-primary font-bold text-sm tracking-wide">
            Voir mon cercle
            <span class="material-symbols-outlined text-base ml-2 group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Immersive Breathe FAB Section -->
    <section class="py-10 flex flex-col items-center">
      <NuxtLink to="/relaxation" class="group relative flex flex-col items-center">
        <div class="w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center">
          <div class="absolute inset-0 bg-secondary-fixed/30 rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div class="absolute inset-4 bg-secondary-fixed-dim/40 rounded-full animate-pulse blur-xl"></div>
          <div class="relative w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full shadow-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <span class="material-symbols-outlined text-secondary text-4xl lg:text-5xl">air</span>
          </div>
        </div>
        <p class="mt-6 text-sm lg:text-base font-bold text-secondary tracking-widest uppercase">Espace Relaxation</p>
        <p class="mt-2 text-xs text-on-surface-variant font-medium">Besoins d'un instant de calme ?</p>
      </NuxtLink>
    </section>

    <!-- Persistent Setup Modal -->
    <ClientOnly>
      <Teleport to="body">
        <div v-if="showSetupModal" class="fixed inset-0 z-[100] bg-surface/95 backdrop-blur-xl overflow-y-auto w-full h-full p-6 md:p-12 lg:p-20">
          <div class="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20">
            <header class="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 class="text-4xl lg:text-5xl font-extrabold font-headline text-primary tracking-tight leading-tight">Bienvenue, {{ profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || 'sur Serenity' }} !</h2>
                <p class="text-on-surface-variant text-lg font-medium mt-4 leading-relaxed">Pour personnaliser votre accompagnement Serenity et sécuriser vos alertes médicales, veuillez remplir ces quelques informations.</p>
              </div>
            </header>
            
            <main class="bg-white rounded-[4rem] p-10 lg:p-14 border border-outline-variant/10 shadow-2xl relative overflow-hidden">
               <div class="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
               
               <ProfileForm 
                 :show-cancel="true"
                 cancel-text="Passer pour l'instant"
                 save-text="Valider mon dossier"
                 @cancel="skipSetup"
                 @saved="handleSetupSaved"
               />
            </main>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import ProfileForm from '~/components/ProfileForm.vue'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const profile = ref(null)
const nextMed = ref(null)
const showSetupModal = ref(false)

const profileCompletion = computed(() => {
  if (!profile.value) return 0
  const fields = ['full_name', 'dob', 'sex', 'weight', 'height', 'blood_type', 'cancer_type', 'doctor_name', 'emergency_contact_1_name']
  let filled = 0
  for (const f of fields) {
    if (profile.value[f] && profile.value[f] !== '') filled++
  }
  if (profile.value.has_allergies === true || profile.value.has_allergies === false) filled++
  return Math.round((filled / (fields.length + 1)) * 100)
})

onMounted(async () => {
  if (user.value) {
    // Fetch profile
    const { data: pData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .maybeSingle()
    if (pData) profile.value = pData

    // Check completion and force setup if incomplete and not skipped in session
    if (profileCompletion.value < 100 && !sessionStorage.getItem('skip_setup_session')) {
      showSetupModal.value = true
      document.body.style.overflow = 'hidden'
    }

    // Fetch next medication
    const { data: mData } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (mData) nextMed.value = mData
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const skipSetup = () => {
  sessionStorage.setItem('skip_setup_session', 'true')
  showSetupModal.value = false
  document.body.style.overflow = ''
}

const handleSetupSaved = () => {
  showSetupModal.value = false
  document.body.style.overflow = ''
  window.location.reload()
}
</script>
