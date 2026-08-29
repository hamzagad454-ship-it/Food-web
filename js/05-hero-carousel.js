/* =========================================================
SAWA FOOD — Hero carousel & WhatsApp Business links
Rotates the homepage hero slides, translates their copy, 
and wires up the floating/footer WhatsApp buttons.
Self-contained (IIFE).
 ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  === */

/* ===== MERGED HERO CAROUSEL + WHATSAPP BUSINESS ===== */
(function() {
  const carousel = document.getElementById('heroCarousel');
  const slideEls = [...document.querySelectorAll('.hero-slide-content')];
  const dots = [...document.querySelectorAll('.hero-dot')];
  const progress = document.getElementById('heroProgress');
  const total = slideEls.length;
  slideEls.forEach(slide => {
    const key = slide.dataset.heroImage;
    const image = SAWA_CONFIG.images.hero[key];
    if(image) slide.style.setProperty('--hero-bg', `url(\"${image}\")`);
  });

  const DURATION = 5600;
  let index = 0, timer = null, startedAt = Date.now(), paused = false;

  const heroText = {
    ar:{
      s1eyebrow:'مختار لكل مائدة', s1title:'طعام أفضل، أقرب إليك.', s1text:'نقرّب المنتجات الغذائية الموثوقة من كل سوق، عبر شبكة توزيع وشركاء قوية في المنطقة.', s1proof:'120+', s1proofText:'علامة غذائية موثوقة', 
      s2eyebrow:'شبكة تصنيع وتوريد', s2title:'شركاء أقوياء وراء كل منتج.', s2text:'نتعاون مع مصنّعين وشركاء توريد مختارين لنضمن الجودة والاستمرارية وتوفر المنتجات.', s2proof:'∞', s2proofText:'شركاء تصنيع وتوريد', 
      s3eyebrow:'انتشار إقليمي', s3title:'من السوق المحلي إلى أسواق المنطقة.', s3text:'شبكة تغطي 5 أسواق وتربط العلامات وتجار التجزئة والموزعين في منظومة واحدة.', s3proof:'5', s3proofText:'أسواق نخدمها', 
      s4eyebrow:'شراكات تنمو معًا', s4title:'نساعد العلامات على الوصول أبعد.', s4text:'من التوزيع إلى الوصول إلى المتاجر، نبني شراكات طويلة المدى تساعد المنتجات الجيدة على النمو.', s4proof:'1,400+', s4proofText:'شريك تجزئة', 
      explore:'استكشف المنتجات ←', wholesale:'طلب جملة', s2button:'اكتشف المصنّعين ←', s3button:'شاهد أماكن البيع ←', s4button:'ابدأ الشراكة ←'
    }, 
    en:{
      s1eyebrow:'Curated for every table', s1title:'Better food, brought closer.', s1text:'We bring trusted food products closer to every market through a strong regional distribution network and trusted partners.', s1proof:'120+', s1proofText:'trusted food brands', 
      s2eyebrow:'Manufacturing & supply network', s2title:'Strong partners behind every product.', s2text:'We work with selected manufacturers and supply partners to protect quality, continuity and product availability.', s2proof:'∞', s2proofText:'manufacturing & supply partners', 
      s3eyebrow:'Regional reach', s3title:'From local markets to the region.', s3text:'A network across 5 markets connecting brands, retailers and distributors in one growing ecosystem.', s3proof:'5', s3proofText:'markets served', 
      s4eyebrow:'Partnerships that grow', s4title:'Helping brands reach further.', s4text:'From distribution to retail reach, we build long-term partnerships that help great products grow.', s4proof:'1,400+', s4proofText:'retail partners', 
      explore:'Explore products →', wholesale:'Wholesale inquiry', s2button:'Meet our manufacturers →', s3button:'Find where to buy →', s4button:'Start a partnership →'
    }, 
    fr:{
      s1eyebrow:'Sélectionné pour chaque table', s1title:'Une meilleure alimentation, plus proche de vous.', s1text:'Nous rapprochons des produits alimentaires de confiance de chaque marché grâce à un réseau régional solide et à des partenaires fiables.', s1proof:'120+', s1proofText:'marques alimentaires de confiance', 
      s2eyebrow:'Réseau de fabrication et d’approvisionnement', s2title:'Des partenaires solides derrière chaque produit.', s2text:'Nous travaillons avec des fabricants et partenaires d’approvisionnement sélectionnés pour garantir qualité, continuité et disponibilité.', s2proof:'∞', s2proofText:'partenaires de fabrication et d’approvisionnement', 
      s3eyebrow:'Présence régionale', s3title:'Des marchés locaux à toute la région.', s3text:'Un réseau présent dans 5 marchés qui relie marques, détaillants et distributeurs au sein d’un même écosystème.', s3proof:'5', s3proofText:'marchés desservis', 
      s4eyebrow:'Des partenariats qui grandissent', s4title:'Nous aidons les marques à aller plus loin.', s4text:'De la distribution à la présence en magasin, nous construisons des partenariats durables qui favorisent la croissance des bons produits.', s4proof:'1 400+', s4proofText:'partenaires de vente au détail', 
      explore:'Découvrir les produits →', wholesale:'Demande de gros', s2button:'Découvrir nos fabricants →', s3button:'Voir où acheter →', s4button:'Commencer un partenariat →'
    }
  };

  function applyHeroLanguage() {
    const lang = ['ar', 'fr'].includes(document.documentElement.lang)?document.documentElement.lang:'en';
    const dict = heroText[lang];
    document.querySelectorAll('[data-hero-key]').forEach(el => {
      const key = el.dataset.heroKey;
      if(dict[key] !== undefined) {
        if(el.classList.contains('btn')) {
          const span = el.querySelector('span');
          el.childNodes[0].nodeValue = dict[key].replace(/[←→]$/, '')+' ';
          if(span) span.textContent = lang === 'ar'?'←':'→';
        } else el.textContent = dict[key];
      }
    });
  }

  function render() {
    slideEls.forEach((el, i) => {
      el.classList.toggle('active', i === index);
      if(i === index) { const content = el.querySelector('.hero-content'); if(content) content.style.animation = 'none'; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    startedAt = Date.now();
    if(progress) {progress.style.transition = 'none';progress.style.width = '0%';requestAnimationFrame(() => {progress.style.transition = `width ${DURATION}ms linear`;progress.style.width = '100%';});}
  }
  function go(n) {index = (n+total)%total;render();}
  function start() {
    clearInterval(timer);
    if(!paused) timer = setInterval(() => go(index+1), DURATION);
    if(progress) {startedAt = Date.now();progress.style.transition = `width ${DURATION}ms linear`;progress.style.width = '100%';}
  }
  function pause() {paused = true;clearInterval(timer);if(progress) {const pct = Math.min(100, ((Date.now()-startedAt)/DURATION)*100);progress.style.transition = 'none';progress.style.width = pct+'%';}}
  function resume() {paused = false;start();}

  document.getElementById('heroNext')?.addEventListener('click', () => {go(index+1);start()});
  document.getElementById('heroPrev')?.addEventListener('click', () => {go(index-1);start()});
  dots.forEach((d, i) => d.addEventListener('click', () => {go(i);start()}));

  applyHeroLanguage();
  document.addEventListener('sawa:languagechange', applyHeroLanguage);
  render();start();

  window.addEventListener('scroll', () => document.querySelector('.nav')?.classList.toggle('is-scrolled', window.scrollY>10), {passive:true});
  document.querySelector('.nav')?.classList.toggle('is-scrolled', window.scrollY>10);
  const waMessages = {
    waFloat:'مرحباً Sawa Food، أريد التواصل مع فريقكم.', 
    waFooter:'مرحباً Sawa Food، أريد التواصل مع فريقكم.', 
    waPartner:'مرحباً Sawa Food، أريد الاستفسار عن الانضمام كموزع.'
  };
  Object.keys(waMessages).forEach(id => {
    const el = document.getElementById(id);
    if(el) el.href = 'https://wa.me/'+SAWA_WHATSAPP_NUMBER+'?text='+encodeURIComponent(waMessages[id]);
  });
})();
