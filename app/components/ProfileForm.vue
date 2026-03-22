<template>
  <div class="space-y-8 sm:space-y-12">
    <!-- Profile Picture Edit -->
    <section class="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
      <div class="relative group cursor-pointer bg-surface-container rounded-full w-24 h-24 sm:w-32 sm:h-32 overflow-hidden flex items-center justify-center">
        <img v-if="form.avatar_url" :src="form.avatar_url" class="w-full h-full object-cover border-4 border-primary-fixed shadow-md" />
        <span v-else class="material-symbols-outlined text-primary/20 text-5xl sm:text-6xl">person</span>
        <div class="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="material-symbols-outlined text-white text-2xl sm:text-3xl">photo_camera</span>
        </div>
      </div>
      <div class="text-center sm:text-left space-y-1 sm:space-y-2">
        <p class="font-bold text-on-surface text-sm sm:text-base">Photo de profil</p>
        <p class="text-[10px] sm:text-xs text-on-surface-variant font-medium">Synchronisée avec Google.</p>
      </div>
    </section>

    <div class="space-y-10 sm:space-y-14">
      <!-- Section 1: Identité & Biométrie -->
      <section class="space-y-4 sm:space-y-6">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-black font-headline text-primary border-b border-outline-variant/10 pb-3 sm:pb-4 flex items-center gap-2 sm:gap-3">
          <span class="material-symbols-outlined text-2xl sm:text-3xl">fingerprint</span> Identité & Biométrie
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div class="space-y-2 sm:space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Prénom et Nom *</label>
            <input v-model="form.full_name" type="text" class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold text-sm sm:text-base" />
          </div>
          <div class="space-y-2 sm:space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Email *</label>
            <input v-model="form.email" type="email" disabled class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold opacity-50 cursor-not-allowed text-sm sm:text-base" />
          </div>
          <div class="space-y-2 sm:space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Date de naissance</label>
            <div class="relative">
              <input v-model="form.dob" type="date" class="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-bold text-on-surface date-input-sexy text-sm sm:text-base" />
              <span class="material-symbols-outlined absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-primary/70 pointer-events-none text-lg sm:text-xl">calendar_month</span>
            </div>
          </div>
          <div class="space-y-2 sm:space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Sexe biologique</label>
            <select v-model="form.sex" class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold appearance-none text-sm sm:text-base">
              <option value="">Sélectionner</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Poids (kg)</label>
            <input v-model="form.weight" type="number" step="0.1" placeholder="Ex: 65.5" class="w-full px-6 py-4 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Taille (cm)</label>
            <input v-model="form.height" type="number" placeholder="Ex: 170" class="w-full px-6 py-4 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold" />
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Groupe Sanguin</label>
            <select v-model="form.blood_type" class="w-full px-6 py-4 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-primary focus:bg-white focus:outline-none transition-all font-semibold appearance-none">
              <option value="">Optionnel</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Avez-vous des allergies ?</label>
            <div class="flex gap-4">
              <button @click="form.has_allergies = true" :class="form.has_allergies ? 'bg-error text-on-error shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'" class="flex-1 py-4 rounded-3xl font-black transition-all">OUI</button>
              <button @click="form.has_allergies = false" :class="!form.has_allergies ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'" class="flex-1 py-4 rounded-3xl font-black transition-all">NON</button>
            </div>
          </div>
          <div v-if="form.has_allergies" class="space-y-3 md:col-span-2 animate-in fade-in zoom-in duration-300">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-error ml-2">Précisez vos allergies *</label>
            <textarea v-model="form.allergies_list" rows="2" placeholder="Ex: Pénicilline, arachides..." class="w-full px-6 py-4 rounded-3xl bg-error/5 text-error border border-error/20 focus:border-error focus:bg-white focus:outline-none transition-all font-semibold resize-none"></textarea>
          </div>
        </div>
      </section>

      <!-- Section 2: Parcours Oncologique -->
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-black font-headline text-secondary border-b border-outline-variant/10 pb-4 flex items-center gap-3">
          <span class="material-symbols-outlined text-3xl">medical_information</span> Parcours de Soin
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3 md:col-span-2">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Type de pathologie (Cancer)</label>
            <input v-model="form.cancer_type" type="text" placeholder="Ex: Sein, Poumon, Prostate..." class="w-full px-6 py-4 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-secondary focus:bg-white focus:outline-none transition-all font-semibold" />
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Stade (Optionnel)</label>
            <input v-model="form.cancer_stage" type="text" placeholder="Ex: Stade 2" class="w-full px-6 py-4 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-secondary focus:bg-white focus:outline-none transition-all font-semibold" />
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Médecin Traitant (Nom)</label>
            <input v-model="form.doctor_name" type="text" placeholder="Dr. Dupont" class="w-full px-6 py-4 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-secondary focus:bg-white focus:outline-none transition-all font-semibold" />
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Oncologue Référent (Nom)</label>
            <input v-model="form.oncologist_name" type="text" placeholder="Dr. Martin" class="w-full px-6 py-4 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-secondary focus:bg-white focus:outline-none transition-all font-semibold" />
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-on-surface-variant/70 ml-2">Hôpital / Centre de Soin</label>
            <input v-model="form.oncologist_hospital" type="text" placeholder="Hôpital Saint-Louis" class="w-full px-6 py-4 rounded-3xl bg-surface-container-low border border-outline-variant/10 focus:border-secondary focus:bg-white focus:outline-none transition-all font-semibold" />
          </div>
        </div>
      </section>

      <!-- Section 3: Urgences -->
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-black font-headline text-error border-b border-outline-variant/10 pb-4 flex items-center gap-3">
          <span class="material-symbols-outlined text-3xl">emergency</span> Contacts d'Urgence
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-error/5 rounded-[2.5rem] border border-error/10">
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-error/70 ml-2">Contact Prioritaire (Nom)</label>
            <input v-model="form.emergency_contact_1_name" type="text" placeholder="Ex: Marie Dupont" class="w-full px-6 py-4 rounded-3xl bg-white border border-error/20 focus:border-error focus:outline-none transition-all font-semibold" />
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-error/70 ml-2">Téléphone Prioritaire</label>
            <input v-model="form.emergency_contact_1_phone" type="tel" placeholder="06 12 34 56 78" class="w-full px-6 py-4 rounded-3xl bg-white border border-error/20 focus:border-error focus:outline-none transition-all font-semibold" />
          </div>
          <div class="space-y-3">
            <label class="block text-[10px] md:text-xs font-black uppercase tracking-widest text-error/70 ml-2">Relation (Optionnel)</label>
            <input v-model="form.emergency_contact_1_relation" type="text" placeholder="Ex: Conjoint(e)" class="w-full px-6 py-4 rounded-3xl bg-white border border-error/20 focus:border-error focus:outline-none transition-all font-semibold" />
          </div>
        </div>
      </section>
    </div>

    <!-- Alert Messages -->
    <div v-if="errorMessage" class="p-6 bg-error/10 text-error rounded-[2rem] border border-error/20 flex flex-col gap-2 animate-in fade-in zoom-in duration-300">
      <div class="flex items-center gap-3 font-black text-lg">
        <span class="material-symbols-outlined text-2xl">error</span>
        Informations manquantes
      </div>
      <p class="text-sm font-semibold opacity-90 ml-9">{{ errorMessage }}</p>
    </div>

    <div v-if="successMessage" class="p-6 bg-[#effaf6] text-secondary rounded-[2rem] border border-secondary/20 flex flex-col gap-2 animate-in fade-in zoom-in duration-300">
      <div class="flex items-center gap-3 font-black text-lg">
        <span class="material-symbols-outlined text-2xl">check_circle</span>
        {{ completionPercentage === 100 ? 'Dossier complet !' : 'Dossier sauvegardé' }}
      </div>
      <p class="text-sm font-semibold opacity-90 ml-9">{{ successMessage }}</p>
    </div>

    <div class="mt-8 pt-10 border-t border-outline-variant/10 flex flex-col md:flex-row gap-4 justify-end">
      <button v-if="showCancel" @click="$emit('cancel')" class="px-12 py-5 rounded-full font-black text-on-surface-variant hover:bg-surface-container transition-all text-sm uppercase tracking-widest text-center">
        {{ cancelText }}
      </button>
      <button @click="saveProfile" :disabled="loading" class="px-14 py-5 bg-primary text-on-primary rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2">
        <span v-if="loading" class="material-symbols-outlined animate-spin text-xl">progress_activity</span>
        {{ saveText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const props = defineProps({
  showCancel: { type: Boolean, default: true },
  cancelText: { type: String, default: 'Annuler' },
  saveText: { type: String, default: 'Enregistrer' }
})

const emit = defineEmits(['saved', 'cancel'])

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const completionPercentage = ref(0)

const form = reactive({
  full_name: '',
  email: '',
  avatar_url: '',
  dob: '',
  sex: '',
  weight: null,
  height: null,
  blood_type: '',
  has_allergies: false,
  allergies_list: '',
  cancer_type: '',
  cancer_stage: '',
  doctor_name: '',
  oncologist_name: '',
  oncologist_hospital: '',
  emergency_contact_1_name: '',
  emergency_contact_1_phone: '',
  emergency_contact_1_relation: ''
})

onMounted(async () => {
  if (user.value) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .maybeSingle()
    if (data) {
      form.full_name = data.full_name
      form.email = data.email
      form.avatar_url = data.avatar_url
      form.dob = data.dob || ''
      form.sex = data.sex || ''
      form.weight = data.weight || null
      form.height = data.height || null
      form.blood_type = data.blood_type || ''
      form.has_allergies = data.has_allergies || false
      form.allergies_list = data.allergies_list || ''
      form.cancer_type = data.cancer_type || ''
      form.cancer_stage = data.cancer_stage || ''
      form.doctor_name = data.doctor_name || ''
      form.oncologist_name = data.oncologist_name || ''
      form.oncologist_hospital = data.oncologist_hospital || ''
      form.emergency_contact_1_name = data.emergency_contact_1_name || ''
      form.emergency_contact_1_phone = data.emergency_contact_1_phone || ''
      form.emergency_contact_1_relation = data.emergency_contact_1_relation || ''
    } else {
      form.full_name = user.value.user_metadata?.full_name || ''
      form.email = user.value.email
      form.avatar_url = user.value.user_metadata?.avatar_url || user.value.user_metadata?.picture || ''
    }
  }
})

const saveProfile = async () => {
  if (user.value) {
    errorMessage.value = ''
    successMessage.value = ''
    
    // Frontend Validation
    if (!form.full_name || form.full_name.trim() === '') {
      errorMessage.value = "Le prénom et nom sont obligatoires pour créer votre dossier médical."
      return
    }
    if (form.has_allergies === true && (!form.allergies_list || form.allergies_list.trim() === '')) {
      errorMessage.value = "Vous avez indiqué avoir des allergies. Merci de les préciser dans le champ correspondant."
      return
    }
    
    loading.value = true
    
    // Check completion level
    const fields = ['full_name', 'dob', 'sex', 'weight', 'height', 'blood_type', 'cancer_type', 'doctor_name', 'emergency_contact_1_name']
    let filled = 0
    for (const f of fields) {
      if (form[f] && form[f] !== '') filled++
    }
    if (form.has_allergies === true || form.has_allergies === false) filled++
    const completion = Math.round((filled / (fields.length + 1)) * 100)
    completionPercentage.value = completion

    // Safe parsing for numeric values
    const safeWeight = form.weight && form.weight !== '' ? parseFloat(form.weight) : null
    const safeHeight = form.height && form.height !== '' ? parseFloat(form.height) : null

    const { error } = await supabase.from('profiles').upsert({
      id: user.value.id,
      full_name: form.full_name,
      email: form.email,
      avatar_url: form.avatar_url,
      dob: form.dob || null,
      sex: form.sex || null,
      weight: safeWeight,
      height: safeHeight,
      blood_type: form.blood_type || null,
      has_allergies: form.has_allergies,
      allergies_list: form.has_allergies ? form.allergies_list : null,
      cancer_type: form.cancer_type || null,
      cancer_stage: form.cancer_stage || null,
      doctor_name: form.doctor_name || null,
      oncologist_name: form.oncologist_name || null,
      oncologist_hospital: form.oncologist_hospital || null,
      emergency_contact_1_name: form.emergency_contact_1_name || null,
      emergency_contact_1_phone: form.emergency_contact_1_phone || null,
      emergency_contact_1_relation: form.emergency_contact_1_relation || null,
      updated_at: new Date()
    })
    
    loading.value = false
    
    if (error) {
      console.error('Supabase Error:', error)
      errorMessage.value = "Une erreur technique est survenue lors de l'enregistrement de votre profil. Veuillez vérifier vos connexions."
      return
    }
    
    if (completion < 100) {
      successMessage.value = "Informations enregistrées avec succès. Attention : votre profil n'est rempli qu'à " + completion + "%. Pensez à le compléter plus tard."
    } else {
      successMessage.value = "Parfait ! Votre dossier médical est parfaitement complet et sécurisé."
    }
    
    // Wait for the user to read the success message before closing modal
    setTimeout(() => {
      emit('saved')
    }, 2500)
  }
}
</script>

<style scoped>
.date-input-sexy::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  color: transparent;
  background: transparent;
  cursor: pointer;
  opacity: 0;
}
</style>
