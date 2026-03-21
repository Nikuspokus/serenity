<template>
  <div class="space-y-10 lg:space-y-14">
    <!-- Hero Section -->
    <section class="mb-10 lg:mb-16">
      <div class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#005da9] to-[#3176c3] p-10 lg:p-14 text-white shadow-2xl">
        <div class="relative z-10 max-w-2xl">
          <h1 class="font-headline font-extrabold text-4xl lg:text-5xl mb-6 tracking-tight leading-tight">Votre Cercle de Soutien</h1>
          <p class="font-medium text-blue-50 opacity-90 mb-10 text-lg lg:text-xl leading-relaxed">
            Parce que personne ne devrait traverser cela seul. Invitez vos proches pour qu'ils puissent vous épauler concrètement, suivre vos rendez-vous, et vous aider sur les tâches du quotidien (courses, repas, garde d'animaux...).
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="bg-white text-primary px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all active:scale-95 shadow-xl text-lg">
              <span class="material-symbols-outlined">person_add</span>
              Inviter un proche
            </button>
          </div>
        </div>
        <div class="absolute -right-16 -bottom-16 opacity-10">
          <span class="material-symbols-outlined text-[300px]" style="font-variation-settings: 'FILL' 1;">groups</span>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section class="max-w-4xl mx-auto py-10">
      <div class="bg-surface-container-lowest rounded-[2.5rem] p-10 lg:p-16 text-center flex flex-col items-center border border-outline-variant/10 shadow-sm animate-in zoom-in-95 duration-500">
        <div class="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mb-8 rotate-3 shadow-sm border border-primary/10">
          <span class="material-symbols-outlined text-6xl text-primary opacity-80" style="font-variation-settings: 'FILL' 1;">volunteer_activism</span>
        </div>
        
        <h2 class="text-3xl font-bold font-headline mb-4 text-on-surface">Votre cercle est actuellement vide</h2>
        <p class="text-on-surface-variant text-lg font-medium max-w-xl mx-auto leading-relaxed mb-6">
          Actuellement, vous êtes le seul membre de votre cercle. En invitant des proches, ils apparaîtront ici. Ils pourront alors proposer de vous soulager de certaines tâches ou vous laisser des messages de soutien.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full opacity-60">
           <div class="flex flex-col items-center p-6 bg-surface-container-low rounded-3xl">
             <span class="material-symbols-outlined text-3xl mb-3">calendar_month</span>
             <h4 class="font-bold text-sm text-on-surface">Partage de Calendrier</h4>
           </div>
           <div class="flex flex-col items-center p-6 bg-surface-container-low rounded-3xl">
             <span class="material-symbols-outlined text-3xl mb-3">checklist</span>
             <h4 class="font-bold text-sm text-on-surface">Aide Logistique</h4>
           </div>
           <div class="flex flex-col items-center p-6 bg-surface-container-low rounded-3xl">
             <span class="material-symbols-outlined text-3xl mb-3">mode_comment</span>
             <h4 class="font-bold text-sm text-on-surface">Mots de Soutien</h4>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const profile = ref(null)

onMounted(async () => {
  if (user.value) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.value.id).maybeSingle()
    if (data) profile.value = data
  }
})
</script>
