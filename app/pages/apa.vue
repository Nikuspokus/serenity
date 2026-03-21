<template>
  <div class="space-y-10 lg:space-y-14 pb-24">
    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="flex items-center gap-4">
        <button class="p-3 rounded-full hover:bg-surface-container-high transition-colors active:scale-95" @click="$router.back()">
          <span class="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <h1 class="font-headline font-extrabold text-3xl lg:text-4xl tracking-tight text-on-surface">Vidéos APA</h1>
      </div>
      <div class="flex items-center gap-4">
        <div class="bg-secondary-container px-5 py-2 rounded-full flex items-center gap-3 shadow-sm">
          <span class="material-symbols-outlined text-on-secondary-container text-sm" style="font-variation-settings: 'FILL' 1;">bolt</span>
          <span class="font-bold text-[10px] uppercase tracking-widest text-on-secondary-container">Énergie : Douce</span>
        </div>
      </div>
    </header>

    <!-- Main Video Section -->
    <section class="max-w-5xl mx-auto">
      <div class="relative aspect-video w-full rounded-[2.5rem] overflow-hidden bg-surface-container-highest shadow-2xl group border border-outline-variant/10">
        <img alt="Yoga Session" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsrOqTfzgSlWwvDOsrU4UayQ0uJGaHzR5QfrW_9FF2ckwuaiz3qSnNXtzmOqpVAb671UcGasvHnFka3orPlDS4MmUIEdbaCJIPyVqAGshON1ofxQa98kjke9ii-FCtOkHK5JWQbgsY0r1rgeuzQC51ezaDpWkDD2xy6KZxlDX4ttsHJJPisI_R4FETVN_wKct5ShnBGKawzh5Ez8aZ5I74DrLIigwCJSNvzIhrPE0WLa_JG9pnxwkplwKnmckSgzaq4KKu74-mv8Y"/>
        
        <!-- Video Overlay UI -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 lg:p-12">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-6">
              <button class="w-20 h-20 flex items-center justify-center bg-white/20 backdrop-blur-xl rounded-full text-white hover:bg-white/30 transition-all active:scale-90 border border-white/20 shadow-2xl">
                <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
              </button>
              <div>
                <p class="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-1">EN COURS DE LECTURE</p>
                <h2 class="text-white font-headline text-2xl lg:text-3xl font-extrabold tracking-tight">Étirements du matin : Souffle & Mobilité</h2>
              </div>
            </div>
            <div class="hidden lg:flex gap-6 text-white/60">
              <button class="hover:text-white transition-colors"><span class="material-symbols-outlined text-2xl">closed_caption</span></button>
              <button class="hover:text-white transition-colors"><span class="material-symbols-outlined text-2xl">settings</span></button>
              <button class="hover:text-white transition-colors"><span class="material-symbols-outlined text-2xl">fullscreen</span></button>
            </div>
          </div>
          <!-- Progress Bar -->
          <div class="space-y-3">
            <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-secondary w-1/3 rounded-full shadow-[0_0_15px_rgba(20,106,92,0.5)]"></div>
            </div>
            <div class="flex justify-between text-white/50 text-xs font-bold tracking-widest">
              <span>04:12</span>
              <span>15:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
      
      <!-- Details Column -->
      <div class="lg:col-span-8 space-y-8">
        <div class="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm space-y-8">
          <div class="flex flex-wrap gap-3">
             <div v-for="t in [
               { icon: 'schedule', label: '15 MIN', color: 'bg-primary-fixed text-on-primary-fixed' },
               { icon: 'favorite', label: 'CARDIO LÉGER', color: 'bg-secondary-fixed text-on-secondary-fixed' },
               { icon: 'self_improvement', label: 'SANS MATÉRIEL', color: 'bg-tertiary-fixed text-on-tertiary-fixed' }
             ]" :key="t.label" :class="t.color" class="px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
               <span class="material-symbols-outlined text-sm font-normal">{{ t.icon }}</span>
               <span>{{ t.label }}</span>
             </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-headline text-2xl font-bold text-on-surface">À propos de cette séance</h3>
            <p class="text-on-surface-variant text-lg leading-relaxed font-medium opacity-80">
              Une séance conçue spécifiquement pour réveiller le corps en douceur. Idéale pour les matins où la fatigue est présente, cette routine se concentre sur l'ouverture thoracique et la mobilité articulaire pour réduire les tensions liées au repos prolongé.
            </p>
          </div>

          <div class="space-y-4 pt-6">
            <h4 class="font-headline font-extrabold text-primary text-sm uppercase tracking-[0.2em]">BIENFAITS ATTENDUS</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="b in ['Drainage lymphatique', 'Mobilité articulaire', 'Réduction du stress', 'Respiration profonde']" :key="b" class="flex items-center gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/5">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                <span class="text-sm font-bold">{{ b }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action/Gauge Column -->
      <div class="lg:col-span-4 space-y-8">
        <div class="bg-surface-container-low p-8 lg:p-10 rounded-[2.5rem] border border-outline-variant/10 text-center flex flex-col items-center gap-8">
          <h4 class="font-headline font-bold text-xl text-on-surface">Niveau d'énergie</h4>
          
          <div class="relative w-36 h-36 flex items-center justify-center">
             <div class="absolute inset-0 border-8 border-surface-container-highest rounded-full"></div>
             <div class="absolute inset-0 border-8 border-secondary rounded-full" style="clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%); transform: rotate(45deg);"></div>
             <div class="flex flex-col items-center">
               <span class="material-symbols-outlined text-4xl text-secondary mb-1" style="font-variation-settings: 'FILL' 1;">bolt</span>
               <span class="text-3xl font-black text-on-surface tracking-tighter">2 / 5</span>
             </div>
          </div>

          <div class="space-y-2">
            <p class="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em]">INTENSITÉ</p>
            <p class="font-bold text-secondary text-sm">Très Basse • Adaptée</p>
          </div>
        </div>

        <button class="w-full bg-primary text-on-primary py-6 rounded-[2rem] font-black tracking-widest text-sm uppercase shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
          Ajouter aux Favoris
        </button>

        <div class="bg-tertiary-fixed/30 p-6 rounded-3xl border border-tertiary/10 flex gap-4">
          <span class="material-symbols-outlined text-tertiary">warning</span>
          <p class="text-xs font-bold text-on-tertiary-fixed-variant leading-relaxed opacity-80">
            Écoutez votre corps. Si vous ressentez une douleur vive, arrêtez l'exercice immédiatement et respirez calmement.
          </p>
        </div>
      </div>
    </div>

    <!-- Recommendations -->
    <section class="pb-24 pt-10 px-2 md:px-6">
      <h3 class="font-headline text-2xl font-bold mb-10 px-2 lg:px-6">Nos autres séances douces</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="video in recommendations" :key="video.title" class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-outline-variant/10">
          <div class="aspect-video relative overflow-hidden">
            <img :src="video.img" class="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Video" />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">play_circle</span>
            </div>
          </div>
          <div class="p-5 space-y-3 font-medium">
            <div class="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-on-surface-variant/60">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">schedule</span>{{ video.dur }}</span>
              <span>{{ video.type }}</span>
            </div>
            <h5 class="text-on-surface font-bold text-sm leading-tight line-clamp-2">{{ video.title }}</h5>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const recommendations = [
  { title: 'Respiration Abdominale', dur: '5 MIN', type: 'Ancrage', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPG1Xn38gQg3pWrVD9Rr81fQ8fljh11Yi3m1RjkVso3cIr9zI6ggngi_w_22jVdJFNnKIh7d7yEnhHDioVCBYKN0E6uasgrm5yVieQGKbk_DlcZ1I-vkcN0D5OnzuXUp8AyUg7rfTVR4MTP3FoqzKab6GpJPJHm82BCcM03p_0UujXO6gPGcQ7z3oxF7WYyaQ7ag6ZxCflyguWbo5dxu4CJ0eZXevKCy0jmD6ZvSt6yU38ANNT5Ww1fgvm0u04tQbo81vecb1WH7Q' },
  { title: 'Renforcement Assis', dur: '10 MIN', type: 'Stabilité', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSPXPXyV1pYkcecCSng6hs-KqlA8NFalEx6S5d-ttzXA7pk1VcNlzmrRVcQCWiVbnQUObSscL1O_VeFR5JHEX6C7mchXbgb9L0sNJnp7lvo0Vbjvij1b-UJX8m5jFab9knHxdmBCsfMLn-tKPUDfqpcsLbCBEXyPsPuWWGHgal49meXuo2DqK4ZnKSYnsyBIYavsMI2tKMOUH-I_grWNvNg4f9YLLEGW8VjMHFIZwNNjCQVGaF5Dd3nB3Nn59Cj6t8WLG-Thz1wQg' },
  { title: 'Relaxation Progressive', dur: '15 MIN', type: 'Récupération', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwb9rm-fAp1yMsnWEZYLIDOKaq4D8BN0fkO88N49xn_YMJHS9sZZYDluvGXZXMsakZ1nJtI4pxaxKjV8J3MqYam_oq9iFCDzrFzJvpm3ZU2eC1wGXapKcfkQAf0mZyQoLjyVEduxGD7hJA2QyXy87z7NiFdy9JK-yrK5uM-j71TkHvv6o-3Wp7CY4qGZr7-D-SoOA-2LKFgoinDCfGbK1Bm7s2nupO_Kj4mvwKdocVFdpAOSx7W2zoKk5xZ_6I5ayYUcGVUAnGE_E' },
  { title: 'Marche Active Lente', dur: '10 MIN', type: 'Vitalité', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApkmyjm0P6GvJWUps8RBfUeaDcswGyGyn5wI93mIy1jH1xB4epliOr7h0ucK9sZ7qg28gOo8OIegSTiKmOk9B4UHj4GGDn2J9CpsukW4xZC6Jfy84GEROvhmFKPFmwFUhBEChToKPp3x-v52C0nMbXEPbXQjMXInvAYAOAtWQqwLdq7fzFgW-i8xZtbJ9jOQpZLQi-8hRFFDfKmCMgvcUKH2HxXaJ5SB1wxcBYadKWsKBMS24c8prVRU9qMDepieJw17EX4pOf6hc' }
]
</script>
