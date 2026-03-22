<template>
  <div class="h-[100dvh] bg-background relative flex items-center justify-center p-4 sm:p-10 overflow-hidden font-body selection:bg-primary-fixed">
    <!-- Serene Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <!-- Login Card -->
    <div class="w-full max-w-xl animate-fade-in-up z-10">
      <div class="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-16 border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden group">
        <!-- Logo & Header -->
        <header class="text-center space-y-2 sm:space-y-4 mb-8 sm:mb-14">
          <div class="inline-flex p-4 bg-primary/10 rounded-3xl text-primary mb-2">
            <span class="material-symbols-outlined text-4xl font-bold">spa</span>
          </div>
          <h1 class="text-4xl font-black font-headline text-on-surface tracking-tight">Serenity</h1>
          <p class="text-on-surface-variant font-medium opacity-70 px-4">
            {{ isLogin ? 'Heureux de vous revoir dans votre sanctuaire.' : 'Commencez votre voyage vers plus de sérénité.' }}
          </p>
        </header>

        <!-- Social Login -->
        <div class="space-y-4">
          <button @click="loginWithGoogle" class="w-full py-4 sm:py-5 px-6 sm:px-8 bg-white border border-outline-variant/30 rounded-full flex items-center justify-center gap-3 sm:gap-4 hover:bg-surface-container-low transition-all active:scale-[0.98] group/btn shadow-sm">
            <img src="https://www.google.com/favicon.ico" class="w-5 h-5 sm:w-6 sm:h-6 grayscale group-hover/btn:grayscale-0 transition-all" />
            <span class="font-bold text-sm sm:text-base text-on-surface">Continuer avec Google</span>
          </button>
        </div>

        <div class="flex items-center gap-4 my-6 sm:my-10">
          <div class="flex-1 h-px bg-outline-variant/20"></div>
          <span class="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40">ou</span>
          <div class="flex-1 h-px bg-outline-variant/20"></div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6 sm:space-y-8">
          <div class="space-y-3 sm:space-y-4">
            <div class="relative group/input">
              <span class="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/50 group-focus-within/input:text-primary transition-colors text-lg sm:text-xl">mail</span>
              <input 
                v-model="email"
                type="email" 
                placeholder="Adresse email"
                class="w-full pl-12 pr-6 py-4 sm:pl-16 sm:pr-8 sm:py-5 bg-surface-container-low rounded-2xl sm:rounded-3xl border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold text-sm sm:text-base"
                required
              />
            </div>
            <div class="relative group/input">
              <span class="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/50 group-focus-within/input:text-primary transition-colors text-lg sm:text-xl">lock</span>
              <input 
                v-model="password"
                type="password" 
                placeholder="Mot de passe"
                class="w-full pl-12 pr-6 py-4 sm:pl-16 sm:pr-8 sm:py-5 bg-surface-container-low rounded-2xl sm:rounded-3xl border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-4 bg-error-container/20 border border-error/10 text-error rounded-2xl text-sm font-bold flex items-center gap-3">
            <span class="material-symbols-outlined text-xl">error</span>
            {{ errorMessage }}
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full py-4 sm:py-6 bg-primary text-on-primary rounded-full font-black text-[11px] sm:text-sm uppercase tracking-widest shadow-lg sm:shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:translate-y-0 transition-all relative overflow-hidden"
          >
            <span v-if="!isLoading">{{ isLogin ? 'Se Connecter' : 'Créer un Compte' }}</span>
            <span v-else class="flex items-center justify-center">
              <div class="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </span>
          </button>
        </form>

        <!-- Toggle -->
        <footer class="mt-8 sm:mt-12 text-center">
          <button @click="isLogin = !isLogin" class="text-xs sm:text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
            {{ isLogin ? 'Nouveau ici ? Créer un compte' : 'Déjà inscrit ? Se connecter' }}
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    if (isLogin.value) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
    } else {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`,
        }
      })
      if (error) throw error
      alert('Vérifiez votre email pour confirmer votre compte !')
    }
    
    // Redirect after success
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/confirm`,
        queryParams: {
          prompt: 'select_account' // Forces Google to show the account picker
        }
      }
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}

definePageMeta({
  layout: false
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
