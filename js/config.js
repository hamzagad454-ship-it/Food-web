/* ============================================================
SAWA FOOD — EDIT HERE
------------------------------------------------------------
This is the only file you normally need to edit.
• WhatsApp number
• Social media links
• Hero images
• Product images

LOCAL IMAGES:
1) Put your image inside the images/ or images/products/ folder.
2) Write its path below, for example: images/products/tea.jpg
3) Save and refresh the site.
 ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  === */

const SAWA_CONFIG = {
  whatsappNumber: '201029208418',

  social: {
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/',
    tiktok: 'https://www.tiktok.com/'
  },

  images: {
    hero: {
      hero1: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=90',
      hero2: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=90',
      hero3: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1800&q=90',
      hero4: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=90'
    },

    products: {
      tea: {
        cover: 'img/tea-example.png',
        gallery: [
        'img/tea-example.png',
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=88',
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=88'
        ],
        factory: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=88'
      },
      ghee: {
        cover: 'img/ghee-example.png',
        gallery: [
        'img/ghee-example.png',
        'img/ghee-example.png',
        'img/ghee-example.png'
        ],
        factory: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=88'
      },
      rice: {
        cover: 'img/rice.png',
        gallery: [
        'img/rice.png',
        'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=88',
        'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1000&q=88'
        ],
        factory: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1200&q=88'
      }
    },

    site: {
      heroMedia: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85',
      map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80'
    }
  }
};

// Apply image variables used by CSS. Do not edit below this line.
document.documentElement.style.setProperty('--sawa-hero-media-image', `url("${SAWA_CONFIG.images.site.heroMedia}")`);
document.documentElement.style.setProperty('--sawa-map-image', `url("${SAWA_CONFIG.images.site.map}")`);
