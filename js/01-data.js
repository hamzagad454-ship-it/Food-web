/* =========================================================
SAWA FOOD — Data & translations
Product catalog and the Arabic (ar) translation dictionary
used by 02-site-core.js to localize the page.
 ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  ===  === */

// Single source of truth for the WhatsApp Business number used by every
// WhatsApp link on the site (float button, footer, partner CTA, and the
// partnership request form). International format, no "+" or leading 0.
const SAWA_WHATSAPP_NUMBER = SAWA_CONFIG.whatsappNumber;

// Fallback shown in place of a product photo when the external image URL
// fails to load (dead link, blocked, offline, etc.), so a broken-image icon
// never appears in a card. A local inline SVG — no network request needed.
const SAWA_IMG_FALLBACK  = 
"data:image/svg+xml;utf8," +
encodeURIComponent(
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">' +
'<rect width="600" height="600" fill="#eef3e9"/>' +
'<g fill="#173d2a" opacity="0.35">' +
'<circle cx="300" cy="250" r="76"/>' +
'<rect x="266" y="330" width="68" height="130" rx="16"/>' +
"</g></svg>",
);

const products = [
{
  tag: "NEW",
  brand: "Sawa Select",
  name: "Premium Black Tea",
  arName: "شاي أسود فاخر",
  frName: "Thé noir premium",
  meta: "مزيج شاي أسود مختار بعناية",
  en: {
    meta: "Carefully selected black tea blend",
    desc: "A rich, aromatic tea suitable for retail, hospitality, and diverse markets.",
    origin: "Egypt · Regional supply",
  },
  image: SAWA_CONFIG.images.products.tea.cover,
  gallery: SAWA_CONFIG.images.products.tea.gallery,
  factory: SAWA_CONFIG.images.products.tea.factory,
  sizes: ["100 g", "250 g", "500 g"],
  desc: "شاي بطابع غني ورائحة مميزة، مناسب للتجزئة والضيافة والأسواق المختلفة.",
  origin: "Egypt · Regional supply",
  fr: {
    meta: "Mélange de thé noir soigneusement sélectionné",
    desc: "Un thé au caractère riche et à l’arôme distinctif, adapté au commerce de détail, à l’hôtellerie et à différents marchés.",
    origin: "Égypte · Approvisionnement régional",
  },
},
{
  tag: "POPULAR",
  brand: "Sawa Select",
  name: "Premium Ghee",
  arName: "سمنة فاخرة",
  frName: "Ghee premium",
  meta: "سمنة صافية بطعم غني",
  en: {
    meta: "Pure ghee with a rich taste",
    desc: "Ghee suitable for home and professional use, available in multiple sizes for different sales channels.",
    origin: "Egypt · Quality controlled",
  },
  image: SAWA_CONFIG.images.products.ghee.cover,
  gallery: SAWA_CONFIG.images.products.ghee.gallery,
  factory: SAWA_CONFIG.images.products.ghee.factory,
  sizes: ["250 g", "500 g", "1 kg"],
  desc: "سمنة مناسبة للاستخدام المنزلي والمهني، مع أحجام متعددة لتناسب قنوات البيع المختلفة.",
  origin: "Egypt · Quality controlled",
  fr: {
    meta: "Ghee pur au goût riche",
    desc: "Un ghee adapté à l’usage domestique et professionnel, disponible en plusieurs formats pour différents canaux de vente.",
    origin: "Égypte · Qualité contrôlée",
  },
},
{
  tag: "NEW",
  brand: "Sawa Select",
  name: "Long Grain Rice",
  arName: "أرز حبة طويلة",
  frName: "Riz à grains longs",
  meta: "أرز حبة طويلة عالي الجودة",
  en: {
    meta: "High-quality long grain rice",
    desc: "Carefully selected long grain rice, available in sizes for consumers, retail, and wholesale.",
    origin: "Egypt · Regional distribution",
  },
  image: SAWA_CONFIG.images.products.rice.cover,
  gallery: SAWA_CONFIG.images.products.rice.gallery,
  factory: SAWA_CONFIG.images.products.rice.factory,
  sizes: ["1 kg", "2 kg", "5 kg", "10 kg"],
  desc: "أرز حبة طويلة مختار بعناية، متوفر بأحجام تناسب المستهلك والتجزئة والجملة.",
  origin: "Egypt · Regional distribution",
  fr: {
    meta: "Riz à grains longs de haute qualité",
    desc: "Un riz à grains longs soigneusement sélectionné, disponible dans des formats adaptés aux consommateurs, au détail et au gros.",
    origin: "Égypte · Distribution régionale",
  },
},
];

const ar = {
  aboutEyebrow: "من نحن",
  aboutTitle: "نربط أفضل المنتجات الغذائية بمزيد من الأسواق.",
  aboutText:
  "نقرّب العلامات الغذائية الموثوقة من العملاء وتجار التجزئة والموزعين من خلال شبكة إقليمية متنامية، مع التركيز على الجودة وتوفر المنتجات والشراكات طويلة المدى.",
  top: "علامات غذائية مميزة، أقرب إلى كل سوق.",
  home: "الرئيسية",
  products: "المنتجات",
  manufacturers: "المصنّعون",
  where: "أماكن البيع",
  partner: "شراكة معنا",
  eyebrow: "مختار لكل مائدة",
  heroTitle: "طعام أفضل، أقرب إليك.",
  heroText:
  "اكتشف منتجات موثوقة من صُنّاع استثنائيين، بشبكة توزيع مبنية للمنطقة.",
  explore: "استكشف المنتجات",
  wholesale: "طلب جملة",
  note: "في 5 أسواق",
  stat1: "منتج مختار",
  stat2: "علامة تجارية موثوقة",
  stat3: "أسواق نخدمها",
  stat4: "شريك تجزئة",
  browse: "تسوّق حسب احتياجك",
  categories: "استكشف فئاتنا",
  allcategories: "كل الفئات ←",
  cat1: "أساسيات المطبخ",
  cat2: "الألبان والمبردات",
  cat3: "المشروبات",
  selected: "مختارة لك",
  featured: "منتجات مميزة",
  viewcatalog: "عرض الكتالوج ←",
  growth: "نمُ مع ساوا",
  distributorTitle: "انقل طعامًا مميزًا إلى سوقك.",
  distributorText:
  "انضم إلى شبكة إقليمية خبيرة. نتعاون مع موزعين وتجار تجزئة يهتمون بالجودة مثلنا.",
  apply: "تواصل عبر واتساب ←",
  applyForm: "أو املأ نموذج الشراكة",
  ourStandard: "معيارنا",
  whyTitle: "طعام يسعدك أن تشاركه.",
  whyText: "نقيّم كل منتج للجودة والثبات ومكانه على المائدة.",
  f1: "مصادر مختارة بعناية",
  f1p: "نعمل مباشرة مع صُنّاع يأخذون حرفتهم على محمل الجد.",
  f2: "توريد موثوق",
  f2p: "لوجستيات مرنة ومعرفة محلية بالسوق من البداية للنهاية.",
  f3: "شراكات متينة",
  f3p: "دعم عملي لتجار التجزئة والموزعين والعلامات النامية.",
  find: "اعثر على ساوا بقربك",
  locatorTitle: "أماكن الشراء",
  locatorText: "ابحث عن متجر أو موزع يقدم المنتجات التي تحبها.",
  choosecountry: "اختر الدولة",
  choosecity: "اختر المدينة / المنطقة",
  findstores: "اعثر على المتاجر",
  locatorHint: "اختر الدولة لعرض كل المدن ونقاط البيع المدعومة على الخريطة.",
  mapPreview: "خريطة نقاط البيع التفاعلية",
  newsTitle: "أشياء طيبة في بريدك.",
  newsText: "منتجات جديدة وأفكار مفيدة وأخبار من مجتمع ساوا.",
  subscribe: "اشترك",
  subscribed: "شكرًا، أنت الآن في القائمة.",
  footText: "نجعل الطعام الممتاز أسهل اكتشافًا وتوزيعًا واستمتاعًا في المنطقة.",
  discover: "اكتشف",
  business: "للأعمال",
  distribution: "التوزيع",
  retail: "شراكات التجزئة",
  company: "الشركة",
  about: "عن ساوا",
  contact: "اتصل بنا",
  rights: "كل الحقوق محفوظة.",
  email: "بريدك الإلكتروني",
  name: "الاسم الكامل",
  businessEmail: "بريد العمل",
  companyName: "اسم الشركة",
  interest: "ما المنتجات التي تهمك؟",
  consent: "أوافق على أن تتواصل معي ساوا فود بخصوص هذا الطلب.",
  send: "أرسل الطلب",
};

const fr = {
  aboutEyebrow: "QUI SOMMES-NOUS",
  aboutTitle:
  "Nous rapprochons les meilleurs produits alimentaires de nouveaux marchés.",
  aboutText:
  "Sawa Food rapproche les marques alimentaires de confiance des clients, détaillants et distributeurs grâce à un réseau régional en pleine croissance, fondé sur la qualité, un approvisionnement fiable et des partenariats durables.",
  top: "Des marques alimentaires de qualité, plus proches de chaque marché.",
  home: "Accueil",
  products: "Produits",
  manufacturers: "Fabricants",
  where: "Où acheter",
  partner: "Devenir partenaire",
  eyebrow: "Sélectionné pour chaque table",
  heroTitle: "Une meilleure alimentation, plus proche de vous.",
  heroText:
  "Découvrez des produits fiables de fabricants exceptionnels, soutenus par un réseau de distribution pensé pour la région.",
  explore: "Découvrir les produits",
  wholesale: "Demande de gros",
  note: "Dans 5 marchés",
  stat1: "produits sélectionnés",
  stat2: "marques de confiance",
  stat3: "marchés desservis",
  stat4: "partenaires de vente au détail",
  browse: "Parcourir par besoin",
  categories: "Découvrez nos catégories",
  allcategories: "Voir toutes les catégories →",
  cat1: "Essentiels du garde-manger",
  cat2: "Produits laitiers et frais",
  cat3: "Boissons",
  selected: "Sélection pour vous",
  featured: "Produits vedettes",
  viewcatalog: "Voir le catalogue →",
  growth: "Grandissez avec Sawa",
  distributorTitle: "Apportez des produits remarquables à votre marché.",
  distributorText:
  "Rejoignez un réseau régional expérimenté. Nous travaillons avec des distributeurs et détaillants qui accordent autant d’importance à la qualité que nous.",
  apply: "Discuter sur WhatsApp →",
  applyForm: "Ou remplir le formulaire de partenariat",
  ourStandard: "Notre standard",
  whyTitle: "Des aliments que vous serez heureux de partager.",
  whyText:
  "Chaque produit que nous présentons est évalué pour sa qualité, sa constance et sa place à table.",
  f1: "Sources soigneusement sélectionnées",
  f1p: "Nous travaillons directement avec des fabricants qui prennent leur savoir-faire au sérieux.",
  f2: "Approvisionnement fiable",
  f2p: "Une logistique réactive et une connaissance locale du marché, de bout en bout.",
  f3: "Pensé pour le partenariat",
  f3p: "Un accompagnement utile pour les détaillants, distributeurs et marques en croissance.",
  find: "Trouvez Sawa près de chez vous",
  locatorTitle: "Où acheter",
  locatorText:
  "Trouvez un magasin ou un distributeur proposant les produits que vous aimez.",
  choosecountry: "Choisissez votre pays",
  choosecity: "Choisissez la ville / région",
  findstores: "Trouver les magasins",
  locatorHint:
  "Choisissez un pays pour voir les villes prises en charge et les points de vente partenaires sur la carte.",
  mapPreview: "Carte interactive des points de vente",
  newsTitle: "De bonnes choses dans votre boîte mail.",
  newsText: "Nouveautés, idées utiles et actualités de la communauté Sawa.",
  subscribe: "S’abonner",
  subscribed: "Merci — vous êtes maintenant inscrit.",
  footText:
  "Nous facilitons la découverte, la distribution et le plaisir de déguster de bons aliments dans la région.",
  discover: "Découvrir",
  business: "Pour les entreprises",
  distribution: "Distribution",
  retail: "Partenariats de vente au détail",
  company: "Entreprise",
  about: "À propos de Sawa",
  contact: "Contact",
  rights: "Tous droits réservés.",
  email: "Votre adresse e-mail",
  name: "Nom complet",
  businessEmail: "E-mail professionnel",
  companyName: "Nom de l’entreprise",
  interest: "Quels produits vous intéressent ?",
  consent: "J’accepte que Sawa Food me contacte au sujet de cette demande.",
  send: "Envoyer la demande",
};
