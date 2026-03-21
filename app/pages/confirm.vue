<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="text-center space-y-6">
      <div class="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
      <p class="font-bold text-on-surface-variant animate-pulse">{{ statusMessage }}</p>
      <button @click="router.push('/')" class="text-xs text-primary underline opacity-50 block mx-auto pt-4">Si vous êtes bloqué, cliquez ici</button>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const statusMessage = ref('Confirmation de votre identité...')

// Safety timeout: if we are still here after 10s, something is wrong
onMounted(() => {
  setTimeout(() => {
    if (window.location.pathname === '/confirm') {
      console.warn('Auth confirmation timed out. Redirecting to home.')
      router.push('/')
    }
  }, 10000)

  // Explicit check for session in case watch doesn't fire
  checkSession()
})

const checkSession = async () => {
  const { data } = await supabase.auth.getSession()
  if (data?.session?.user) {
    handleUser(data.session.user)
  }
}

const handleUser = async (newUser) => {
  statusMessage.value = 'Synchronisation de votre profil...'
  try {
    const { error } = await supabase.from('profiles').upsert({
      id: newUser.id,
      full_name: newUser.user_metadata?.full_name || newUser.user_metadata?.name || '',
      avatar_url: newUser.user_metadata?.avatar_url || newUser.user_metadata?.picture || '',
      email: newUser.email,
      updated_at: new Date()
    })
    if (error) console.error('Sync error:', error)
  } catch (e) {
    console.error('Sync exception:', e)
  } finally {
    router.push('/')
  }
}

// Watch for the user to be available
watch(user, (newUser) => {
  if (newUser) handleUser(newUser)
}, { immediate: true })

// Also listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    handleUser(session.user)
  }
})

definePageMeta({
  layout: false
})
</script>
