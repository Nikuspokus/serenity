<template>
  <div class="bg-background text-on-background min-h-screen flex flex-col selection:bg-primary-fixed overflow-x-hidden font-body">
    <!-- Top Navigation -->
    <header class="fixed top-0 w-full z-50 bg-[#f6fafd]/70 backdrop-blur-xl border-b border-outline-variant/10">
      <div class="flex justify-between items-center px-8 py-4 w-full max-w-7xl mx-auto">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-3xl font-bold">spa</span>
          <h1 class="text-2xl font-extrabold text-[#005da9] tracking-tight font-headline">Serenity</h1>
        </div>
        <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
          <span class="material-symbols-outlined text-primary">notifications</span>
        </button>
      </div>
    </header>

    <main class="flex-grow flex flex-col pt-28 pb-12 px-6 md:px-12 max-w-6xl mx-auto w-full">
      <!-- Step 1: Hero Section -->
      <section v-if="currentStep === 1" class="space-y-14 animate-in">
        <div class="text-center md:text-left">
          <h1 class="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-on-background mb-5 leading-[1.1]">
            Trouvez votre <span class="text-primary bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">Sanctuaire</span>
          </h1>
          <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed opacity-90 font-medium">
            Un accompagnement oncologique conçu pour apaiser l'esprit et soutenir le corps, avec une rigueur médicale et une humanité profonde.
          </p>
        </div>

        <!-- Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 flex-grow mb-12">
          <!-- Rigueur Médicale -->
          <div class="md:col-span-8 bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-sm border border-outline-variant/10 group hover:shadow-xl transition-all duration-500">
            <div class="md:w-1/2 relative h-56 md:h-auto overflow-hidden">
              <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtSsf6OajInF5tWflNzbghRMexFwi5ANN2tYkKWW1ubIi2JC13wZhARDdj47Aq4cIJxn86UZ_81yTJEfSeNLQZyTXOiuwhJZLXAl3an3M2-6iaIFoGQ86gQgqowLlt2LshdxEnTlFBzV5jhq9DE14rFoeTg0QOER18Hni8Yhi_nVPUbPiOV_9YdLMGYiFNFo-PYS0-IaceAjU5FtAMdEPcFPsDVw858T1jPxGca9Db1uZUA8QkltQRGc-bBS_ddbYUfx0s9Y5z9ag" />
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/60 hidden md:block"></div>
            </div>
            <div class="md:w-1/2 p-10 flex flex-col justify-center">
              <div class="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mb-6 shadow-sm">
                <span class="material-symbols-outlined text-primary text-2xl">medical_services</span>
              </div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface tracking-tight">Rigueur Médicale</h2>
              <p class="text-on-surface-variant leading-relaxed opacity-90 font-medium">
                Des protocoles basés sur les dernières avancées cliniques, validés par des experts pour votre sécurité absolue.
              </p>
            </div>
          </div>

          <!-- Bien-être -->
          <div class="md:col-span-4 bg-[#effaf6] rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm border border-outline-variant/10 hover:shadow-xl transition-all duration-500">
            <div>
              <div class="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center mb-6 shadow-sm">
                <span class="material-symbols-outlined text-secondary text-2xl">self_improvement</span>
              </div>
              <h2 class="font-headline text-2xl font-bold mb-4 text-on-surface tracking-tight">Bien-être</h2>
              <p class="text-on-surface-variant leading-relaxed opacity-90 font-medium">
                Des séances de méditation et des conseils nutritionnels adaptés à chaque étape.
              </p>
            </div>
            <div class="mt-8">
              <div class="h-2 w-full bg-secondary-container/30 rounded-full overflow-hidden">
                <div class="h-full bg-secondary w-2/3 rounded-full shadow-[0_0_12px_rgba(20,106,92,0.3)]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Step 2: Parcours Médical -->
      <section v-if="currentStep === 2" class="space-y-10 animate-in max-w-2xl mx-auto w-full">
        <div class="text-center">
          <h2 class="font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-on-background mb-5">
            Votre <span class="text-primary">Parcours</span>
          </h2>
          <p class="text-on-surface-variant text-lg font-medium opacity-90">
            Aidez-nous à personnaliser votre accompagnement en toute sécurité. 
            Ces informations restent strictement confidentielles.
          </p>
        </div>
        
        <div class="bg-white rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10 space-y-8 text-left">
          <div class="space-y-4">
            <label class="block text-sm font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Type de pathologie (Cancer)</label>
            <input v-model="formData.cancer_type" type="text" placeholder="Ex: Sein, Poumon, Prostate..." class="w-full px-8 py-5 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
          </div>
          <div class="space-y-4">
            <label class="block text-sm font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Médecin Traitant ou Oncologue (Nom)</label>
            <input v-model="formData.doctor_name" type="text" placeholder="Dr. Dupont" class="w-full px-8 py-5 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
          </div>
        </div>
      </section>

      <!-- Step 3: Sécurité Médicale & Allergies -->
      <section v-if="currentStep === 3" class="space-y-10 animate-in max-w-2xl mx-auto w-full">
        <div class="text-center">
          <h2 class="font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-on-background mb-5">
            Sécurité <span class="text-primary">Avant Tout</span>
          </h2>
          <p class="text-on-surface-variant text-lg font-medium opacity-90">
            Pour éviter toute interaction médicamenteuse, veuillez nous indiquer vos allergies.
          </p>
        </div>
        
        <div class="bg-white rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10 space-y-8 text-left">
          <div class="space-y-4">
            <h3 class="font-bold text-xl text-on-surface mb-6">Avez-vous des allergies connues ?</h3>
            <div class="flex gap-4">
              <button @click="formData.has_allergies = true" :class="formData.has_allergies === true ? 'bg-error text-on-error border-error' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:bg-surface-container'" class="flex-1 py-4 rounded-3xl font-black transition-all border-2">
                OUI
              </button>
              <button @click="formData.has_allergies = false" :class="formData.has_allergies === false ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:bg-surface-container'" class="flex-1 py-4 rounded-3xl font-black transition-all border-2">
                NON
              </button>
            </div>
          </div>
          <div v-if="formData.has_allergies" class="space-y-4 animate-in">
            <label class="block text-sm font-black uppercase tracking-widest text-on-surface-variant/70 ml-2 text-error">Précisez vos allergies</label>
            <textarea v-model="formData.allergies_list" rows="3" placeholder="Ex: Pénicilline, Iode, Arachides..." class="w-full px-8 py-5 rounded-3xl bg-error/5 border border-error/20 focus:border-error focus:bg-white focus:outline-none transition-all font-semibold resize-none"></textarea>
          </div>
        </div>
      </section>

      <!-- Step 4: Final Sanctuary -->
      <section v-if="currentStep === 4" class="space-y-10 animate-in h-full flex flex-col">
        <div class="relative flex-grow rounded-[3rem] overflow-hidden shadow-xl min-h-[400px]">
          <img class="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClEqJrU416hmQY20rH96phYxF7F7J72Dz8LxIbw6rN8qg2W8Pz9bCa7DEzExrEGB-nv6xvwwZxdOIH-UqWl9PsRbrMZv2fe4770VwjZZ0zcaNUarLu7Z40rxptj4m70s8oAR8SWsw_HOCZzsLet127gpS69ojqr2WoN-8MY4NYcvgs7_Du05ooXuEEptgNSa84kZZe6zGo3crGoDuc1nEYBYC6Gy_bfpDCCaVZUtbibMjpIl25UEi5RQBBIkRqrgqnNFmeTrOGvw8" />
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="absolute bottom-12 left-6 right-6 md:left-12 text-center md:text-left">
            <div class="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/40 max-w-lg shadow-2xl mx-auto md:mx-0">
              <p class="font-headline text-2xl md:text-3xl text-primary font-bold italic mb-4 leading-tight">
                "La sérénité n'est pas l'absence d'orage, mais le calme au cœur de celui-ci."
              </p>
              <p class="text-[10px] font-black tracking-[0.2em] uppercase opacity-60">PRÊT À COMMENCER ?</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer / CTA -->
      <footer class="mt-auto flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-outline-variant/15">
        <div class="flex items-center gap-6">
          <div class="flex gap-2">
            <div v-for="i in 4" :key="i" class="w-2.5 h-2.5 rounded-full transition-all duration-300" :class="currentStep === i ? 'bg-primary scale-125' : 'bg-outline-variant/40'"></div>
          </div>
          <span class="text-sm font-black text-on-surface-variant tracking-wide uppercase opacity-60">Étape {{ currentStep }} sur 4</span>
        </div>
        <div class="flex gap-4 w-full md:w-auto">
          <button @click="skipOnboarding" class="flex-1 md:flex-none px-10 py-5 rounded-full font-black text-primary hover:bg-primary/5 transition-all text-sm uppercase tracking-widest active:scale-95">
            Passer
          </button>
          <button @click="nextStep" class="flex-1 md:flex-none bg-gradient-to-br from-primary to-primary-container text-on-primary px-14 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
            {{ currentStep === 4 ? 'Terminer' : 'Suivant' }}
          </button>
        </div>
      </footer>
    </main>

    <!-- Decoration Orbs -->
    <div class="fixed -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
    <div class="fixed -top-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" style="animation-delay: 2s;"></div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const currentStep = ref(1)

const formData = reactive({
  cancer_type: '',
  doctor_name: '',
  has_allergies: null, // null until selected
  allergies_list: ''
})

const nextStep = async () => {
  if (currentStep.value < 4) {
    currentStep.value++
  } else {
    await completeOnboarding()
  }
}

const skipOnboarding = async () => {
  await completeOnboarding()
}

const completeOnboarding = async () => {
  if (user.value) {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.value.id,
          onboarding_completed: true,
          cancer_type: formData.cancer_type,
          doctor_name: formData.doctor_name,
          has_allergies: formData.has_allergies,
          allergies_list: formData.has_allergies ? formData.allergies_list : null,
          email: user.value.email,
          updated_at: new Date()
        })
      if (error) console.error('Error saving profile:', error)
    } catch (e) {
      console.error('Supabase error:', e)
    }
  }
  localStorage.setItem('onboarding_completed', 'true')
  router.push('/')
}

definePageMeta({
  layout: false
})
</script>

<style scoped>
.animate-in {
  animation: translate-y 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes translate-y {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
