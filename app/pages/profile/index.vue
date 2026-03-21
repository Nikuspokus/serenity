<template>
  <div class="space-y-10 lg:space-y-14 pb-20">
    <!-- Header Aligned with "Header Harmonisé" -->
    <header class="flex flex-col gap-4 max-w-4xl">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-secondary-container rounded-2xl">
          <span class="material-symbols-outlined text-on-secondary-container text-4xl">person</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">Mon Profil</h1>
      </div>
      <p class="text-on-surface-variant text-lg font-medium opacity-80">
        Gérez votre identité et personnalisez votre expérience Serenity.
      </p>
    </header>

    <!-- Profile Info Card -->
    <div class="bg-white rounded-[3rem] p-10 lg:p-14 border border-outline-variant/10 shadow-sm relative overflow-hidden">
      <div class="flex flex-col md:flex-row items-center gap-10 md:gap-14">
        <div class="relative group">
          <div class="w-40 h-40 rounded-full border-4 border-primary-fixed overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-105 bg-surface-container">
            <img v-if="avatarUrl" referrerpolicy="no-referrer" :src="avatarUrl" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-primary/20">
              <span class="material-symbols-outlined text-6xl">person</span>
            </div>
          </div>
          <button class="absolute bottom-2 right-2 w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-xl">edit</span>
          </button>
        </div>
        
        <div class="text-center md:text-left flex flex-col justify-center space-y-6">
          <div class="space-y-2 md:space-y-3">
            <h2 class="text-3xl md:text-4xl font-black font-headline text-on-surface">{{ fullName }}</h2>
            <p class="text-on-surface-variant text-base md:text-lg font-medium opacity-80">{{ profile?.email || user?.email }}</p>
          </div>
          <div class="pt-2">
            <NuxtLink to="/profile/edit" class="inline-block px-8 py-4 bg-surface-container-high text-on-surface font-black text-sm uppercase tracking-[0.2em] rounded-full hover:bg-surface-container-highest transition-all text-center shadow-sm">
              Modifier le profil
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Verification Badge -->
      <div class="mt-14 p-6 bg-secondary-container/20 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 border border-secondary-container/10">
        <div class="flex items-center gap-6">
          <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm shrink-0">
            <span class="material-symbols-outlined text-2xl font-black">verified_user</span>
          </div>
          <div>
            <h4 class="font-black text-sm uppercase tracking-widest text-on-surface">Compte Vérifié</h4>
            <p class="text-xs font-bold text-on-surface-variant/60">Dernière synchronisation santé effectuée récemment.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dossier Médical Summary -->
    <div class="bg-white rounded-[3rem] p-10 lg:p-14 border border-outline-variant/10 shadow-sm space-y-8 relative overflow-hidden">
      <!-- Background accent -->
      <div class="absolute -top-32 -right-32 w-64 h-64 bg-error/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-error-container/50 rounded-2xl text-error shrink-0">
            <span class="material-symbols-outlined text-3xl">medical_information</span>
          </div>
          <div>
            <h3 class="text-2xl font-bold font-headline text-on-surface">Dossier Médical</h3>
            <p class="text-sm font-medium text-on-surface-variant opacity-80">Complété à {{ profileCompletion }}%</p>
          </div>
        </div>
        <div class="w-full md:w-48 h-3 bg-surface-container-high rounded-full overflow-hidden shrink-0 shadow-inner">
          <div class="h-full bg-gradient-to-r from-error to-error-container transition-all duration-1000 ease-out" :style="`width: ${profileCompletion}%`"></div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-outline-variant/10 relative z-10">
        <!-- Vitals -->
        <div class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Biométrie</p>
          <ul class="space-y-3">
            <li class="flex items-center gap-3 text-sm font-semibold text-on-surface">
              <span class="material-symbols-outlined text-primary/60 text-lg">monitor_weight</span>
              {{ profile?.weight ? profile.weight + ' kg' : 'Poids non renseigné' }}
            </li>
            <li class="flex items-center gap-3 text-sm font-semibold text-on-surface">
              <span class="material-symbols-outlined text-primary/60 text-lg">bloodtype</span>
              {{ profile?.blood_type ? 'Groupe ' + profile.blood_type : 'Groupe sanguin inconnu' }}
            </li>
          </ul>
        </div>
        
        <!-- Allergies -->
        <div class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-widest text-error/70">Allergies</p>
          <div v-if="profile?.has_allergies" class="bg-error/5 border border-error/20 p-4 rounded-2xl text-error text-sm font-bold shadow-sm">
            {{ profile?.allergies_list }}
          </div>
          <div v-else-if="profile?.has_allergies === false" class="flex items-center gap-2 text-sm font-semibold text-primary">
            <span class="material-symbols-outlined">check_circle</span>
            Aucune allergie connue
          </div>
          <p v-else class="text-sm font-medium text-on-surface-variant/60 italic">Information manquante</p>
        </div>
        
        <!-- Emergency -->
        <div class="space-y-4">
          <p class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">Urgence</p>
          <div v-if="profile?.emergency_contact_1_name" class="p-4 bg-surface-container-low rounded-2xl space-y-1 border border-outline-variant/10 shadow-sm relative overflow-hidden group">
            <div class="absolute right-0 top-0 bottom-0 w-1 bg-error/30 group-hover:bg-error transition-colors"></div>
            <p class="font-bold text-sm text-on-surface">{{ profile.emergency_contact_1_name }}</p>
            <p class="text-xs font-medium text-on-surface-variant/80">{{ profile.emergency_contact_1_phone }}</p>
            <p v-if="profile.emergency_contact_1_relation" class="text-[8px] font-black uppercase tracking-widest text-error mt-2">{{ profile.emergency_contact_1_relation }}</p>
          </div>
          <p v-else class="text-sm font-medium text-on-surface-variant/60 italic">Aucun contact renseigné</p>
        </div>
      </div>
    </div>

    <!-- Settings Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Notifications -->
      <section class="bg-surface-container-low rounded-[3rem] p-10 lg:p-12 space-y-10 border border-outline-variant/10">
        <div class="flex items-center gap-4">
          <span class="material-symbols-outlined text-primary text-3xl">notifications_active</span>
          <h3 class="text-2xl font-bold font-headline">Notifications</h3>
        </div>
        
        <div class="space-y-6">
          <div v-for="n in notificationSettings" :key="n.title" class="bg-white p-6 rounded-3xl flex justify-between items-center shadow-sm border border-outline-variant/5">
            <div class="space-y-1">
              <h4 class="font-bold text-on-surface">{{ n.title }}</h4>
              <p class="text-xs text-on-surface-variant/70 font-medium">{{ n.desc }}</p>
            </div>
            <button class="w-14 h-8 rounded-full transition-all relative" :class="n.active ? 'bg-primary' : 'bg-outline-variant/30'">
              <div class="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all" :class="n.active ? 'right-1' : 'left-1'"></div>
            </button>
          </div>
        </div>
      </section>

      <!-- Prescription Scan (New) -->
      <section class="bg-surface-container-low rounded-[3rem] p-10 lg:p-12 space-y-10 border border-outline-variant/10">
        <div class="flex items-center gap-4">
          <span class="material-symbols-outlined text-primary text-3xl">document_scanner</span>
          <h3 class="text-2xl font-bold font-headline">Ordonnances</h3>
        </div>
        
        <div class="space-y-6">
          <NuxtLink to="/profile/scan-prescription" class="bg-white p-8 rounded-3xl space-y-6 shadow-sm border border-outline-variant/5 flex flex-col hover:bg-surface-container transition-all group">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="p-3 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined">add_a_photo</span>
                </div>
                <span class="font-bold text-on-surface">Numériser une ordonnance</span>
              </div>
              <span class="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </div>
            <p class="text-xs text-on-surface-variant/60 font-medium leading-relaxed">
              Ajoutez vos médicaments en scannant votre ordonnance. Nous extrairons les posologies pour vous.
            </p>
          </NuxtLink>
        </div>
      </section>

      <!-- Accessibility -->
      <section class="bg-surface-container-low rounded-[3rem] p-10 lg:p-12 space-y-10 border border-outline-variant/10">
        <div class="flex items-center gap-4">
          <span class="material-symbols-outlined text-primary text-3xl">visibility</span>
          <h3 class="text-2xl font-bold font-headline">Accessibilité</h3>
        </div>
        
        <div class="space-y-6">
          <div class="bg-white p-8 rounded-3xl space-y-6 shadow-sm border border-outline-variant/5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <span class="material-symbols-outlined text-on-surface-variant">energy_savings_leaf</span>
                <span class="font-bold text-on-surface">Basse Énergie</span>
              </div>
              <button class="w-14 h-8 rounded-full bg-outline-variant/30 transition-all relative">
                <div class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"></div>
              </button>
            </div>
            <p class="text-xs text-on-surface-variant/60 font-medium leading-relaxed">
              Optimisez l'interface pour votre confort visuel et économisez la batterie de votre appareil.
            </p>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Guide & Support -->
    <div class="pt-8">
      <div class="px-10 py-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 flex items-center justify-between group hover:bg-primary/10 transition-all">
        <div class="flex items-center gap-6">
          <div class="p-3 bg-white rounded-2xl text-primary shadow-sm group-hover:rotate-6 transition-transform">
            <span class="material-symbols-outlined">rocket_launch</span>
          </div>
          <div>
            <h4 class="font-bold text-lg font-headline text-on-surface">Visite guidée</h4>
            <p class="text-xs text-on-surface-variant font-medium opacity-70">Revoir l'onboarding pour explorer les fonctionnalités.</p>
          </div>
        </div>
        <NuxtLink to="/onboarding" class="px-8 py-3 bg-primary text-on-primary rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
          Lancer
        </NuxtLink>
      </div>
    </div>

    <!-- Logout Button -->
    <div class="pt-8 flex justify-center">
      <button @click="logout" class="flex items-center gap-3 px-12 py-5 bg-error-container text-error rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-error/10 hover:bg-error hover:text-on-error transition-all active:scale-95">
        <span class="material-symbols-outlined">logout</span>
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const profile = ref(null)

const avatarUrl = computed(() => {
  return profile.value?.avatar_url || user.value?.user_metadata?.avatar_url || user.value?.user_metadata?.picture
})

const fullName = computed(() => {
  return profile.value?.full_name || user.value?.user_metadata?.full_name || user.value?.user_metadata?.name || 'Utilisateur Serenity'
})

const profileCompletion = computed(() => {
  if (!profile.value) return 0
  const fields = ['full_name', 'dob', 'sex', 'weight', 'height', 'blood_type', 'cancer_type', 'doctor_name', 'emergency_contact_1_name']
  let filled = 0
  for (const f of fields) {
    if (profile.value[f] && profile.value[f] !== '') filled++
  }
  // has_allergies boolean
  if (profile.value.has_allergies === true || profile.value.has_allergies === false) filled++
  
  return Math.round((filled / (fields.length + 1)) * 100)
})

const notificationSettings = [
  { title: 'Alertes persistantes', desc: 'Rappels de soins critiques.', active: true },
  { title: 'Résumé hebdomadaire', desc: 'Progression de soins chaque lundi.', active: false },
]

onMounted(async () => {
  if (user.value) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single()
    profile.value = data
  }
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>
