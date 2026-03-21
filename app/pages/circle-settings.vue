<template>
  <div class="space-y-12 lg:space-y-16 pb-20">
    <!-- Hero Section -->
    <header class="text-center md:text-left space-y-6 max-w-3xl">
      <h1 class="font-headline font-extrabold text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight">Votre Cercle de Soutien</h1>
      <p class="text-on-surface-variant text-lg lg:text-xl font-medium opacity-80 leading-relaxed">
        Entourez-vous des personnes qui comptent. Gérez les invitations et définissez précisément ce que chaque membre peut voir pour vous accompagner au mieux.
      </p>
    </header>

    <!-- Bento Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      
      <!-- Invite Card (Primary Action) -->
      <section class="lg:col-span-8 bg-white rounded-[3rem] p-8 lg:p-12 shadow-[0_20px_60px_rgba(23,28,31,0.08)] border border-outline-variant/10 relative overflow-hidden group">
        <!-- Decorative subtle gradient -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-1000"></div>
        
        <div class="relative z-10 space-y-10">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-primary-container flex items-center justify-center text-on-primary-container shadow-inner">
              <span class="material-symbols-outlined text-3xl font-bold">person_add</span>
            </div>
            <h2 class="font-headline text-2xl lg:text-3xl font-bold tracking-tight">Inviter un proche</h2>
          </div>

          <div class="space-y-8">
            <div class="space-y-4">
              <label class="block text-xs font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2">LIEN D'INVITATION SÉCURISÉ</label>
              <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-grow relative">
                  <input 
                    class="w-full bg-surface-container-high/50 border-none rounded-[1.5rem] px-6 py-5 text-primary font-bold focus:ring-4 focus:ring-primary/10 transition-all shadow-inner" 
                    readonly 
                    type="text" 
                    value="https://serenity.care/join/cercle-7a2x9"
                  />
                  <span class="material-symbols-outlined absolute right-6 top-5 text-on-surface-variant/40 hover:text-primary cursor-pointer transition-colors">content_copy</span>
                </div>
                <button class="bg-primary text-on-primary px-10 py-5 rounded-[1.5rem] font-black tracking-[0.2em] text-sm uppercase shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  PARTAGER
                </button>
              </div>
            </div>

            <div class="pt-4 space-y-6">
              <h3 class="text-xs font-black text-on-surface-variant/40 uppercase tracking-[0.3em] ml-2">PERMISSIONS PAR DÉFAUT</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="p in [
                  { label: 'Voir mon journal', active: true },
                  { label: 'Gérer mes tâches', active: false },
                  { label: 'Recevoir les alertes', active: true }
                ]" :key="p.label" class="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                  <span class="text-xs font-bold">{{ p.label }}</span>
                  <div class="w-10 h-6 rounded-full relative transition-colors cursor-pointer" :class="p.active ? 'bg-primary' : 'bg-surface-container-high'">
                    <div class="absolute top-1 w-4 h-4 bg-white rounded-full transition-all" :style="p.active ? 'left: 20px' : 'left: 4px'"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats/Atmosphere Card -->
      <aside class="lg:col-span-4 bg-secondary-container rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-secondary/10">
        <div class="relative z-10 space-y-4">
          <h3 class="text-on-secondary-container font-headline font-bold text-2xl tracking-tight">Atmosphère Collaborative</h3>
          <p class="text-on-secondary-container/70 text-base font-medium leading-relaxed">
            Le partage de votre parcours réduit la charge mentale de 40%. Votre cercle est là pour vous porter à chaque étape.
          </p>
        </div>
        
        <div class="relative mt-12">
          <div class="flex -space-x-4">
            <img v-for="i in 3" :key="i" class="w-14 h-14 rounded-full ring-4 ring-secondary-container object-cover shadow-lg" :src="`https://i.pravatar.cc/150?u=${i+10}`" alt="Member" />
            <div class="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md ring-4 ring-secondary-container flex items-center justify-center text-on-secondary-container font-black text-xs shadow-inner">
              +2
            </div>
          </div>
        </div>
        
        <!-- Background decorative shape -->
        <div class="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </aside>

      <!-- Members List Section -->
      <section class="lg:col-span-12 space-y-10">
        <div class="flex items-center justify-between px-2">
          <div class="flex items-center gap-6">
            <div class="w-16 h-16 rounded-[1.5rem] bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-inner">
              <span class="material-symbols-outlined text-3xl font-bold">group</span>
            </div>
            <h2 class="font-headline text-2xl lg:text-3xl font-bold tracking-tight">Membres actifs</h2>
          </div>
          <div class="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-black tracking-widest uppercase">5 MEMBRES</div>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <!-- Inline MemberRow logic -->
          <div v-for="m in members" :key="m.name" class="bg-white rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 border border-outline-variant/10 shadow-sm hover:shadow-md transition-all">
            <img :src="m.img" class="w-16 h-16 rounded-2xl object-cover shadow-sm" alt="Avatar" />
            <div class="flex-grow text-center md:text-left">
              <h4 class="text-lg font-black">{{ m.name }}</h4>
              <p class="text-xs font-bold text-primary uppercase tracking-widest">{{ m.role }}</p>
              <p class="text-[10px] font-medium opacity-50">{{ m.email }}</p>
            </div>
            <div class="flex flex-wrap justify-center gap-2">
              <span v-for="p in m.perms" :key="p" class="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70">{{ p }}</span>
            </div>
            <button class="p-3 hover:bg-surface-container-high rounded-2xl transition-all">
              <span class="material-symbols-outlined text-xl">more_vert</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Signature Footer -->
      <footer class="lg:col-span-12 flex justify-center py-20">
        <div class="relative flex flex-col items-center group">
          <div class="w-40 h-40 rounded-full border-4 border-secondary/10 flex items-center justify-center animate-pulse-slow">
            <div class="w-28 h-28 rounded-full bg-secondary/5 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
              <span class="material-symbols-outlined text-secondary text-5xl font-light">favorite</span>
            </div>
          </div>
          <p class="mt-8 text-secondary font-black text-xs tracking-[0.4em] uppercase opacity-60">Espace de Confiance</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
const members = [
  {
    name: "Marc Dupont",
    role: "Conjoint",
    email: "admin@serenity.care",
    perms: ['Journal', 'Tâches', 'Alertes'],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5AqEctajUVd6sYbJFFrDlMorHIxypssVhyiaD0pdnFnh3LSRGw9RlFY9C1-iqr8XdnsxEKcc20OFCshzqpr4OJ82KFE_sARXvr8OJnymnfNgtsOi9rS8jA1bp-mLUGJ8biL2uIxN1UuOvDasjqN_rJpUEsisAkkAmhiGAmIfF6tmQcVnaGp_ZtZXQyZOhQ_x5s9QM41t9TWarzw2BOylxQGFvX0_2-YAD0ucxwweUlfoweDAeEkpq0ivURqjncFh_jv5UO2PhvbU"
  },
  {
    name: "Sarah Lemoine",
    role: "Amie",
    email: "sarah.l@email.com",
    perms: ['Journal', 'Alertes'],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfrlKn09Rgub5u5P5GU852vgjXxoKIIejj-_dYdUeVb10C4mUt71Etr0Jgq1KoAWfkHywwOrLn5WQ4izyTY9bDcqyrrmCBm3kiNQT6Mi29Ip-0ikv1KDM1xNdsp9RFRpOzt9kJF8Xsq5ghO50FztB9ht0jMpsPbCz9iIs1xOMA4yWNbyJx-HcVk562b3Z0CMcVbFYyAEe8LI2taLTY3uEuTUSlNeduaQECS_gjWsRB-quqC59yRq8EMiygMjtqcMLMnWMjsv9jkNA"
  }
]
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
}
.animate-pulse-slow {
  animation: pulse-slow 6s infinite ease-in-out;
}
</style>
