<template>
  <div class="font-body selection:bg-primary/20 h-screen bg-background text-on-surface overflow-hidden flex flex-col md:flex-row">
    <!-- Overlay for mobile drawer -->
    <div 
      v-if="isMenuOpen" 
      class="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
      @click="isMenuOpen = false"
    ></div>

    <!-- Sidebar (Retractable) -->
    <aside 
      class="fixed left-0 top-0 h-full bg-white border-r border-outline-variant/10 flex flex-col z-[70] transition-all duration-300 shadow-2xl md:shadow-none overflow-hidden"
      :class="[
        isMenuOpen ? 'flex translate-x-0 w-72' : 'hidden md:flex -translate-x-full md:translate-x-0',
        isSidebarCollapsed ? 'md:w-20' : 'md:w-72'
      ]"
    >
      <!-- Logo Section -->
      <div class="p-6 flex flex-col gap-1 shrink-0 overflow-hidden">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-3xl font-bold">spa</span>
            <span v-if="!isSidebarCollapsed || isMenuOpen" class="text-xl font-black text-blue-800 tracking-tighter font-headline whitespace-nowrap">Serenity</span>
          </div>
          <button class="md:hidden p-2 hover:bg-surface-container-high rounded-full" @click="isMenuOpen = false">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <p v-if="!isSidebarCollapsed || isMenuOpen" class="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1 whitespace-nowrap">Votre sanctuaire</p>
      </div>

      <!-- Retract Button (Desktop only) -->
      <button 
        @click="toggleSidebar"
        class="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-outline-variant/20 rounded-full items-center justify-center shadow-sm z-50 hover:bg-primary hover:text-white transition-all transform hover:scale-110"
      >
        <span class="material-symbols-outlined text-xs">{{ isSidebarCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
      </button>
      
      <nav class="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar overflow-x-hidden">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.to"
          :to="item.to" 
          class="flex items-center gap-4 px-4 py-3.5 rounded-full transition-all duration-300 group relative font-semibold text-on-surface-variant hover:bg-surface-container-high"
          :class="{ 'justify-center px-0': isSidebarCollapsed && !isMenuOpen }"
          active-class="bg-white text-blue-700 shadow-md translate-x-1"
          :exact="item.to === '/'"
          @click="isMenuOpen = false"
        >
          <span class="material-symbols-outlined transition-transform group-hover:scale-110" :style="item.to === $route.path ? 'font-variation-settings: \'FILL\' 1' : ''">{{ item.icon }}</span>
          <span v-if="!isSidebarCollapsed || isMenuOpen" class="text-sm tracking-wide whitespace-nowrap">{{ item.label }}</span>
          
          <!-- Tooltip for collapsed mode -->
          <div v-if="isSidebarCollapsed && !isMenuOpen" class="absolute left-16 bg-blue-900 text-white text-[10px] py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] shadow-xl font-black uppercase tracking-widest border border-white/20">
            {{ item.label }}
          </div>
        </NuxtLink>

        <div class="pt-6 mt-6 border-t border-outline-variant/10 mx-2">
          <p v-if="!isSidebarCollapsed || isMenuOpen" class="px-4 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-4 whitespace-nowrap text-center">...</p>
          <NuxtLink 
            v-for="item in extraItems" 
            :key="item.to"
            :to="item.to" 
            class="flex items-center gap-4 px-4 py-3.5 rounded-full hover:bg-surface-container-high transition-all group font-semibold text-on-surface-variant relative"
            :class="{ 'justify-center px-0': isSidebarCollapsed && !isMenuOpen }"
            active-class="bg-white text-blue-700 shadow-md translate-x-1"
            @click="isMenuOpen = false"
          >
            <span class="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">{{ item.icon }}</span>
            <span v-if="!isSidebarCollapsed || isMenuOpen" class="text-sm tracking-wide whitespace-nowrap">{{ item.label }}</span>
            
            <div v-if="isSidebarCollapsed && !isMenuOpen" class="absolute left-16 bg-blue-900 text-white text-[10px] py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] shadow-xl font-black uppercase tracking-widest border border-white/20">
              {{ item.label }}
            </div>
          </NuxtLink>
        </div>
      </nav>

      <!-- Profile Section -->
      <NuxtLink to="/profile" class="p-4 mt-auto block group shrink-0 overflow-hidden">
        <div class="flex items-center gap-3 p-3 rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/10 group-hover:border-primary/30 transition-all group-hover:shadow-md" :class="{ 'justify-center px-0 p-2': isSidebarCollapsed && !isMenuOpen }">
          <div class="w-10 h-10 min-w-[40px] rounded-full overflow-hidden border-2 border-primary-fixed bg-surface-container flex items-center justify-center">
            <img v-if="avatarUrl" referrerpolicy="no-referrer" alt="Portrait" class="w-full h-full object-cover" :src="avatarUrl"/>
            <span v-else class="material-symbols-outlined text-primary/30 text-xl">person</span>
          </div>
          <div v-if="!isSidebarCollapsed || isMenuOpen" class="flex-1 min-w-0">
            <p class="text-xs font-black truncate text-on-surface">{{ fullName }}</p>
            <p class="text-[8px] text-on-surface-variant/60 uppercase font-black tracking-widest leading-none">{{ daysSinceRegistration }}</p>
          </div>
          <div v-if="!isSidebarCollapsed || isMenuOpen" class="p-2 group-hover:bg-primary/10 rounded-full transition-colors text-on-surface-variant group-hover:text-primary">
            <span class="material-symbols-outlined text-sm">settings</span>
          </div>
        </div>
      </NuxtLink>
    </aside>

    <!-- Mobile Header (Hidden on Tablet/Desktop) -->
    <header class="md:hidden fixed top-0 w-full z-40 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 h-16 flex items-center justify-between px-6">
      <div class="flex items-center gap-3">
        <button class="p-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95" @click="isMenuOpen = true">
          <span class="material-symbols-outlined text-blue-700">menu</span>
        </button>
        <span class="text-xl font-black text-blue-700 tracking-tighter font-headline">Serenity</span>
      </div>
      <div class="flex items-center gap-3">
        <button class="p-2 hover:bg-surface-container-high rounded-full transition-colors">
          <span class="material-symbols-outlined text-on-surface-variant">notifications</span>
        </button>
        <NuxtLink to="/profile" class="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20 flex items-center justify-center">
          <img v-if="avatarUrl" referrerpolicy="no-referrer" alt="Profile" class="w-full h-full object-cover" :src="avatarUrl"/>
          <span v-else class="material-symbols-outlined text-primary/30 text-xl">person</span>
        </NuxtLink>
      </div>
    </header>

    <!-- Content Area (Scrollable) -->
    <main 
      class="flex-1 transition-all duration-300 ease-in-out h-screen overflow-y-auto custom-scrollbar" 
      :class="[
        'pt-20 md:pt-10 pb-28 md:pb-10',
        'px-4 sm:px-10',
        isSidebarCollapsed ? 'md:ml-20' : 'md:ml-72'
      ]"
    >
      <div class="max-w-6xl mx-auto">
        <slot />
      </div>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav class="md:hidden fixed bottom-0 left-0 w-full z-50 rounded-t-[2.5rem] bg-surface-container-lowest/90 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(23,28,31,0.06)] px-4 pb-8 pt-4 flex justify-around items-center border-t border-outline-variant/5">
      <NuxtLink v-for="item in mobileMenuItems" :key="item.to" :to="item.to" class="flex flex-col items-center justify-center p-2 rounded-full min-w-[72px] transition-all group" active-class="text-primary bg-primary-fixed/30 -translate-y-1">
        <span class="material-symbols-outlined text-2xl" :style="item.to === $route.path ? 'font-variation-settings: \'FILL\' 1' : ''">{{ item.icon }}</span>
        <span class="text-[10px] font-black tracking-tight mt-1 opacity-80 uppercase leading-none">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <!-- Background Accents -->
    <div class="fixed top-20 right-[-10%] w-[40%] h-[40%] bg-secondary-fixed-dim/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    <div class="fixed bottom-40 left-[-10%] w-[30%] h-[30%] bg-primary-fixed-dim/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const profile = ref(null)

const avatarUrl = computed(() => {
  return profile.value?.avatar_url || user.value?.user_metadata?.avatar_url || user.value?.user_metadata?.picture
})

const fullName = computed(() => {
  return profile.value?.full_name || user.value?.user_metadata?.full_name || user.value?.user_metadata?.name || 'Utilisateur'
})

const daysSinceRegistration = computed(() => {
  const dateStr = user.value?.created_at || profile.value?.created_at
  if (!dateStr) return 'JOUR 1'
  const start = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.max(1, Math.ceil(Math.abs(now - start) / (1000 * 60 * 60 * 24)))
  return `JOUR ${diffDays}`
})

const fetchProfile = async () => {
  if (user.value) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.value.id).maybeSingle()
    if (data) profile.value = data
  } else {
    profile.value = null
  }
}

onMounted(() => {
  fetchProfile()
})

watch(user, () => {
  fetchProfile()
}, { immediate: true })

const isMenuOpen = ref(false)
const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const menuItems = [
  { to: '/', icon: 'home', label: 'Accueil' },
  { to: '/symptoms', icon: 'stethoscope', label: 'Symptômes' },
  { to: '/meds', icon: 'medication', label: 'Médicaments' },
  { to: '/timeline', icon: 'timeline', label: 'Ma Timeline' },
]

const extraItems = [
  { to: '/circle', icon: 'groups', label: 'Cercle de Soutien' },
  { to: '/wellbeing', icon: 'auto_awesome', label: 'Bien-être' },
  { to: '/apa', icon: 'play_circle', label: 'Vidéos APA' },
  { to: '/services', icon: 'map', label: 'Services Proxy' },
  { to: '/triage', icon: 'emergency', label: 'Alerte Urgence' },
]

const mobileMenuItems = [
  { to: '/', icon: 'home', label: 'ACCUEIL' },
  { to: '/timeline', icon: 'timeline', label: 'TIMELINE' },
  { to: '/wellbeing', icon: 'auto_awesome', label: 'SOINS' },
  { to: '/profile', icon: 'person', label: 'PROFIL' },
]
</script>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #dfe3e6;
  border-radius: 10px;
}
</style>
