<template>
  <div class="space-y-10 lg:space-y-14">
    <!-- Hero Section & Date Selector -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div class="space-y-4 max-w-xl">
        <h1 class="text-4xl lg:text-5xl font-headline font-extrabold tracking-tight text-on-surface">Journal & Rapports</h1>
        <p class="text-on-surface-variant text-lg font-medium opacity-80 leading-relaxed">
          Documentez votre parcours, suivez vos progrès visuels et préparez vos échanges médicaux en toute sérénité.
        </p>
      </div>
      <div class="flex items-center gap-4 p-3 bg-surface-container-low rounded-2xl border border-outline-variant/10 shadow-sm">
        <div class="flex items-center gap-3 px-6 py-3 bg-surface-container-lowest rounded-xl shadow-sm">
          <span class="material-symbols-outlined text-primary text-sm">calendar_today</span>
          <span class="text-sm font-bold tracking-tight">Octobre 2024</span>
        </div>
        <button class="p-3 hover:bg-surface-container-high rounded-xl transition-colors">
          <span class="material-symbols-outlined" style="font-variation-settings: 'opsz' 20;">tune</span>
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      
      <!-- Left Column: Blog / Feed -->
      <div class="lg:col-span-7 space-y-8">
        <div class="flex items-center justify-between px-2">
          <h2 class="text-2xl font-headline font-bold text-on-surface tracking-tight">Nouvelles du jour</h2>
          <button class="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity tracking-widest text-xs">
            <span class="material-symbols-outlined text-sm">add_circle</span>
            NOUVELLE ENTRÉE
          </button>
        </div>

        <!-- Blog Posts -->
        <div class="space-y-6">
          <article v-for="(post, index) in posts" :key="index" class="bg-surface-container-lowest p-8 lg:p-10 rounded-[2.5rem] space-y-6 border border-outline-variant/10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all group">
            <div class="flex items-center gap-5">
              <div class="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" :class="post.colorClass">
                <span class="material-symbols-outlined" :style="post.iconStyle">{{ post.icon }}</span>
              </div>
              <div>
                <p class="font-bold font-headline text-xl text-on-surface">{{ post.title }}</p>
                <p class="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1 opacity-60">{{ post.meta }}</p>
              </div>
            </div>
            <p class="text-on-surface-variant leading-relaxed text-lg font-medium opacity-90">{{ post.content }}</p>
            <div class="flex flex-wrap gap-2 pt-4 border-t border-outline-variant/5">
              <span v-for="tag in post.tags" :key="tag" class="px-4 py-2 bg-surface-container-low rounded-2xl text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                #{{ tag }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <!-- Right Column: Medical Report & Photo Gallery -->
      <div class="lg:col-span-5 space-y-12">
        
        <!-- Medical Report Section -->
        <section class="bg-[#005da9] p-10 lg:p-12 rounded-[2.5rem] text-on-primary space-y-8 relative overflow-hidden shadow-2xl shadow-primary/20 group">
          <div class="relative z-10 space-y-3">
            <h3 class="text-2xl font-headline font-extrabold tracking-tight">Rapport Mensuel</h3>
            <p class="text-blue-100 font-medium opacity-90 leading-relaxed text-sm">
              Synthèse automatique de vos constantes et de votre journal pour votre oncologue.
            </p>
          </div>
          <div class="relative z-10 pt-4">
            <button class="w-full bg-white text-primary py-5 px-8 rounded-2xl font-extrabold flex items-center justify-center gap-4 active:scale-95 hover:scale-105 transition-all shadow-xl group-hover:shadow-primary-fixed/20">
              <span class="material-symbols-outlined text-2xl">picture_as_pdf</span>
              Générer le PDF
            </button>
          </div>
          <!-- Abstract decorative background -->
          <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        </section>

        <!-- Photo Gallery Section -->
        <section class="space-y-8">
          <div class="flex items-center justify-between px-2">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-secondary text-2xl">shutter_speed</span>
              <h3 class="text-2xl font-headline font-bold text-on-surface tracking-tight">Suivi Visuel</h3>
            </div>
            <span class="text-[10px] font-bold text-secondary bg-secondary-container/30 border border-secondary/10 px-4 py-2 rounded-full flex items-center gap-2 uppercase tracking-widest">
              <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">lock</span>
              Sécurisé
            </span>
          </div>
          
          <div class="grid grid-cols-2 lg:grid-cols-2 gap-6">
            <!-- Photo Cards -->
            <div v-for="photo in photos" :key="photo.date" class="group relative aspect-square rounded-[2rem] overflow-hidden bg-surface-container-high cursor-pointer shadow-md hover:shadow-xl transition-all">
              <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" :src="photo.src" :alt="photo.date"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="absolute bottom-6 left-6">
                <p class="text-[10px] text-white font-bold uppercase tracking-[0.2em]">{{ photo.date }}</p>
              </div>
            </div>
            <!-- Add Action -->
            <button class="aspect-square rounded-[2rem] border-4 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-4 text-on-surface-variant hover:bg-surface-container-low hover:border-primary/30 hover:text-primary transition-all group">
              <div class="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <span class="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add_a_photo</span>
              </div>
              <span class="text-xs font-extrabold uppercase tracking-widest">Ajouter</span>
            </button>
          </div>
        </section>

        <!-- Insights -->
        <section class="bg-surface-container-low p-8 lg:p-10 rounded-[2.5rem] border border-outline-variant/10">
          <div class="space-y-8">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold tracking-[0.3em] uppercase text-on-surface-variant opacity-60">Tendances (7J)</h4>
              <span class="material-symbols-outlined text-primary text-xl">insights</span>
            </div>
            
            <div class="flex items-end justify-between h-32 px-2 gap-3 lg:gap-4">
              <div v-for="day in trends" :key="day.label" class="flex flex-col items-center flex-1 gap-2 group">
                <div class="w-full flex items-end gap-1.5 h-20">
                  <div class="flex-1 bg-gradient-to-t from-primary to-primary-container rounded-full transition-all group-hover:brightness-110" :style="{ height: day.sleep + '%' }"></div>
                  <div class="flex-1 bg-gradient-to-t from-secondary to-secondary-container rounded-full transition-all group-hover:brightness-110" :style="{ height: day.energy + '%' }"></div>
                </div>
                <span class="text-[10px] font-extrabold opacity-40 uppercase tracking-tighter">{{ day.label }}</span>
              </div>
            </div>

            <div class="flex items-center justify-center gap-8 pt-6 border-t border-outline-variant/10">
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
                <span class="text-[10px] font-bold uppercase tracking-widest opacity-60">Sommeil</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-secondary shadow-sm"></div>
                <span class="text-[10px] font-bold uppercase tracking-widest opacity-60">Énergie</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Padding for mobile -->
    <div class="pb-20 lg:pb-0"></div>
  </div>
</template>

<script setup>
const posts = [
  {
    title: 'Énergie retrouvée',
    meta: 'Aujourd\'hui, 09:45 • Privé',
    content: 'Une matinée étonnamment calme. J\'ai pu marcher 20 minutes dans le parc. Les effets secondaires semblent s\'estomper légèrement ce cycle. Reconnaissante pour ce répit.',
    icon: 'mood',
    colorClass: 'bg-secondary-container text-on-secondary-container',
    iconStyle: 'font-variation-settings: \'FILL\' 1',
    tags: ['repos', 'marche', 'espoir']
  },
  {
    title: 'Notes pour Onco',
    meta: 'Hier, 18:20 • Médical',
    content: 'Légères nausées après le dîner. À mentionner lors du prochain rendez-vous. La fatigue est plus prononcée en fin de journée que la semaine dernière.',
    icon: 'psychology',
    colorClass: 'bg-tertiary-fixed text-tertiary',
    iconStyle: '',
    tags: ['traitement', 'fatigue']
  }
]

const photos = [
  { date: '24 oct', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd1VwhMVLzMw2gjO0QPnZhHHTaBkTfaQxPx9SLq2izYP5MgQCguZvq-aAZ-1zzVnjTq8yW_XTksDRsPOi_f-PpKOaxENnvGRgKuZjA1qc6KrhkkixmFcSH6msCaitzHXA4v9PwKhbT0vT2xB5gI_6LP7KCc8sOYYV8qlXryXUNPjQbR_sgTRPGtbm2f8N8DebxIGEZgFoij-wE87byRXs7jLk5j3VjlHXktD04vYkB0UjoK4qGpda2MEcEGBjh_DCHM0-WdMmV0U8' },
  { date: '15 oct', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmJLJzQlL0TUCkxxpbFfvDj8I308MBWZBuk3J0AoIiHZWXemGgjCp_ivUsdvIsKZpJDYfgJkTu8-j4KTkzYxHz-GXXCiHqs0LfjpAn_CbRJFDeQO8Cot-8SPu3GK7JqcFXF_VGVZz8WDm45bKGpbzykCdz4l6d59Sgu8mV4Uo0RX7rwPaPBr-kgIvbe3NZh_Tig5CQCUMjYn8jUWFfL_gpL0KankS1C9RjMeF7do3iEJQJ82K3JgbGup6sqcdOeR1xyerZJfbcpE' }
]

const trends = [
  { label: 'Lun', sleep: 60, energy: 40 },
  { label: 'Mar', sleep: 80, energy: 30 },
  { label: 'Mer', sleep: 45, energy: 70 },
  { label: 'Jeu', sleep: 90, energy: 20 },
  { label: 'Ven', sleep: 70, energy: 50 },
  { label: 'Sam', sleep: 55, energy: 65 },
  { label: 'Dim', sleep: 85, energy: 35 }
]
</script>
