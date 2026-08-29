/* =========================================================
SAWA FOOD — Social media links
Replace only the 3 URLs below with the official accounts.
 ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  === */
(function() {
  const SOCIAL_LINKS = SAWA_CONFIG.social;

  const pairs = {
    instagram:['socialInstagramFloat', 'socialInstagramFooter'], 
    youtube:['socialYoutubeFloat', 'socialYoutubeFooter'], 
    tiktok:['socialTiktokFloat', 'socialTiktokFooter']
  };
  Object.keys(pairs).forEach(key => pairs[key].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.href = SOCIAL_LINKS[key];
  }));

  const wrap = document.getElementById('socialFloat');
  const toggle = document.getElementById('socialToggle');
  const card = document.getElementById('socialFloatLinks');
  if(!wrap || !toggle) return;

  function setOpen(open) {
    wrap.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open?'Close social media links':'Open social media links');
    if(card) card.setAttribute('aria-hidden', String(!open));
  }

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    setOpen(!wrap.classList.contains('open'));
  });

  document.addEventListener('click', function(e) {
    if(!wrap.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape') setOpen(false);
  });
})();
