<template>
  <div class="space-y-10 lg:space-y-16">
    <!-- Hero Section & Search -->
    <header class="space-y-8 max-w-4xl">
      <div class="space-y-4">
        <h1 class="font-headline font-extrabold text-4xl lg:text-5xl text-on-surface tracking-tight leading-tight">Répertoire de Proximité</h1>
        <p class="text-on-surface-variant text-lg lg:text-xl font-medium opacity-80 leading-relaxed max-w-2xl">
          Trouvez instantanément les services essentiels autour de vous, adaptés à votre parcours de soin et à votre mobilité.
        </p>
      </div>
      
      <!-- Location Bar -->
      <div class="relative group">
        <div class="absolute left-6 inset-y-0 flex items-center text-primary group-focus-within:scale-110 transition-transform">
          <span class="material-symbols-outlined text-2xl">near_me</span>
        </div>
        <input 
          class="w-full bg-surface-container-high/50 border-none rounded-[1.5rem] py-6 pl-16 pr-8 focus:ring-4 focus:ring-primary/10 text-base font-bold placeholder:text-on-surface-variant/40 shadow-inner transition-all" 
          placeholder="Ma position actuelle : 12 Avenue des Champs-Élysées, Paris" 
          type="text"
        />
      </div>
    </header>

    <!-- Category Grid -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <CategoryButton icon="medication" label="Pharmacies" color="bg-secondary-container text-on-secondary-container" />
      <CategoryButton icon="local_taxi" label="Taxis Conventionnés" color="bg-primary-container text-on-primary-container" />
      <CategoryButton icon="oncology" label="Centres de Soins" color="bg-tertiary-container text-on-tertiary-container" />
      <CategoryButton icon="more_horiz" label="Autres Services" color="bg-surface-container-highest text-on-surface-variant" />
    </section>

    <!-- Map & List Bento Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[700px]">
      <!-- Interactive Map (Placeholder Image with overlays) -->
      <div class="lg:col-span-8 relative overflow-hidden rounded-[3rem] bg-surface-container shadow-2xl border border-outline-variant/10 group">
        <img 
          class="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_iqVEMyAXiNgQn1_6TUQ4Pda8ebouFpCOh22q2AOc7B7OEal64l5N3EHBt-WL7b0yGgBAG5kLwS56ZLBsMEthQrGN7wPYFv4zc6UEdpZgtF-miTy3xfzKU67SnZ8vkLAaXOVpNFaeC4MhGzvc2pzIDQ9XRQWbJBPWka_FKX6kQaWranmxenB2TEbpauQmJr8yaEEwl5m5iXMIoLa1nK-B2Ft3R_4l3GY6kiq7EprkvMRvKzZgjdGIq3XNUTNCXEpSDbmX_fLs5xA"
          alt="Map showing medical locations"
        />
        <!-- Map Controls -->
        <div class="absolute bottom-10 right-10 flex flex-col gap-4">
          <MapAction icon="my_location" />
          <MapAction icon="add" />
          <MapAction icon="remove" />
        </div>
        <!-- Markers -->
        <div class="absolute top-[40%] left-[30%] animate-bounce">
          <div class="bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/40 border-4 border-white">
            <span class="material-symbols-outlined text-xl">emergency</span>
          </div>
        </div>
        <div class="absolute top-[60%] left-[70%]">
          <div class="bg-secondary text-white p-4 rounded-full shadow-2xl shadow-secondary/40 border-4 border-white">
            <span class="material-symbols-outlined text-xl">medication</span>
          </div>
        </div>
      </div>

      <!-- Scrollable Service List -->
      <div class="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar lg:pb-10">
        <div class="px-2 flex items-center justify-between">
          <h3 class="font-headline font-extrabold text-xl text-on-surface">À proximité</h3>
          <span class="text-[10px] font-black text-primary uppercase tracking-[0.2em]">6 RÉSULTATS</span>
        </div>
        
        <ServiceCard 
          title="Pharmacie de Garde" 
          sub="Ouvert 24h/24" 
          dist="450m" 
          addr="12 Rue de Rivoli" 
          icon="medication" 
          color="border-secondary" 
          iconBg="bg-secondary-container text-on-secondary-container"
        />

        <ServiceCard 
          title="Taxi Bleu Conventionné" 
          sub="Transport Médical" 
          dist="1.2km" 
          addr="Disponible immédiatement" 
          icon="local_taxi" 
          color="border-primary" 
          iconBg="bg-primary-container text-on-primary-container"
          primaryBtn="Réserver"
        />

        <ServiceCard 
          title="Institut Médical" 
          sub="Urgences Oncologiques" 
          dist="3.1km" 
          addr="Plateau technique complet" 
          icon="medical_services" 
          color="border-tertiary" 
          iconBg="bg-tertiary-container text-on-tertiary-container"
          primaryBtn="Fiche Centre"
        />
      </div>
    </div>
  </div>
</template>
