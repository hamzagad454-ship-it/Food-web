/* =========================================================
SAWA FOOD — Store locator map
"Where to buy": country selector + Leaflet map showing every
partner store location for the selected country. Self-
contained (IIFE).
 ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  === */

(function() {
  'use strict';

  const storeMapData = {
    Egypt:{
      center:[26.82, 30.80], zoom:5, 
      stores:[
      {name:'Sawa Partner Market', city:'Cairo', area:'Nasr City', lat:30.056, lon:31.330, products:['Tea', 'Ghee']}, 
      {name:'Nile Retail Partner', city:'Giza', area:'Dokki', lat:30.038, lon:31.209, products:['Rice', 'Ghee']}
      ]
    }, 
    'Saudi Arabia':{
      center:[24.10, 44.50], zoom:5, 
      stores:[
      {name:'Riyadh Food Partner', city:'Riyadh', area:'Olaya', lat:24.7136, lon:46.6753, products:['Tea', 'Rice']}, 
      {name:'Jeddah Retail Partner', city:'Jeddah', area:'Al Rawdah', lat:21.5433, lon:39.1728, products:['Ghee', 'Rice']}
      ]
    }, 
    UAE:{
      center:[24.35, 54.65], zoom:7, 
      stores:[
      {name:'Dubai Food Partner', city:'Dubai', area:'Business Bay', lat:25.1851, lon:55.2628, products:['Tea', 'Ghee']}, 
      {name:'Abu Dhabi Retail Partner', city:'Abu Dhabi', area:'Al Zahiyah', lat:24.4936, lon:54.3760, products:['Rice', 'Tea']}
      ]
    }, 
    Jordan:{
      center:[31.25, 36.00], zoom:7, 
      stores:[
      {name:'Amman Food Partner', city:'Amman', area:'Sweifieh', lat:31.9539, lon:35.9106, products:['Rice', 'Tea']}, 
      {name:'Jordan Retail Partner', city:'Irbid', area:'Central', lat:32.5556, lon:35.8500, products:['Tea']}
      ]
    }
  };

  const countrySelect = document.getElementById('sawaCountry');
  const findBtn = document.getElementById('sawaFindStores');
  const results = document.getElementById('sawaLocationResults');
  const preview = document.getElementById('sawaPreviewMap');
  if(!countrySelect || !findBtn || !results || !preview) return;

  let map = null;
  let markers = [];
  let activeCountry = '';

  const FR = {
    'SAWA NEAR YOU':'SAWA PRÈS DE CHEZ VOUS', 'All supported locations in this country are shown below.':'Tous les points de vente pris en charge dans ce pays sont affichés ci-dessous.', 
    'Cities':'Villes', 'Stores':'Magasins', 'View on map →':'Voir sur la carte →', 'Find stores <span>→</span>':'Trouver les magasins <span>→</span>', 
    'Choose a country':'Choisissez un pays', 'Choose your country':'Choisissez votre pays'
  };
  const tr = (en, ar) => document.documentElement.lang === 'ar'?ar:(document.documentElement.lang === 'fr'?(FR[en] || en):en);


  /* ---------- LEAFLET MAP HELPERS ---------- */
  function markerIcon() {
    return L.divIcon({
      className:'', 
      html:'<div class="sawa-map-pin"></div>', 
      iconSize:[28, 28], 
      iconAnchor:[8, 26], 
      popupAnchor:[6, -25]
    });
  }

  function initMap() {
    if(map || !window.L) return;
    map = L.map('sawaRealMap', {zoomControl:true, scrollWheelZoom:true});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:19, 
      attribution:'&copy; OpenStreetMap contributors'
    }).addTo(map);
  }

  function clearMarkers() {
    markers.forEach(m => m.remove());
    markers = [];
  }

  function openStore(store) {
    const m = markers.find(x => x._sawaName === store.name);
    if(m) {
      map.setView([store.lat, store.lon], Math.max(map.getZoom(), 10), {animate:true});
      m.openPopup();
    }
  }


  /* ---------- RESULTS RENDERING ---------- */
  function renderResults(country) {
    const data = storeMapData[country];
    if(!data) return;

    activeCountry = country;
    results.hidden = false;

    // Build the scaffold only once. Recreating #sawaRealMap on every call
    // (via a full innerHTML replace) used to destroy Leaflet's container
    // while `map` still pointed at the old, now-detached element — so the
    // 2nd+ country selected would never actually render. Now the map's div
    // stays in the DOM and only its content/markers update per country.
    if(!results.querySelector('.sawa-results-grid')) {
      results.innerHTML = `
      <div class = "sawa-results-head"></div>
      <div class = "sawa-results-grid">
      <div class = "sawa-real-map" id = "sawaRealMap"></div>
      <div class = "sawa-store-results" id = "sawaStoreResults"></div>
      </div>`;
    }

    results.querySelector('.sawa-results-head').innerHTML = `
    <div>
    <div class = "eyebrow">${tr('SAWA NEAR YOU', 'ساوا بالقرب منك')}</div>
    <h3>${country}</h3>
    <p>${tr('All supported locations in this country are shown below.', 'كل نقاط البيع المدعومة في هذه الدولة ظاهرة بالأسفل.')}</p>
    </div>
    <div class = "sawa-results-count">
    <div class = "sawa-stat"><b>${[...new Set(data.stores.map(s => s.city))].length}</b><span>${tr('Cities', 'مدن')}</span></div>
    <div class = "sawa-stat"><b>${data.stores.length}</b><span>${tr('Stores', 'متاجر')}</span></div>
    </div>`;

    const list = document.getElementById('sawaStoreResults');
    list.innerHTML = data.stores.map((s, i) => `
    <article class = "sawa-result-card" data-store-index = "${i}">
    <h4>${s.name}</h4>
    <p>${s.city} · ${s.area}</p>
    <div class = "products">${s.products.map(p => `<span>${p}</span>`).join('')}</div>
    <span class = "open">${tr('View on map →', 'عرض على الخريطة ←')}</span>
    </article>`).join('');

    initMap();
    if(!map) return;

    clearMarkers();
    const bounds = L.latLngBounds([]);
    data.stores.forEach((s, i) => {
      const m = L.marker([s.lat, s.lon], {icon:markerIcon()}).addTo(map);
      m._sawaName = s.name;
      m.bindPopup(`
      <div class = "sawa-leaflet-popup">
      <h4>${s.name}</h4>
      <p>${s.city} · ${s.area}</p>
      <p style = "margin-top:5px"><b>${s.products.join(' · ')}</b></p>
      </div>`);
      markers.push(m);
      bounds.extend([s.lat, s.lon]);
      list.children[i].addEventListener('click', () => openStore(s));
    });

    if(data.stores.length === 1) map.setView([data.stores[0].lat, data.stores[0].lon], 11);
    else if(data.stores.length>1) map.fitBounds(bounds.pad(.35), {maxZoom:data.zoom});

    setTimeout(() => map.invalidateSize(), 80);
    results.scrollIntoView({behavior:'smooth', block:'start'});
  }


  /* ---------- EVENTS + LANGUAGE ---------- */
  findBtn.addEventListener('click', () => {
    const country = countrySelect.value;
    if(!country) {
      countrySelect.focus();
      countrySelect.reportValidity?.();
      return;
    }
    renderResults(country);
  });

  const countryLabels = {
    en:{'':'Choose your country', 'Egypt':'Egypt', 'Saudi Arabia':'Saudi Arabia', 'UAE':'UAE', 'Jordan':'Jordan'}, 
    ar:{'':'اختر الدولة', 'Egypt':'مصر', 'Saudi Arabia':'السعودية', 'UAE':'الإمارات', 'Jordan':'الأردن'}, 
    fr:{'':'Choisissez votre pays', 'Egypt':'Égypte', 'Saudi Arabia':'Arabie saoudite', 'UAE':'Émirats arabes unis', 'Jordan':'Jordanie'}
  };
  countrySelect.addEventListener('change', () => {
    if(!countrySelect.value) return;
    findBtn.innerHTML = tr('Find stores <span>→</span>', 'اعثر على المتاجر <span>←</span>');
  });
  function refreshLocatorLanguage() {
    const lang = document.documentElement.lang || 'en';
    [...countrySelect.options].forEach(o => {o.textContent = (countryLabels[lang] || countryLabels.en)[o.value] || o.textContent;});
    findBtn.innerHTML = tr('Find stores <span>→</span>', 'اعثر على المتاجر <span>←</span>');
    if(activeCountry && !results.hidden) renderResults(activeCountry);
  }
  window.sawaRefreshLocatorLanguage = refreshLocatorLanguage;
  document.addEventListener('sawa:languagechange', refreshLocatorLanguage);

  // Refit Leaflet after language/theme/layout changes.
  window.addEventListener('resize', () => { if(map) map.invalidateSize(); });

})();
