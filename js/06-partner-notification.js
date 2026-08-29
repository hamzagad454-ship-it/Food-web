/* =========================================================
Sawa Food — Partnership notification
- Tiny persistent icon beside the theme switch
- First popup ~2 seconds after page load
- First popup 2 seconds after page load, then every 15 seconds
- Short visual progress bar + notification sound
- Click sends the visitor to the partnership form
 ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  === */
(function() {
  'use strict';

  /* ---------- COPY / TRANSLATIONS ---------- */
  const labels = {
    en:{tip:'Partnership opportunities', kicker:'Partnership', title:'Let’s work together', text:'Looking for distribution, retail or wholesale opportunities?', action:'Open partnership form →'}, 
    ar:{tip:'فرص الشراكة', kicker:'شراكة معنا', title:'خلّينا نشتغل معًا', text:'بتدور على توزيع أو تجزئة أو شراء بالجملة؟', action:'افتح نموذج الشراكة ←'}, 
    fr:{tip:'Opportunités de partenariat', kicker:'Partenariat', title:'Travaillons ensemble', text:'Vous cherchez une opportunité de distribution, de vente ou de gros ?', action:'Ouvrir le formulaire →'}
  };

  const iconHtml = `<div class="partner-notify-wrap" id="partnerNotifyWrap">
  <button class = "partner-notify-btn" id = "partnerNotifyBtn" type = "button" aria-label = "Partnership opportunities" aria-expanded = "false" title = "">
  <span class = "partner-notify-icon" aria-hidden = "true"><img src = "img/partnership.png" alt = ""></span><i class = "partner-notify-dot" aria-hidden = "true"></i>
  </button>
  <span class = "partner-notify-tooltip" id = "partnerNotifyTooltip" role = "tooltip"></span>
  </div>`;

  const actions = document.querySelector('.nav .actions');
  const themeBtn = document.getElementById('themeBtn');
  if(!actions || !themeBtn) return;

  themeBtn.insertAdjacentHTML('beforebegin', iconHtml);

  const popup = document.createElement('aside');
  popup.className = 'partner-notify-popup';
  popup.id = 'partnerNotifyPopup';
  popup.setAttribute('role', 'status');
  popup.setAttribute('aria-live', 'polite');
  popup.innerHTML = `<div class="partner-notify-main">
  <div class = "partner-notify-symbol" aria-hidden = "true"><img src = "img/partnership.png" alt = ""></div>
  <div class = "partner-notify-copy">
  <div class = "partner-notify-kicker" id = "partnerNotifyKicker"></div>
  <h3 class = "partner-notify-title" id = "partnerNotifyTitle"></h3>
  <p class = "partner-notify-text" id = "partnerNotifyText"></p>
  </div>
  <button class = "partner-notify-close" id = "partnerNotifyClose" type = "button" aria-label = "Close">×</button>
  </div><div class = "partner-notify-progress" aria-hidden = "true"><span id = "partnerNotifyProgress"></span></div>
  <div class = "partner-notify-action" id = "partnerNotifyAction"></div>`;
  document.body.appendChild(popup);

  const btn = document.getElementById('partnerNotifyBtn');
  const tooltip = document.getElementById('partnerNotifyTooltip');
  const closeBtn = document.getElementById('partnerNotifyClose');
  const action = document.getElementById('partnerNotifyAction');
  const kicker = document.getElementById('partnerNotifyKicker');
  const title = document.getElementById('partnerNotifyTitle');
  const text = document.getElementById('partnerNotifyText');
  const progress = document.getElementById('partnerNotifyProgress');

  let openTimer = null;
  let hideTimer = null;
  let audioCtx = null;
  let hasUserInteracted = false;


  /* ---------- RENDER ---------- */
  function getLang() {
    const lang = document.documentElement.lang || 'en';
    return labels[lang]?lang:'en';
  }

  function renderText() {
    const l = labels[getLang()];
    tooltip.textContent = l.tip;
    btn.setAttribute('aria-label', l.tip);
    kicker.textContent = l.kicker;
    title.textContent = l.title;
    text.textContent = l.text;
    action.textContent = l.action;
  }


  /* ---------- SOUND ---------- */
  function unlockAudio() {
    hasUserInteracted = true;
    try{
      if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if(audioCtx.state === 'suspended') audioCtx.resume();
    }catch(e) {}
  }

  function playChime() {
    if(!hasUserInteracted) return;
    try{
      if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if(audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;
      const master = audioCtx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.26, now+0.025);
      master.gain.exponentialRampToValueAtTime(0.0001, now+0.72);
      master.connect(audioCtx.destination);
      [[660, 0], [880, .12], [1047, .24]].forEach(([freq, offset]) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, now+offset);
        gain.gain.exponentialRampToValueAtTime(0.8, now+offset+0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001, now+offset+0.24);
        osc.connect(gain).connect(master);
        osc.start(now+offset);
        osc.stop(now+offset+0.27);
      });
      if(navigator.vibrate) navigator.vibrate([40, 35, 55]);
    }catch(e) {}
  }

  function isPartnerFormBeingUsed() {
    const active = document.activeElement;
    return !!(active && active.closest && active.closest('#partnerForm'));
  }


  /* ---------- POPUP LIFECYCLE ---------- */
  function goToPartner() {
    const target = document.getElementById('partnerForm') || document.getElementById('partner');
    if(!target) return;
    closePopup();
    target.scrollIntoView({behavior:'smooth', block:'start'});
    setTimeout(() => {
      const first = target.querySelector('button,input,select,textarea');
      if(first) first.focus({preventScroll:true});
    }, 650);
  }

  function closePopup() {
    clearTimeout(hideTimer);
    popup.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  function openPopup() {
    if(document.hidden || isPartnerFormBeingUsed()) return;
    renderText();
    clearTimeout(hideTimer);
    popup.classList.remove('is-open');
    void popup.offsetWidth;
    progress.style.animation = 'none';
    void progress.offsetWidth;
    progress.style.animation = '';
    popup.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.remove('is-pulsing');
    void btn.offsetWidth;
    btn.classList.add('is-pulsing');
    playChime();
    hideTimer = setTimeout(closePopup, 4700);
  }

  function scheduleNext() {
    clearTimeout(openTimer);
    openTimer = setTimeout(() => {
      openPopup();
      scheduleNext();
    }, 15000);
  }


  /* ---------- WIRE UP + AUTO-SCHEDULE ---------- */
  ['pointerdown', 'keydown', 'touchstart'].forEach(type => document.addEventListener(type, unlockAudio, {once:true, passive:true}));
  function openFromMobileNav() {
    unlockAudio();
    closeMenuIfOpen();
    openPopup();
  }

  function closeMenuIfOpen() {
    const menu = document.getElementById('mobileMenu');
    if(menu && menu.classList.contains('open')) {
      const close = menu.querySelector('#mobileClose');
      if(close) close.click();
    }
  }

  btn.addEventListener('click', () => {unlockAudio();openPopup();});
  document.addEventListener('click', e => {
    const mobileBtn = e.target.closest && e.target.closest('#mobilePartnerNotify');
    if(!mobileBtn) return;
    e.preventDefault();
    openFromMobileNav();
  });
  closeBtn.addEventListener('click', closePopup);
  action.addEventListener('click', goToPartner);
  popup.addEventListener('click', e => {if(e.target === popup) goToPartner();});
  document.addEventListener('sawa:languagechange', renderText);

  renderText();
  setTimeout(() => {openPopup();scheduleNext();}, 2000);
})();
