/* =========================================================
SAWA FOOD — Partner (B2B) request form
Adds the multi-step "Choose your partnership" flow to the
#partner section, plus the scroll-reveal animation used
across the marketing sections. Self-contained (IIFE).
 ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  === */

(function() {
  'use strict';

  /* ---------- REFERENCE DATA (cities/stores by country) ---------- */
  const countryData = {
    Egypt:{
      cities:['Cairo', 'Giza', 'Alexandria'], 
      stores:[
      {name:'Sawa Partner Market', city:'Cairo', area:'Nasr City', products:['Tea', 'Ghee']}, 
      {name:'Nile Retail Partner', city:'Giza', area:'Dokki', products:['Rice', 'Ghee']}
      ]
    }, 
    'Saudi Arabia':{
      cities:['Riyadh', 'Jeddah', 'Dammam'], 
      stores:[
      {name:'Riyadh Food Partner', city:'Riyadh', area:'Olaya', products:['Tea', 'Rice']}, 
      {name:'Jeddah Retail Partner', city:'Jeddah', area:'Al Rawdah', products:['Ghee', 'Rice']}
      ]
    }, 
    UAE:{
      cities:['Dubai', 'Abu Dhabi', 'Sharjah'], 
      stores:[
      {name:'Dubai Food Partner', city:'Dubai', area:'Business Bay', products:['Tea', 'Ghee']}, 
      {name:'Abu Dhabi Retail Partner', city:'Abu Dhabi', area:'Al Zahiyah', products:['Rice', 'Tea']}
      ]
    }, 
    Jordan:{
      cities:['Amman', 'Zarqa', 'Irbid'], 
      stores:[
      {name:'Amman Food Partner', city:'Amman', area:'Sweifieh', products:['Rice', 'Tea']}, 
      {name:'Jordan Retail Partner', city:'Irbid', area:'Central', products:['Tea']}
      ]
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const FR = {
    'Choose your partnership':'Choisissez votre partenariat', 'Start with the path that matches your business.':'Commencez par le parcours qui correspond à votre activité.', 
    'Distributor':'Distributeur', 'Regional distribution partnership':'Partenariat de distribution régional', 
    'Wholesale Buyer':'Acheteur en gros', 'Bulk product purchasing':'Achat de produits en gros', 
    'Retailer':'Détaillant', 'Retail supply partnership':'Partenariat d’approvisionnement au détail', 
    'Manufacturer':'Fabricant', 'Bring your products to the network':'Intégrez vos produits au réseau', 
    'Type':'Type', 'Business':'Activité', 'Market':'Marché', 'Submit':'Envoyer', 
    'Full name':'Nom complet', 'Business email':'E-mail professionnel', 'Company':'Entreprise', 'Country':'Pays', 
    'Product interest':'Produits recherchés', 'e.g. dates, tahini, olive oil':'ex. dattes, tahini, huile d’olive', 
    'Expected volume':'Volume prévu', 'Small':'Petit', 'Medium':'Moyen', 'Large':'Grand', 
    'Tell us about your business':'Parlez-nous de votre activité', 'Continue request →':'Continuer la demande →', 
    'New partnership request — Sawa Food website':'Nouvelle demande de partenariat — site Sawa Food', 
    'Name':'Nom', 'Details':'Détails', 'Opening WhatsApp with your request — just hit send.':'Ouverture de WhatsApp avec votre demande — appuyez simplement sur Envoyer.', 'Egypt':'Égypte', 'Saudi Arabia':'Arabie saoudite', 'UAE':'Émirats arabes unis', 'Jordan':'Jordanie', 
    'Partnership type selected: ':'Type de partenariat sélectionné : ', 
    'Partnership request':'Demande de partenariat', 'Tell us how we can work together':'Dites-nous comment nous pouvons travailler ensemble', 'A short 3-step form. We only ask for what we need to start the conversation.':'Un formulaire en 3 étapes. Nous demandons uniquement les informations nécessaires pour commencer.', 'What are you looking for?':'Que recherchez-vous ?', 'Choose the option that best describes your request.':'Choisissez l’option qui décrit le mieux votre demande.', 'Continue →':'Continuer →', '← Back':'← Retour', 'Just the essentials so our team knows who to contact.':'Juste les informations essentielles pour que notre équipe sache qui contacter.', 'Where and what do you need?':'Où et de quoi avez-vous besoin ?', 'This helps us understand the opportunity before we contact you.':'Cela nous aide à comprendre votre demande avant de vous contacter.', 'Tell us about your request':'Parlez-nous de votre demande', 'Anything useful about your market, products or timing...':'Toute information utile sur votre marché, vos produits ou votre calendrier…', 'You are applying as':'Vous faites une demande en tant que', 'Send request via WhatsApp →':'Envoyer la demande via WhatsApp →'
  };
  const t = (en, ar) => document.documentElement.lang === 'ar'?ar:(document.documentElement.lang === 'fr'?(FR[en] || en):en);


  /* ---------- TOAST ---------- */
  function toast(en, ar) {
    let el = $('#v2Toast');
    if(!el) {
      el = document.createElement('div');
      el.id = 'v2Toast';
      el.className = 'v2-toast';
      document.body.appendChild(el);
    }
    el.textContent = t(en, ar);
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  /* ---------- B2B flow ---------- */
  const partnerSection = $('#partner');
  if(partnerSection) {
    const wrap = document.createElement('div');
    wrap.className = 'shell v2-b2b sawa-v2-layer';
    wrap.id = 'partnerForm';
    wrap.innerHTML = `
    <div class = "v2-b2b-head">
    <div>
    <div class = "v2-form-kicker">${t('Partnership request', 'طلب شراكة')}</div>
    <h3>${t('Tell us how we can work together', 'اخبرنا كيف يمكننا العمل معًا')}</h3>
    <p>${t('A short 3-step form. We only ask for what we need to start the conversation.', 'نموذج قصير من 3 خطوات. نسألك فقط عن المعلومات التي نحتاجها لبدء التواصل.')}</p>
    </div>
    </div>

    <div class = "v2-stepper" aria-label = "Partnership form progress">
    <div class = "v2-step active" data-step-indicator = "1"><b>1</b>${t('Type', 'النوع')}</div><i class = "v2-line"></i>
    <div class = "v2-step" data-step-indicator = "2"><b>2</b>${t('Business', 'النشاط')}</div><i class = "v2-line"></i>
    <div class = "v2-step" data-step-indicator = "3"><b>3</b>${t('Market', 'السوق')}</div>
    </div>

    <form class = "v2-b2b-form v2-wizard" id = "v2B2BForm" novalidate>
    <section class = "v2-stage active" data-stage = "1">
    <div class = "v2-stage-title">
    <span>01</span>
    <div><h4>${t('What are you looking for?', 'ما نوع الشراكة التي تبحث عنها؟')}</h4><p>${t('Choose the option that best describes your request.', 'اختر الخيار الأقرب لطلبك.')}</p></div>
    </div>
    <div class = "v2-b2b-grid v2-choice-grid">
    <button class = "v2-choice active" data-type = "Distributor" type = "button"><strong>${t('Distributor', 'موزع')}</strong><span>${t('Regional distribution partnership', 'شراكة توزيع إقليمية')}</span></button>
    <button class = "v2-choice" data-type = "Wholesale Buyer" type = "button"><strong>${t('Wholesale Buyer', 'مشتري جملة')}</strong><span>${t('Bulk product purchasing', 'شراء منتجات بكميات كبيرة')}</span></button>
    <button class = "v2-choice" data-type = "Retailer" type = "button"><strong>${t('Retailer', 'تجزئة')}</strong><span>${t('Retail supply partnership', 'شراكة توريد للتجزئة')}</span></button>
    <button class = "v2-choice" data-type = "Manufacturer" type = "button"><strong>${t('Manufacturer', 'مصنّع')}</strong><span>${t('Bring your products to the network', 'أضف منتجاتك إلى الشبكة')}</span></button>
    </div>
    <div class = "v2-wizard-actions"><button class = "btn v2-next" type = "button">${t('Continue →', 'متابعة ←')}</button></div>
    </section>

    <section class = "v2-stage" data-stage = "2" hidden>
    <div class = "v2-stage-title">
    <span>02</span>
    <div><h4>${t('Tell us about your business', 'حدثنا عن نشاطك')}</h4><p>${t('Just the essentials so our team knows who to contact.', 'فقط البيانات الأساسية حتى يعرف فريقنا من يتواصل معه.')}</p></div>
    </div>
    <div class = "v2-stage-fields">
    <div class = "v2-field"><label>${t('Full name', 'الاسم الكامل')}</label><input name = "name" autocomplete = "name" required></div>
    <div class = "v2-field"><label>${t('Business email', 'بريد العمل')}</label><input type = "email" name = "email" autocomplete = "email" required></div>
    <div class = "v2-field"><label>${t('Company', 'اسم الشركة')}</label><input name = "company" autocomplete = "organization" required></div>
    </div>
    <div class = "v2-wizard-actions"><button class = "btn light v2-back" type = "button">${t('← Back', '→ رجوع')}</button><button class = "btn v2-next" type = "button">${t('Continue →', 'متابعة ←')}</button></div>
    </section>

    <section class = "v2-stage" data-stage = "3" hidden>
    <div class = "v2-stage-title">
    <span>03</span>
    <div><h4>${t('Where and what do you need?', 'أين وما الذي تحتاجه؟')}</h4><p>${t('This helps us understand the opportunity before we contact you.', 'يساعدنا ذلك على فهم طلبك قبل التواصل معك.')}</p></div>
    </div>
    <div class = "v2-stage-fields">
    <div class = "v2-field"><label>${t('Country', 'الدولة')}</label><select name = "country">${Object.keys(countryData).map(c => `<option>${c}</option>`).join('')}</select></div>
    <div class = "v2-field"><label>${t('Product interest', 'المنتجات التي تهمك')}</label><input name = "interest" placeholder = "${t('e.g. dates, tahini, olive oil','مثال: التمور، الطحينة، زيت الزيتون')}"></div>
    <div class = "v2-field"><label>${t('Expected volume', 'الحجم المتوقع')}</label><select name = "volume"><option>${t('Small', 'صغير')}</option><option>${t('Medium', 'متوسط')}</option><option>${t('Large', 'كبير')}</option></select></div>
    <div class = "v2-field full"><label>${t('Tell us about your request', 'حدثنا عن طلبك')}</label><textarea name = "message" placeholder = "${t('Anything useful about your market, products or timing...','أي تفاصيل مفيدة عن السوق أو المنتجات أو التوقيت...')}"></textarea></div>
    </div>
    <div class = "v2-wizard-summary" id = "v2WizardSummary"></div>
    <div class = "v2-wizard-actions"><button class = "btn light v2-back" type = "button">${t('← Back', '→ رجوع')}</button><button class = "btn v2-submit" type = "submit">${t('Send request via WhatsApp →', 'إرسال الطلب عبر واتساب ←')}</button></div>
    </section>
    </form>`;
    partnerSection.parentNode.insertBefore(wrap, partnerSection.nextSibling);

    // Logical form flow: choose the partnership first, then reveal only the
    // information needed for that stage. No timed hiding while the visitor is filling it.
    const stages = $$('.v2-stage', wrap);
    const indicators = $$('[data-step-indicator]', wrap);
    let currentStep = 1;

    const renderStep = step => {
      currentStep = step;
      stages.forEach(stage => {
        const active = Number(stage.dataset.stage) === step;
        stage.hidden = !active;
        stage.classList.toggle('active', active);
      });
      indicators.forEach(ind => ind.classList.toggle('active', Number(ind.dataset.stepIndicator)<=step));
      wrap.classList.toggle('is-form-active', step>1);
      if(step === 3) {
        const type = $('.v2-choice.active', wrap)?.dataset.type || '—';
        const name = $('[name="name"]', wrap)?.value.trim() || '—';
        const company = $('[name="company"]', wrap)?.value.trim() || '—';
        const summary = $('#v2WizardSummary', wrap);
        if(summary) summary.innerHTML = `<span>${t('You are applying as','أنت تتقدم بصفتك')}</span><strong>${type}</strong><span>•</span><span>${company!=='—'?company:name}</span>`;
      }
      if(step>1) wrap.scrollIntoView({behavior:'smooth', block:'start'});
    };

    $$('.v2-choice', wrap).forEach(btn => btn.addEventListener('click', () => {
      $$('.v2-choice', wrap).forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      toast('Partnership type selected: '+btn.dataset.type, 'تم اختيار نوع الشراكة: '+btn.dataset.type);
    }));

    $$('.v2-next', wrap).forEach(btn => btn.addEventListener('click', () => {
      if(currentStep === 1) { renderStep(2); return; }
      const activeStage = $(`.v2-stage[data-stage="${currentStep}"]`, wrap);
      const required = $$('input[required]', activeStage);
      let ok = true;
      required.forEach(input => {if(!input.reportValidity()) ok = false;});
      if(ok) renderStep(3);
    }));
    $$('.v2-back', wrap).forEach(btn => btn.addEventListener('click', () => renderStep(Math.max(1, currentStep-1))));

    $('#v2B2BForm', wrap).addEventListener('submit', e => {
      e.preventDefault();
      const form = e.target;
      if(!form.checkValidity()) { form.reportValidity(); return; }
      $$('.v2-step', wrap).forEach(x => x.classList.add('active'));

      const field = n => form.querySelector(`[name="${n}"]`)?.value.trim() || '—';
      const type = $('.v2-choice.active', wrap)?.dataset.type || '—';
      const message = [
      t('New partnership request — Sawa Food website', 'طلب شراكة جديد — موقع Sawa Food'), 
      t('Type', 'النوع')+': '+type, 
      t('Name', 'الاسم')+': '+field('name'), 
      t('Business email', 'بريد العمل')+': '+field('email'), 
      t('Company', 'الشركة')+': '+field('company'), 
      t('Country', 'الدولة')+': '+field('country'), 
      t('Product interest', 'المنتجات المهتم بها')+': '+field('interest'), 
      t('Expected volume', 'الحجم المتوقع')+': '+field('volume'), 
      t('Details', 'التفاصيل')+': '+field('message')
      ].join('\\n');

      window.open('https://wa.me/'+SAWA_WHATSAPP_NUMBER+'?text='+encodeURIComponent(message), '_blank', 'noopener');
      toast('Opening WhatsApp with your request — just hit send.', 'جاري فتح واتساب برسالتك الجاهزة — يكفي تضغط إرسال.');
    });
  }

  /* ---------- Where to Buy ---------- */
  /* Replaced by the standalone Leaflet country-only map module below. */

  function refreshPartnerLanguage() {
    const wrap = $('#partnerForm');
    if(!wrap) return;
    const enToAr = {
      'Choose your partnership':'اختر نوع الشراكة', 'Start with the path that matches your business.':'ابدأ بالمسار المناسب لنشاطك التجاري.', 'Partnership request':'طلب شراكة', 'Tell us how we can work together':'اخبرنا كيف يمكننا العمل معًا', 'A short 3-step form. We only ask for what we need to start the conversation.':'نموذج قصير من 3 خطوات. نسألك فقط عن المعلومات التي نحتاجها لبدء التواصل.', 'What are you looking for?':'ما نوع الشراكة التي تبحث عنها؟', 'Choose the option that best describes your request.':'اختر الخيار الأقرب لطلبك.', 'Continue →':'متابعة ←', '← Back':'→ رجوع', 'Just the essentials so our team knows who to contact.':'فقط البيانات الأساسية حتى يعرف فريقنا من يتواصل معه.', 'Where and what do you need?':'أين وما الذي تحتاجه؟', 'This helps us understand the opportunity before we contact you.':'يساعدنا ذلك على فهم طلبك قبل التواصل معك.', 'Tell us about your request':'حدثنا عن طلبك', 'Anything useful about your market, products or timing...':'أي تفاصيل مفيدة عن السوق أو المنتجات أو التوقيت...', 'You are applying as':'أنت تتقدم بصفتك', 'Send request via WhatsApp →':'إرسال الطلب عبر واتساب ←', 
      'Distributor':'موزع', 'Regional distribution partnership':'شراكة توزيع إقليمية', 'Wholesale Buyer':'مشتري جملة', 'Bulk product purchasing':'شراء منتجات بكميات كبيرة', 
      'Retailer':'تجزئة', 'Retail supply partnership':'شراكة توريد للتجزئة', 'Manufacturer':'مصنّع', 'Bring your products to the network':'أضف منتجاتك إلى الشبكة', 
      'Type':'النوع', 'Business':'النشاط', 'Market':'السوق', 'Submit':'الإرسال', 'Partnership request':'طلب شراكة', 'Tell us how we can work together':'اخبرنا كيف يمكننا العمل معًا', 'A short 3-step form. We only ask for what we need to start the conversation.':'نموذج قصير من 3 خطوات. نسألك فقط عن المعلومات التي نحتاجها لبدء التواصل.', 'What are you looking for?':'ما نوع الشراكة التي تبحث عنها؟', 'Choose the option that best describes your request.':'اختر الخيار الأقرب لطلبك.', 'Continue →':'متابعة ←', '← Back':'→ رجوع', 'Just the essentials so our team knows who to contact.':'فقط البيانات الأساسية حتى يعرف فريقنا من يتواصل معه.', 'Where and what do you need?':'أين وما الذي تحتاجه؟', 'This helps us understand the opportunity before we contact you.':'يساعدنا ذلك على فهم طلبك قبل التواصل معك.', 'Tell us about your request':'حدثنا عن طلبك', 'Anything useful about your market, products or timing...':'أي تفاصيل مفيدة عن السوق أو المنتجات أو التوقيت...', 'You are applying as':'أنت تتقدم بصفتك', 'Send request via WhatsApp →':'إرسال الطلب عبر واتساب ←', 'Full name':'الاسم الكامل', 'Business email':'بريد العمل', 'Company':'اسم الشركة', 'Country':'الدولة', 
      'Product interest':'المنتجات التي تهمك', 'e.g. dates, tahini, olive oil':'مثال: التمور، الطحينة، زيت الزيتون', 'Expected volume':'الحجم المتوقع', 'Small':'صغير', 'Medium':'متوسط', 'Large':'كبير', 
      'Tell us about your business':'حدثنا عن نشاطك', 'Continue request →':'متابعة الطلب ←', 'Egypt':'مصر', 'Saudi Arabia':'السعودية', 'UAE':'الإمارات', 'Jordan':'الأردن'
    };
    const arToEn = Object.fromEntries(Object.entries(enToAr).map(([a, b]) => [b, a]));
    const frToEn = Object.fromEntries(Object.entries(FR).map(([a, b]) => [b, a]));
    const maps = {en:{...frToEn, ...arToEn}, ar:{...enToAr, ...frToEn}, fr:{...FR, ...arToEn}};
    const target = document.documentElement.lang || 'en';
    const map = maps[target] || maps.en;
    const walker = document.createTreeWalker(wrap, NodeFilter.SHOW_TEXT);
    let n; while(n = walker.nextNode()) {const v = n.nodeValue.trim(); if(map[v]) n.nodeValue = n.nodeValue.replace(v, map[v]);}
    wrap.querySelectorAll('input[placeholder]').forEach(el => {if(map[el.placeholder]) el.placeholder = map[el.placeholder];});
  }
  window.sawaRefreshPartnerLanguage = refreshPartnerLanguage;
  document.addEventListener('sawa:languagechange', refreshPartnerLanguage);

  /* Global helper for inline buttons */
  window.SawaV2 = {toast};

  /* ---------- restrained scroll animations ---------- */
  if('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('v2-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold:.08});
    $$('.section,.wide-cta,.why,.locator,.newsletter,.v2-b2b,.v2-stores').forEach(el => {
      el.classList.add('v2-reveal');
      obs.observe(el);
    });
  }

})();

