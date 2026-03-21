<template>
  <div class="space-y-8 lg:space-y-12">
    <!-- Hero Section -->
    <header class="text-center space-y-4 max-w-2xl mx-auto py-6">
      <h1 class="font-headline font-extrabold text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight">Messages du Cercle</h1>
      <p class="text-on-surface-variant text-lg font-medium opacity-80 leading-relaxed px-6">
        Partagez vos nouvelles une seule fois avec tout votre entourage en toute sécurité et recevez leur soutien au quotidien.
      </p>
    </header>

    <!-- Post Update Card -->
    <section class="max-w-2xl mx-auto">
      <div class="bg-surface-container-lowest p-8 lg:p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(23,28,31,0.08)] border border-outline-variant/10 space-y-6 group">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">edit_note</span>
          </div>
          <h3 class="font-headline font-bold text-xl">Publier une nouvelle</h3>
        </div>
        <textarea 
          class="w-full border-none bg-surface-container-high/50 rounded-[1.5rem] p-6 focus:ring-4 focus:ring-primary/10 text-on-surface placeholder:text-on-surface-variant/40 resize-none min-h-[160px] font-medium leading-relaxed transition-all shadow-inner" 
          placeholder="Comment vous sentez-vous aujourd'hui ?"
        ></textarea>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          <div class="flex gap-3">
            <button class="flex items-center gap-3 px-6 py-3 rounded-full bg-secondary-container text-on-secondary-container text-xs font-black tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all">
              <span class="material-symbols-outlined text-lg">image</span>
              PHOTO
            </button>
            <button class="flex items-center gap-3 px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-black tracking-widest uppercase hover:bg-surface-container-highest active:scale-95 transition-all">
              <span class="material-symbols-outlined text-lg">attach_file</span>
              DOC
            </button>
          </div>
          <button class="w-full sm:w-auto bg-primary text-on-primary px-10 py-4 rounded-full font-black tracking-[0.2em] text-sm uppercase shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            PUBLIER
          </button>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="max-w-2xl mx-auto space-y-8 pb-32">
      <!-- Update Item 1 -->
      <article class="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden border border-outline-variant/5 shadow-xl transition-all hover:-translate-y-1">
        <div class="p-8 lg:p-10 space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container font-black text-lg overflow-hidden">
                <img v-if="profile?.avatar_url" :src="profile.avatar_url" class="w-full h-full object-cover" />
                <span v-else>{{ profile?.full_name?.charAt(0) || 'S' }}</span>
              </div>
              <div>
                <h4 class="font-headline font-extrabold text-on-surface">{{ profile?.full_name?.split(' ')[0] || 'Utilisateur' }} (Vous)</h4>
                <p class="text-[10px] text-on-surface-variant/40 uppercase tracking-[0.2em] font-black">AUJOURD'HUI • 10:30</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-secondary text-2xl" style="font-variation-settings: 'FILL' 1;">done_all</span>
          </div>
          <p class="text-on-surface text-lg leading-relaxed font-medium opacity-90">
            Bonne séance ce matin. Un peu fatiguée mais le moral est là ! J'ai pu marcher 15 minutes dans le jardin, le soleil fait vraiment du bien. Merci pour tous vos messages de soutien. 🌸
          </p>
          <div class="rounded-[2rem] overflow-hidden bg-surface-container h-64 relative border border-outline-variant/10">
            <img alt="Jardin ensoleillé" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGqkYcSPbg7d6sUwGkGRaxXuEFnnUw8cPDWs1YvIqpT9telRKML-g0S7ZtLtrgeO99q7jGrmsm2hHx3qS0AWcLBzGONaKJVv9PW1vmNAXs0UbPlids2rnHE70bOsBkdJY3kYnbmCmkLNto9jFYPifcEnRgjsWhtA-o2Nr0sNtN6ipS0h9n2UGJK-_xaxQJeoJd60aCAmq9uxtmljTa4mE3UFTRah4g_01k9PgYXMEqO4RmuItzI8pGbhsrV2G-BFuzMSp6ARJ8Y3I"/>
          </div>
          <div class="flex items-center gap-6 pt-6 border-t border-surface-container-high/50">
            <div class="flex -space-x-3">
              <div v-for="i in 3" :key="i" class="w-8 h-8 rounded-full border-4 border-surface-container-lowest flex items-center justify-center text-[10px] font-black text-white" :class="avatarColors[i-1]">
                {{ avatarLetters[i-1] }}
              </div>
            </div>
            <p class="text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest">8 PROCHES ONT VU CETTE ACTION</p>
          </div>
        </div>
      </article>

      <!-- Inbound Support Message -->
      <article class="flex flex-col items-start gap-4 pl-4 sm:pl-10">
        <div class="px-3 py-1 rounded-full bg-surface-container-high/50">
          <p class="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">JULIEN (FRÈRE)</p>
        </div>
        <div class="relative">
          <div class="bg-secondary-container text-on-secondary-container p-8 lg:p-10 rounded-[2.5rem] rounded-tl-lg shadow-2xl shadow-secondary/10">
            <p class="text-lg font-bold leading-relaxed">
              Super nouvelle Marie ! Je passe ce week-end avec des fraises, repose-toi bien d'ici là. On t'aime fort ! ❤️
            </p>
          </div>
          <p class="mt-4 text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em] ml-2">HIER • 19:45</p>
        </div>
      </article>
    </section>

    <!-- Floating Security Tag -->
    <div class="fixed bottom-32 right-8 bg-white/70 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 border border-secondary/20 shadow-2xl z-40 animate-bounce-slow">
      <span class="material-symbols-outlined text-secondary text-lg">encrypted</span>
      <span class="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">FIL SÉCURISÉ</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const profile = ref(null)

const avatarColors = ['bg-orange-400', 'bg-blue-400', 'bg-purple-400']
const avatarLetters = ['J', 'L', 'S']

onMounted(async () => {
  if (user.value) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.value.id).maybeSingle()
    if (data) profile.value = data
  }
})
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 4s infinite ease-in-out;
}
</style>
