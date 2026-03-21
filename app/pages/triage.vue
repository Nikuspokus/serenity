<template>
  <div class="min-h-[80vh] flex flex-col pb-20">
    <!-- Emergency Header Section -->
    <section class="bg-gradient-to-br from-[#9b3e32] to-[#bb5548] p-10 lg:p-16 rounded-[3rem] relative overflow-hidden shadow-2xl shadow-error/30 text-center">
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10"></div>
      
      <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-8">
        <div class="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-inner animate-pulse">
          <span class="material-symbols-outlined text-white text-5xl" style="font-variation-settings: 'FILL' 1;">warning</span>
        </div>
        <div class="space-y-4">
          <h1 class="font-headline font-extrabold text-4xl lg:text-5xl text-white tracking-tight leading-tight">Alerte Urgence</h1>
          <p class="text-white/90 text-xl font-medium leading-relaxed max-w-md">
            Contactez immédiatement votre service d'astreinte ou votre oncologue référent.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content Grid -->
    <div class="flex-1 mt-[-3rem] px-4 lg:px-10 z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
        
        <!-- Primary Action Column -->
        <div class="lg:col-span-12 lg:mb-10 mb-6">
           <div class="bg-[#ba1a1a] rounded-[2.5rem] p-2 shadow-2xl group">
             <a href="tel:0102030405" class="block w-full bg-[#9b3e32] py-8 lg:py-12 rounded-[2.2rem] text-center transition-all hover:brightness-110 active:scale-95 group-hover:shadow-inner border border-white/10">
               <span class="block font-headline font-extrabold text-3xl lg:text-4xl text-white tracking-[0.2em] uppercase">APPELER L'ONCOLOGUE</span>
               <span class="block text-white/70 text-sm mt-3 font-bold uppercase tracking-widest">Disponibilité : 24h/24 · 7j/7</span>
             </a>
           </div>
        </div>

        <div class="lg:col-span-7 space-y-8">
          <!-- Detected Symptoms -->
          <div class="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_15px_50px_rgba(23,28,31,0.08)] border border-outline-variant/10">
            <h2 class="font-headline font-extrabold text-2xl mb-8 flex items-center gap-4 text-on-surface">
              <span class="material-symbols-outlined text-tertiary text-3xl">report_problem</span>
              Symptômes détectés
            </h2>
            <div class="flex flex-wrap gap-4 mb-8">
              <div class="bg-tertiary-container/10 px-6 py-3 rounded-2xl border border-tertiary/20 flex items-center gap-3">
                <span class="w-3 h-3 rounded-full bg-tertiary animate-pulse shadow-[0_0_10px_rgba(186,26,26,0.5)]"></span>
                <span class="text-tertiary font-extrabold text-sm uppercase tracking-tight">Fièvre (>38.5°C)</span>
              </div>
              <div class="bg-tertiary-container/10 px-6 py-3 rounded-2xl border border-tertiary/20 flex items-center gap-3">
                <span class="w-3 h-3 rounded-full bg-tertiary animate-pulse shadow-[0_0_10px_rgba(186,26,26,0.5)]"></span>
                <span class="text-tertiary font-extrabold text-sm uppercase tracking-tight">Frissons intenses</span>
              </div>
            </div>
            <p class="text-on-surface-variant font-medium text-lg leading-relaxed opacity-90">
              Ces signes associés peuvent indiquer une <span class="font-extrabold text-on-surface border-b-2 border-tertiary/30">neutropénie fébrile</span>, nécessitant une prise en charge immédiate. Ne prenez aucun médicament sans avis médical préalable.
            </p>
          </div>
        </div>

        <!-- Directory & Prep Column -->
        <div class="lg:col-span-5 space-y-8">
          <!-- Emergency Directory -->
          <div class="bg-surface-container-low rounded-[2.5rem] p-8 lg:p-10 border border-outline-variant/10 shadow-sm">
            <h3 class="font-headline font-extrabold text-xl mb-8 text-on-surface tracking-tight">Annuaire Prioritaire</h3>
            <div class="space-y-4">
              <!-- Inline ContactItem logic -->
              <a v-for="c in contacts" :key="c.name" :href="`tel:${c.phone}`" class="flex items-center gap-4 p-4 rounded-[1.5rem] bg-white hover:shadow-md transition-all border border-outline-variant/5 group">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" :class="c.color">
                  <span class="material-symbols-outlined text-on-surface" :class="c.isEmergency ? 'text-white' : ''">{{ c.icon }}</span>
                </div>
                <div class="flex-grow">
                  <p class="text-sm font-black text-on-surface leading-none mb-1">{{ c.name }}</p>
                  <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">{{ c.sub }}</p>
                </div>
                <div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span class="material-symbols-outlined text-sm text-primary">call</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Prep Note -->
          <div class="bg-primary/5 p-8 rounded-[2rem] border-l-8 border-primary shadow-sm space-y-6">
            <h4 class="text-xs font-black text-primary uppercase tracking-[0.3em]">PRÉPARER L'APPEL</h4>
            <ul class="space-y-4">
              <li v-for="tip in prepTips" :key="tip" class="flex items-center gap-4 text-on-surface font-bold text-sm">
                <span class="material-symbols-outlined text-primary text-xl">check_circle</span>
                {{ tip }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const contacts = [
  { name: "Service Oncologie", sub: "Hôpital Central", phone: "0144556677", icon: "local_hospital", color: "bg-primary-fixed" },
  { name: "Dr. Marc Lefebvre", sub: "Oncologue Référent", phone: "0607080910", icon: "medical_information", color: "bg-primary-fixed" },
  { name: "SAMU (15)", sub: "Urgences Vitales", phone: "15", icon: "emergency", color: "bg-error", isEmergency: true }
]

const prepTips = [
  'Dernier relevé de température',
  'Date de votre dernière cure',
  'Liste des médicaments actuels'
]
</script>
