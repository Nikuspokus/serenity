<template>
  <div class="space-y-12 lg:space-y-16">
    <!-- Welcome Hero Section -->
    <header class="space-y-6 max-w-3xl">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-secondary-container rounded-2xl shadow-sm">
          <span class="material-symbols-outlined text-on-secondary-container text-4xl">auto_awesome</span>
        </div>
        <h1 class="font-headline text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">Bien-être & Soins</h1>
      </div>
      <p class="text-on-surface-variant text-lg lg:text-xl font-medium opacity-80 leading-relaxed">
        Prenez soin de vous avec des conseils adaptés et une nutrition douce pensée pour votre confort quotidien tout au long de votre parcours.
      </p>
    </header>

    <!-- Dermo-cosmétique Section -->
    <section class="space-y-10">
      <div class="flex items-center justify-between px-2">
        <div class="space-y-1">
          <span class="text-primary font-bold tracking-[0.2em] text-[10px] uppercase opacity-60">SOINS DU CORPS</span>
          <h2 class="font-headline text-2xl lg:text-3xl font-bold tracking-tight">Dermo-cosmétique</h2>
        </div>
      </div>

      <!-- Bento Grid for Symptoms -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Card: Ongles fragiles -->
        <article class="group bg-surface-container-lowest p-8 lg:p-10 rounded-[2.5rem] transition-all hover:bg-surface-bright border border-outline-variant/10 shadow-sm hover:shadow-xl hover:-translate-y-1">
          <div class="w-16 h-16 rounded-3xl bg-secondary-container flex items-center justify-center mb-8 shadow-inner group-hover:rotate-6 transition-transform">
            <span class="material-symbols-outlined text-on-secondary-container text-3xl">pan_tool</span>
          </div>
          <h4 class="font-headline text-2xl font-bold mb-4 text-on-surface">Ongles fragiles</h4>
          <p class="text-on-surface-variant text-base mb-8 leading-relaxed font-medium opacity-80">Protection et renforcement à l'aide de vernis au silicium et huiles nourrissantes spécifiques.</p>
          <button class="flex items-center gap-3 text-primary font-extrabold text-sm tracking-widest group/btn">
            VOIR LES CONSEILS
            <span class="material-symbols-outlined text-sm group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
          </button>
        </article>

        <!-- Card: Peau sèche (Highlight Card) -->
        <article class="group bg-[#005da9] text-on-primary p-8 lg:p-10 rounded-[2.5rem] transition-all shadow-2xl shadow-primary/20 hover:-translate-y-1 border border-white/10 relative overflow-hidden">
          <div class="relative z-10">
            <div class="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-white text-3xl">water_drop</span>
            </div>
            <h4 class="font-headline text-2xl font-bold mb-4">Peau très sèche</h4>
            <p class="text-blue-100 text-base mb-8 leading-relaxed font-medium">Restaurez votre barrière cutanée avec des baumes émollients sans parfum hautement nutritifs.</p>
            <button class="flex items-center gap-3 text-white font-extrabold text-sm tracking-widest group/btn">
              RECOMMANDATIONS
              <span class="material-symbols-outlined text-sm group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
            </button>
          </div>
          <!-- Decorative circle -->
          <div class="absolute -right-16 -top-16 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
        </article>

        <!-- Card: Cuir chevelu -->
        <article class="group bg-surface-container-lowest p-8 lg:p-10 rounded-[2.5rem] transition-all hover:bg-surface-bright border border-outline-variant/10 shadow-sm hover:shadow-xl hover:-translate-y-1">
          <div class="w-16 h-16 rounded-3xl bg-tertiary-fixed flex items-center justify-center mb-8 shadow-inner group-hover:rotate-6 transition-transform">
            <span class="material-symbols-outlined text-on-tertiary-fixed text-3xl">face_6</span>
          </div>
          <h4 class="font-headline text-2xl font-bold mb-4 text-on-surface">Cuir chevelu</h4>
          <p class="text-on-surface-variant text-base mb-8 leading-relaxed font-medium opacity-80">Shampoings ultra-doux et soins apaisants pour prévenir les irritations et démangeaisons.</p>
          <button class="flex items-center gap-3 text-primary font-extrabold text-sm tracking-widest group/btn">
            CONSULTER LA FICHE
            <span class="material-symbols-outlined text-sm group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
          </button>
        </article>
      </div>
    </section>

    <!-- Nutrition & Recettes Section -->
    <section class="space-y-10 pb-20">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div class="space-y-1">
          <span class="text-secondary font-bold tracking-[0.2em] text-[10px] uppercase opacity-60">ALIMENTATION DOUCE</span>
          <h2 class="font-headline text-2xl lg:text-3xl font-bold tracking-tight">Nutrition & Recettes</h2>
        </div>
        <!-- Search Bar -->
        <div class="relative w-full md:w-96 group">
          <div class="absolute inset-y-0 left-6 flex items-center pointer-events-none text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
            <span class="material-symbols-outlined" style="font-variation-settings: 'opsz' 20;">search</span>
          </div>
          <input 
            class="w-full bg-surface-container-high/50 border-none rounded-2xl py-5 pl-16 pr-8 focus:ring-4 focus:ring-primary/10 text-sm font-medium placeholder:text-on-surface-variant/40 transition-all shadow-inner" 
            placeholder="Rechercher par symptôme (ex: nausées)" 
            type="text"
          />
        </div>
      </div>

      <!-- Recipe Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <!-- Recipe Card 1 -->
        <div class="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden flex flex-col sm:flex-row items-stretch border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all group">
          <div class="w-full sm:w-56 h-56 sm:h-auto shrink-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkydCh4uEfQWkNa75kGX5z4dIgEjlEjNVgwGqfc-bm_I54KsIuU0JLxCNmvX-zJQDS0Rp2NzBmCeznQgktbXnHrZtK1t_IKYJ8Sf5Mu7Mam-p5sMqzaj-D7H5kJAD6v8AfMZQhtCc83u1mh3a1Xvp5c3w_70-BqoMY9juBDLGbFrYb-uM2tDPgaZULBcKXq5k4iCV3rWFk28Z0Fl9RajZjze9WiMyRhhd02WRVYSrn59Jjbts9_IzLWKULL9JRShIc2JDWqygNFtY')"></div>
          <div class="p-8 flex flex-col justify-between flex-1">
            <div class="space-y-4">
              <div class="flex gap-2">
                <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-extrabold uppercase tracking-widest">Froid</span>
                <span class="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-extrabold uppercase tracking-widest">Sans odeur</span>
              </div>
              <h5 class="font-headline text-xl font-bold text-on-surface leading-tight">Salade de Quinoa au Basilic</h5>
              <p class="text-on-surface-variant text-sm font-medium leading-relaxed opacity-80 line-clamp-2">Riche en protéines et calories, cette recette froide minimise les nausées liées aux odeurs de cuisson.</p>
            </div>
            <div class="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.2em] text-on-surface-variant/50 mt-8">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>15 MIN</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">bolt</span>
                <span>450 KCAL</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recipe Card 2 -->
        <div class="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden flex flex-col sm:flex-row items-stretch border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all group">
          <div class="w-full sm:w-56 h-56 sm:h-auto shrink-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBf9hUv_td7gPXI6qGtSUr7u-kYc0TW_yWSkpif6koK8cxC1f2peTuM9wJrCDP43saMipFccGvdBHGkVjhJKhD2FhwhZbAaTwmgbMZunbNnXO9f_dDYIZddxMVXT6sbcD3SxWd9W5YWg44A2ZnipE1yEdWd1DhDkV9qRCkUv4JDPen6N53zAvd1W0AoaNS2Z-VBF5IPVeJoSxiKzJiddfjoFujbU3xvKE-GstVaePX8ZDoS5p7FfKsi0e-6UHdWOIQYc35ckQElJZM')"></div>
          <div class="p-8 flex flex-col justify-between flex-1">
            <div class="space-y-4">
              <div class="flex gap-2">
                <span class="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-extrabold uppercase tracking-widest">Énergétique</span>
                <span class="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-extrabold uppercase tracking-widest">Onctueux</span>
              </div>
              <h5 class="font-headline text-xl font-bold text-on-surface leading-tight">Smoothie Avocat-Banane</h5>
              <p class="text-on-surface-variant text-sm font-medium leading-relaxed opacity-80 line-clamp-2">Une texture douce et apaisante pour le système digestif, apportant des bonnes graisses essentielles.</p>
            </div>
            <div class="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[0.2em] text-on-surface-variant/50 mt-8">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>5 MIN</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">bolt</span>
                <span>520 KCAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tip Banner -->
      <div class="bg-secondary-fixed/10 rounded-[2rem] p-8 lg:p-10 flex flex-col md:flex-row items-center gap-8 border border-secondary-container/10">
        <div class="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-secondary text-4xl animate-pulse">lightbulb</span>
        </div>
        <div class="text-center md:text-left space-y-2">
          <h6 class="font-headline font-extrabold text-secondary text-xl">Le saviez-vous ?</h6>
          <p class="text-on-secondary-container text-lg font-medium leading-relaxed opacity-80 max-w-2xl">
            Manger des plats froids permet de limiter les odeurs fortes d'aliments, diminuant ainsi les risques de nausées durant vos cycles de traitement.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
