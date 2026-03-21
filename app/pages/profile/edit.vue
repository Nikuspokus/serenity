<template>
  <div class="space-y-10 lg:space-y-14 pb-20">
    <!-- Header -->
    <header class="flex flex-col gap-6 max-w-4xl">
      <div class="flex items-center gap-4">
        <NuxtLink to="/profile" class="p-2 hover:bg-surface-container-high rounded-full transition-colors">
          <span class="material-symbols-outlined text-primary text-3xl">arrow_back</span>
        </NuxtLink>
        <h1 class="text-4xl lg:text-5xl font-extrabold font-headline text-on-surface tracking-tight leading-tight">Modifier Profil</h1>
      </div>
    </header>

    <main class="bg-white rounded-[3rem] p-10 lg:p-14 border border-outline-variant/10 shadow-sm space-y-12">
      <ProfileForm @saved="onSaved" @cancel="onCancel" />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ProfileForm from '~/components/ProfileForm.vue'

const router = useRouter()

const onSaved = () => {
  router.push('/profile')
}

const onCancel = () => {
  router.push('/profile')
}
</script>
