export interface MenuItem {
  id: string;
  name: string;
  category: 'plates' | 'bowls' | 'soups-salads' | 'juices-shots' | 'sides';
  categoryLabel: string;
  price: number;
  displayPrice: string;
  shortDesc: string;
  dietary: string[];
  calories: string;
  prepTime: string;
  isSignature?: boolean;
  isSeasonal?: boolean;
  seasonTag?: string;
  visual: {
    type: 'plate' | 'bowl' | 'cup' | 'soup' | 'side';
    bgBlobColor: string;
    gradientFrom: string;
    gradientTo: string;
    accentEmoji: string;
    accentColor: string;
    imageSrc?: string; // Leave empty for stylized procedural placeholder or set custom image URL
  };
  transparency: {
    ingredients: string[];
    madeInHouse: string;
    whatIsExcluded: string[];
    sourcing: string;
  };
}

export interface StoreInfo {
  name: string;
  handle: string;
  instagramUrl: string;
  address: string;
  neighborhood: string;
  hours: string;
  phone: string;
  missionTagline: string;
  missionSubtitle: string;
  currentSeasonalTheme: string;
  announcement: string;
  disclaimer: string;
}

export const STORE_INFO: StoreInfo = {
  name: "Orchard Kitchen",
  handle: "@orchardkitchen.to",
  instagramUrl: "https://www.instagram.com/orchardkitchen.to/",
  address: "700 King St. W, Toronto, ON M5V 2Y6",
  neighborhood: "King & Bathurst",
  hours: "8:00 AM – 8:00 PM Daily",
  phone: "(416) 555-0198",
  missionTagline: "Eliminating ultra-processed foods on King Street West.",
  missionSubtitle: "Whole-ingredient, seasonal comfort food made in-house. Zero seed oils, zero refined sugars, zero artificial additives.",
  currentSeasonalTheme: "Cool days bring warm flavours — enjoying foods that are in season.",
  announcement: "🌱 Pure Whole Ingredients • Zero Seed Oils • In-House Scratch Kitchen • Open 8am–8pm",
  disclaimer: "Demo Store & Presentation Concept — Built for screen-recorded sales walkthrough. No real payments or pos submissions.",
};

export const MENU_CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'plates', label: 'Plates' },
  { id: 'bowls', label: 'Bowls' },
  { id: 'soups-salads', label: 'Soups & Salads' },
  { id: 'juices-shots', label: 'Juices & Shots' },
  { id: 'sides', label: 'Sides & Bread' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'lomo-saltado-plate',
    name: 'Lomo Saltado Plate',
    category: 'plates',
    categoryLabel: 'Plates',
    price: 18.50,
    displayPrice: '$18.50 (demo)',
    shortDesc: 'Marinated grass-fed steak stir-fry with yellow yellow potatoes, sweet peppers, steamed jasmine rice with giant Andean choclo corn, and scratch-made aji verde.',
    dietary: ['Gluten-Free Option', 'High-Protein', 'Seed-Oil Free'],
    calories: '640 kcal',
    prepTime: 'Ready in 10-12 mins',
    isSignature: true,
    isSeasonal: true,
    seasonTag: 'Guest Favourite',
    visual: {
      type: 'plate',
      bgBlobColor: '#FDECE4',
      gradientFrom: '#5D2E16',
      gradientTo: '#C4572E',
      accentEmoji: '🥩',
      accentColor: '#E54F38',
      imageSrc: '', // To swap image: set to e.g. "/images/lomo-saltado.jpg"
    },
    transparency: {
      ingredients: [
        'Ontario grass-fed flank steak (seared in extra virgin olive oil)',
        'Heirloom yellow bell peppers & red onion',
        'Roasted Yukon gold yellow potatoes',
        'Aromatic jasmine rice with Andean choclo corn kernels',
        'Fresh chopped cilantro & green scallions',
        'House tamari (gluten-free brewed) & apple cider reduction',
        'Fresh garlic & Peruvian aji amarillo paste',
        'Cold-pressed extra virgin olive oil',
        'Coarse Maldon sea salt & cracked black peppercorn',
      ],
      madeInHouse: 'Our creamy Aji Verde is blended fresh every morning at 700 King W using organic Greek yogurt, fresh cilantro, jalapeño, lime juice, and garlic.',
      whatIsExcluded: [
        'Zero canola, soybean, or vegetable oils',
        'Zero cornstarch thickeners or food texturizers',
        'Zero MSG or bottled marinades with sodium benzoate',
        'Zero refined white sugars or caramel color',
      ],
      sourcing: 'Grass-fed Ontario beef from heritage farms; seasonal sweet peppers from Ontario greenhouse growers.',
    },
  },
  {
    id: 'rotisserie-chicken-plate',
    name: 'Rotisserie Herb Chicken Plate',
    category: 'plates',
    categoryLabel: 'Plates',
    price: 17.50,
    displayPrice: '$17.50 (demo)',
    shortDesc: 'Slow-roasted Ontario free-run chicken with fresh rosemary, thyme, roasted winter squash, warm heritage grain pilaf, and house-made chimichurri dip.',
    dietary: ['Dairy-Free', 'High-Protein', 'Whole30 Friendly'],
    calories: '590 kcal',
    prepTime: 'Ready in 8-10 mins',
    isSignature: true,
    visual: {
      type: 'plate',
      bgBlobColor: '#FEF4E2',
      gradientFrom: '#92400E',
      gradientTo: '#E88544',
      accentEmoji: '🍗',
      accentColor: '#D97706',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Free-run Ontario chicken thighs & breasts (herb marinated)',
        'Fresh rosemary, thyme, Mexican oregano, and cracked garlic',
        'Slow-roasted butternut squash cubes',
        'Organic heritage grain blend (wild rice, quinoa, farro)',
        'House chimichurri (flat-leaf parsley, extra virgin olive oil, red wine vinegar, shallots)',
        'Sea salt, crushed red pepper flakes, cold-pressed olive oil',
      ],
      madeInHouse: 'Marinated for 18 hours in fresh herb oil and roasted slow in small batches daily right behind the counter.',
      whatIsExcluded: [
        'Zero injected saline or sodium phosphate solutions',
        'Zero commercial poultry seasoning packs with anti-caking agents',
        'Zero industrial fryer or seed oils',
      ],
      sourcing: 'Antibiotic-free Ontario poultry from family-owned regional co-ops.',
    },
  },
  {
    id: 'roasted-potato-cauliflower-bowl',
    name: 'Roasted Potato & Spiced Cauliflower Bowl',
    category: 'bowls',
    categoryLabel: 'Bowls',
    price: 15.50,
    displayPrice: '$15.50 (demo)',
    shortDesc: 'Golden turmeric roasted cauliflower, crispy yellow yellow potatoes, steamed edamame, pickled red onion, microgreens, and house warm turmeric-tahini drizzle.',
    dietary: ['100% Vegan', 'Gluten-Free', 'Nut-Free'],
    calories: '510 kcal',
    prepTime: 'Ready in 8 mins',
    isSeasonal: true,
    seasonTag: 'Autumn Harvest',
    visual: {
      type: 'bowl',
      bgBlobColor: '#F5F8EE',
      gradientFrom: '#D97706',
      gradientTo: '#F59E0B',
      accentEmoji: '🥔',
      accentColor: '#B45309',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Fresh cauliflower florets seasoned with ground turmeric, cumin & coriander',
        'Yukon gold yellow potatoes roasted in avocado oil with rosemary',
        'Organic non-GMO steamed edamame beans',
        'House-pickled red onions (apple cider vinegar & sea salt)',
        'Toronto microgreens & toasted pumpkin seeds',
        'House golden tahini (sesame paste, lemon juice, turmeric, garlic, warm water)',
      ],
      madeInHouse: 'Onions are pickled in-house using raw cider vinegar and pink Himalayan salt. Tahini sauce is whisked fresh every 4 hours.',
      whatIsExcluded: [
        'Zero high fructose corn syrup in pickles',
        'Zero artificial color (all golden color comes directly from turmeric root)',
        'Zero emulsifiers or polysorbates',
      ],
      sourcing: 'Cauliflower and yellow potatoes sourced directly from Bradford Valley farms.',
    },
  },
  {
    id: 'fall-squash-purple-kale-bowl',
    name: 'Fall Squash & Purple Kale Bowl',
    category: 'bowls',
    categoryLabel: 'Bowls',
    price: 16.00,
    displayPrice: '$16.00 (demo)',
    shortDesc: 'Caramelized Ontario butternut squash, tender purple kale, ruby pomegranate jewels, Persian cucumber, crispy spiced chickpeas, and house maple-Dijon vinaigrette.',
    dietary: ['Vegan', 'Gluten-Free', 'Fiber-Rich'],
    calories: '480 kcal',
    prepTime: 'Ready in 8 mins',
    isSignature: true,
    isSeasonal: true,
    seasonTag: 'Featured On Reel',
    visual: {
      type: 'bowl',
      bgBlobColor: '#FDF1E6',
      gradientFrom: '#C2410C',
      gradientTo: '#EA580C',
      accentEmoji: '🎃',
      accentColor: '#E88544',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Ontario butternut squash roasted with cold-pressed olive oil & nutmeg',
        'Local purple curly kale massaged with fresh lemon & olive oil',
        'Fresh ruby pomegranate arils',
        'Crisp mini Persian cucumbers',
        'Ontario chickpeas roasted crisp with smoked paprika & sea salt',
        'House vinaigrette: Ontario pure dark maple syrup, organic Dijon mustard, apple cider vinegar, extra virgin olive oil',
      ],
      madeInHouse: 'Kale is hand-massaged daily with fresh lemon and olive oil to break down bitterness naturally without blanching.',
      whatIsExcluded: [
        'Zero refined sugar (naturally sweetened only with Ontario maple)',
        'Zero seed oils (dressing is 100% single-estate extra virgin olive oil)',
        'Zero artificial preservatives or sulfites',
      ],
      sourcing: 'Pure maple syrup from Lanark County, Ontario; butternut squash from Norfolk County.',
    },
  },
  {
    id: 'andean-superfood-salad',
    name: 'Andean Superfood Salad',
    category: 'soups-salads',
    categoryLabel: 'Soups & Salads',
    price: 15.00,
    displayPrice: '$15.00 (demo)',
    shortDesc: 'Crisp romaine heart ribbons, heirloom cherry tomatoes, Botija black olives, crumbled fresh queso fresco, yellow potatoes, Andean choclo corn, and house carrot-ginger dressing.',
    dietary: ['Vegetarian', 'Gluten-Free', 'Antioxidant-Dense'],
    calories: '440 kcal',
    prepTime: 'Ready in 6 mins',
    visual: {
      type: 'bowl',
      bgBlobColor: '#EEF6EC',
      gradientFrom: '#15803D',
      gradientTo: '#4ADE80',
      accentEmoji: '🥗',
      accentColor: '#547243',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Hydroponic crisp romaine hearts',
        'Ontario heirloom cherry tomatoes (halved)',
        'Peruvian Botija sundried olives',
        'Artisan Ontario fresh cheese (queso fresco style)',
        'Tender sliced yellow potatoes & giant Andean choclo corn',
        'Raw hemp hearts & toasted pumpkin seeds',
        'House dressing: Whole roasted carrots, fresh Peruvian ginger, rice vinegar, toasted sesame oil, extra virgin olive oil, sea salt',
      ],
      madeInHouse: 'The carrot-ginger dressing is made by blending whole steamed carrots and peeled ginger root — thick with fiber, zero added starches.',
      whatIsExcluded: [
        'Zero mayonnaise or soybean oil binders',
        'Zero calcium disodium EDTA in olives',
        'Zero refined sugar',
      ],
      sourcing: 'Locally grown hydroponic greens with certified authentic Botija olives imported directly.',
    },
  },
  {
    id: 'super-green-goddess-salad',
    name: 'Super Green Goddess Salad',
    category: 'soups-salads',
    categoryLabel: 'Soups & Salads',
    price: 15.50,
    displayPrice: '$15.50 (demo)',
    shortDesc: 'Tender baby spinach, wild arugula, shaved broccoli florets, Hass avocado, edamame, crisp radish, purple cabbage, sunflower seeds, and scratch green goddess dressing.',
    dietary: ['100% Vegan', 'Gluten-Free', 'Nut-Free', 'Keto Friendly'],
    calories: '420 kcal',
    prepTime: 'Ready in 6 mins',
    visual: {
      type: 'bowl',
      bgBlobColor: '#EAF5EA',
      gradientFrom: '#047857',
      gradientTo: '#10B981',
      accentEmoji: '🥑',
      accentColor: '#059669',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Organic baby spinach & wild peppery arugula',
        'Finely shaved raw broccoli florets',
        'Fresh Hass avocado slices',
        'Organic steamed edamame',
        'Thinly sliced watermelon radish & shredded purple cabbage',
        'Toasted raw sunflower seeds & pea tendril microgreens',
        'Green goddess dressing: Avocado, fresh basil, chives, parsley, lemon juice, extra virgin olive oil, sea salt, garlic',
      ],
      madeInHouse: 'Dressing whipped daily with whole ripe avocados and bunches of fresh herbs.',
      whatIsExcluded: [
        'Zero buttermilk powder or artificial dairy flavorings',
        'Zero modified food starches',
        'Zero seed oils',
      ],
      sourcing: 'Microgreens grown locally in downtown Toronto vertical farms.',
    },
  },
  {
    id: 'cilantro-chicken-soup',
    name: 'Cilantro Chicken & Rice Soup + Sourdough',
    category: 'soups-salads',
    categoryLabel: 'Soups & Salads',
    price: 13.00,
    displayPrice: '$13.00 (demo)',
    shortDesc: 'Slow-simmered rich chicken bone broth, shredded tender chicken, fragrant cilantro puree, jasmine rice, and lime, served with warm house sourdough focaccia.',
    dietary: ['Dairy-Free', 'Nut-Free', 'Comforting'],
    calories: '460 kcal',
    prepTime: 'Ready in 5 mins',
    isSeasonal: true,
    seasonTag: 'Autumn Favourite',
    visual: {
      type: 'soup',
      bgBlobColor: '#FFF3E3',
      gradientFrom: '#B45309',
      gradientTo: '#F59E0B',
      accentEmoji: '🥣',
      accentColor: '#D97706',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'House-made 14-hour chicken bone broth (bones, onions, carrots, celery, bay leaves, peppercorns)',
        'Shredded Ontario roasted free-run chicken',
        'Steamed jasmine rice',
        'Blended cilantro-garlic-lime broth base',
        'Sliced scallions & fresh lime wedge',
        'Artisan sourdough focaccia (fermented flour, water, sea salt, extra virgin olive oil, rosemary)',
      ],
      madeInHouse: 'Broth is simmered in our King St kitchen overnight to extract natural collagen and minerals with no powdered bouillons.',
      whatIsExcluded: [
        'Zero yeast extract or hydrolyzed protein powders',
        'Zero artificial color or flavor enhancers',
        'Zero maltodextrin or anti-settling agents',
      ],
      sourcing: 'Pasture-raised poultry bones and locally stone-milled wheat for focaccia.',
    },
  },
  {
    id: 'roasted-yam-ginger-soup',
    name: 'Roasted Yam & Ginger Soup + Sourdough',
    category: 'soups-salads',
    categoryLabel: 'Soups & Salads',
    price: 12.00,
    displayPrice: '$12.00 (demo)',
    shortDesc: 'Velvety roasted sweet yams, fresh pressed Peruvian ginger, gentle coconut milk, spiced pepitas, and cold-pressed olive oil, served with warm sourdough focaccia.',
    dietary: ['100% Vegan', 'Dairy-Free', 'Warming Comfort'],
    calories: '410 kcal',
    prepTime: 'Ready in 5 mins',
    isSeasonal: true,
    seasonTag: 'Seasonal Special',
    visual: {
      type: 'soup',
      bgBlobColor: '#FDEEE6',
      gradientFrom: '#C2410C',
      gradientTo: '#F97316',
      accentEmoji: '🍠',
      accentColor: '#EA580C',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Ontario roasted sweet yams & carrots',
        'Fresh-pressed Peruvian ginger root',
        'Slow-simmered vegetable stock (leeks, celery, carrots, parsley)',
        'Pure organic coconut cream',
        'Toasted spiced pumpkin seeds (pepitas)',
        'Drizzle of extra virgin olive oil & cracked pink peppercorn',
        'Warm artisan sourdough focaccia slice',
      ],
      madeInHouse: 'Sweet yams are caramelized in our ovens before pureeing to build deep sweetness without adding any sugar.',
      whatIsExcluded: [
        'Zero brown sugar, cane syrups, or corn syrup',
        'Zero guar gum, carrageenan, or commercial soup bases',
        'Zero seed oils',
      ],
      sourcing: 'Yams from Simcoe County, Ontario.',
    },
  },
  {
    id: 'turmeric-pepper-shot',
    name: 'Turmeric-Pepper Immunity Shot',
    category: 'juices-shots',
    categoryLabel: 'Juices & Shots',
    price: 5.50,
    displayPrice: '$5.50 (demo)',
    shortDesc: 'Raw cold-pressed Hawaiian turmeric root, black pepper extract for absorption, fresh orange juice, and raw wildflower Ontario honey.',
    dietary: ['Raw & Cold-Pressed', 'Gluten-Free', 'Dairy-Free'],
    calories: '35 kcal',
    prepTime: 'Immediate',
    isSignature: true,
    visual: {
      type: 'cup',
      bgBlobColor: '#FEF6E0',
      gradientFrom: '#D97706',
      gradientTo: '#FBBF24',
      accentEmoji: '🧡',
      accentColor: '#F59E0B',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Raw cold-pressed turmeric root (never powdered or dehydrated)',
        'Cold-pressed Valencia orange juice',
        'Freshly cracked black peppercorn tincture (activates curcumin bioavailability)',
        'Raw unpasteurized Ontario wildflower honey',
      ],
      madeInHouse: 'Pressed raw on a hydraulic cold-press at 700 King W every morning.',
      whatIsExcluded: [
        'Zero pasteurization heat that degrades sensitive enzymes',
        'Zero artificial colorings or citric acid powders',
        'Zero synthetic vitamin fortification',
      ],
      sourcing: 'Certified organic whole turmeric rhizomes and pure Ontario honey.',
    },
  },
  {
    id: 'ginger-lemon-fire-shot',
    name: 'Ginger-Lemon Fire Shot',
    category: 'juices-shots',
    categoryLabel: 'Juices & Shots',
    price: 5.50,
    displayPrice: '$5.50 (demo)',
    shortDesc: '100% pure cold-pressed Peruvian ginger root, freshly squeezed lemon juice, and a pinch of ground cayenne pepper. Sharp, bright, invigorating.',
    dietary: ['100% Vegan', 'Raw & Cold-Pressed', 'Zero Sugar'],
    calories: '20 kcal',
    prepTime: 'Immediate',
    isSignature: true,
    visual: {
      type: 'cup',
      bgBlobColor: '#FEF9E7',
      gradientFrom: '#EAB308',
      gradientTo: '#FDE047',
      accentEmoji: '🍋',
      accentColor: '#CA8A04',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Raw cold-pressed Peruvian ginger root',
        'Freshly squeezed Meyer lemon juice',
        'Pure ground cayenne pepper pinch',
        'Filtered spring water splash for balance',
      ],
      madeInHouse: 'Pure juice pressed fresh without any heat treatment.',
      whatIsExcluded: [
        'Zero added sugars, agave, or artificial sweeteners',
        'Zero potassium sorbate or sodium benzoate preservatives',
        'Zero commercial ginger concentrate flavorings',
      ],
      sourcing: 'High-altitude Peruvian ginger for maximum zing and gingerol content.',
    },
  },
  {
    id: 'pom-beet-glow-shot',
    name: 'Pomegranate-Beet Glow Shot',
    category: 'juices-shots',
    categoryLabel: 'Juices & Shots',
    price: 5.50,
    displayPrice: '$5.50 (demo)',
    shortDesc: 'Cold-pressed dark Ontario red beets, tart cold-pressed pomegranate arils, blood orange, and a hint of fresh garden mint.',
    dietary: ['100% Vegan', 'Raw & Cold-Pressed', 'Naturally Sweet'],
    calories: '40 kcal',
    prepTime: 'Immediate',
    visual: {
      type: 'cup',
      bgBlobColor: '#FDECEC',
      gradientFrom: '#881337',
      gradientTo: '#E11D48',
      accentEmoji: '🍷',
      accentColor: '#BE123C',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Ontario dark red beets (raw cold-pressed)',
        'Fresh pomegranate arils pressed raw',
        'Cold-pressed blood orange juice',
        'Fresh garden spearmint leaves',
      ],
      madeInHouse: 'Juiced in small refrigerated batches to preserve fresh crisp taste.',
      whatIsExcluded: [
        'Zero shelf-life extenders or chemical stabilizers',
        'Zero cane sugars or artificial red food colorings',
      ],
      sourcing: 'Beets harvested from Holland Marsh; real whole pomegranates.',
    },
  },
  {
    id: 'sourdough-focaccia-aji-verde',
    name: 'Warm Sourdough Focaccia & House Dips',
    category: 'sides',
    categoryLabel: 'Sides & Bread',
    price: 6.50,
    displayPrice: '$6.50 (demo)',
    shortDesc: 'Two generous slices of 36-hour slow-fermented rosemary sourdough focaccia, served with whipped Greek yogurt aji verde & smoked garlic olive oil.',
    dietary: ['Vegetarian', 'Naturally Fermented'],
    calories: '320 kcal',
    prepTime: 'Ready in 3 mins',
    visual: {
      type: 'side',
      bgBlobColor: '#FBF3E8',
      gradientFrom: '#B45309',
      gradientTo: '#D97706',
      accentEmoji: '🥖',
      accentColor: '#92400E',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Unbleached Ontario stoneground wheat flour',
        '36-hour wild sourdough starter culture (flour, water)',
        'Extra virgin olive oil',
        'Fresh organic rosemary sprigs',
        'Flaky sea salt',
        'Served with: House aji verde (Greek yogurt, cilantro, lime, garlic) and smoked garlic olive oil',
      ],
      madeInHouse: 'Slow naturally leavened dough with zero commercial instant active dry yeasts or dough conditioners.',
      whatIsExcluded: [
        'Zero potassium bromate or bleaching agents',
        'Zero soybean shortening or margarine',
        'Zero calcium propionate mold inhibitors',
      ],
      sourcing: 'Stone-milled regional grain from Ontario flour mills.',
    },
  },
  {
    id: 'mini-citrus-lentil-side',
    name: 'Mini Citrus Beluga Lentil Side',
    category: 'sides',
    categoryLabel: 'Sides & Bread',
    price: 5.50,
    displayPrice: '$5.50 (demo)',
    shortDesc: 'Al dente French green lentils, diced Persian cucumber, heirloom cherry tomatoes, red onion, flat parsley, and citrus olive-oil vinaigrette.',
    dietary: ['100% Vegan', 'Gluten-Free', 'High-Fiber'],
    calories: '220 kcal',
    prepTime: 'Ready in 2 mins',
    visual: {
      type: 'side',
      bgBlobColor: '#F1F7EE',
      gradientFrom: '#3F6212',
      gradientTo: '#65A30D',
      accentEmoji: '🌱',
      accentColor: '#4D7C0F',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Cooked French green lentils (steamed al dente with bay leaf)',
        'Diced Persian cucumber',
        'Sweet heirloom cherry tomatoes',
        'Minced red onion & flat-leaf Italian parsley',
        'Citrus vinaigrette: Lemon zest, orange juice, extra virgin olive oil, sea salt',
      ],
      madeInHouse: 'Tossed fresh every few hours to keep veggies crisp and vibrant.',
      whatIsExcluded: ['Zero soybean oil', 'Zero canned preservatives', 'Zero artificial flavor enhancers'],
      sourcing: 'Organic Canadian-grown green lentils.',
    },
  },
  {
    id: 'cold-brew-hibiscus-tea',
    name: 'Cold-Brew Spiced Hibiscus Tea',
    category: 'juices-shots',
    categoryLabel: 'Juices & Shots',
    price: 4.50,
    displayPrice: '$4.50 (demo)',
    shortDesc: '16-hour slow cold-brewed whole Egyptian hibiscus flowers, Mexican cinnamon stick, fresh orange peel, and pure Ontario raw honey. Tart, floral, refreshing.',
    dietary: ['Vegetarian', 'Naturally Caffeine-Free', 'Antioxidant-Rich'],
    calories: '45 kcal',
    prepTime: 'Immediate',
    visual: {
      type: 'cup',
      bgBlobColor: '#FDF0F3',
      gradientFrom: '#9F1239',
      gradientTo: '#E11D48',
      accentEmoji: '🌺',
      accentColor: '#BE123C',
      imageSrc: '',
    },
    transparency: {
      ingredients: [
        'Whole dried organic hibiscus calyces (steeped 16 hours in cold triple-filtered water)',
        'Whole cinnamon quills & dried Seville orange peel',
        'Light touch of Ontario raw wildflower honey',
      ],
      madeInHouse: 'Slow cold-brewed overnight without boiling to prevent tannin bitterness.',
      whatIsExcluded: [
        'Zero artificial syrup concentrates or synthetic fruit essences',
        'Zero caramel color or refined cane sugar',
      ],
      sourcing: 'Fair-trade whole hibiscus flowers.',
    },
  },
];

export const PICKUP_TIME_SLOTS = [
  { time: '11:30 AM', status: 'available' },
  { time: '11:45 AM', status: 'available' },
  { time: '12:00 PM', status: 'busy', label: 'Lunch Rush' },
  { time: '12:15 PM', status: 'busy', label: 'High Demand' },
  { time: '12:30 PM', status: 'available' },
  { time: '12:45 PM', status: 'available' },
  { time: '1:00 PM', status: 'available' },
  { time: '1:15 PM', status: 'available' },
  { time: '1:30 PM', status: 'available' },
  { time: '2:00 PM', status: 'available' },
  { time: '2:30 PM', status: 'available' },
  { time: '3:00 PM', status: 'available' },
  { time: '4:00 PM', status: 'available' },
  { time: '5:00 PM', status: 'available' },
  { time: '5:30 PM', status: 'available' },
  { time: '6:00 PM', status: 'busy', label: 'Dinner Rush' },
  { time: '6:15 PM', status: 'available' },
  { time: '6:30 PM', status: 'available' },
  { time: '7:00 PM', status: 'available' },
  { time: '7:30 PM', status: 'available' },
];

export const MISSION_PRINCIPLES = [
  {
    num: '01',
    title: '100% Real, Whole Ingredients',
    tagline: 'Grown from the soil, not synthesized in a lab.',
    desc: 'Every item on our menu begins as a whole vegetable, unadulterated grain, clean protein, or cold-pressed herb. We reject ultra-refined starches, isolated soy proteins, artificial food dyes, and shelf-extending chemicals.',
    icon: 'Leaf',
  },
  {
    num: '02',
    title: 'Made In-House Every Day',
    tagline: 'Scratch cooking at 700 King West, every single morning.',
    desc: 'From our signature Peruvian Aji Verde to our 14-hour bone broths, chimichurri, massaged kales, and cold-pressed shots — everything is prepared from scratch by human hands right behind our counter.',
    icon: 'Utensils',
  },
  {
    num: '03',
    title: 'Rooted In Seasonality',
    tagline: 'Cool days bring warm flavours.',
    desc: 'Food tastes best when it is in season. When we cook with autumn squashes, crisp apples, hardy brassicas, and warming ginger, nature handles the flavour without relying on artificial concentrates or added syrups.',
    icon: 'Sparkles',
  },
  {
    num: '04',
    title: 'Radical Food Transparency',
    tagline: 'You deserve to know every single drop in your food.',
    desc: 'We proudly publish 100% of our ingredient lists. Zero hidden canola or soybean seed oils, zero factory emulsifiers, and zero chemical texturizers. What you read is exactly what enters your body.',
    icon: 'ShieldCheck',
  },
];

export const COMPARISON_MATRIX = [
  {
    category: 'Cooking Oils & Fats',
    standardFastCasual: 'Cheap industrial canola, soybean, cottonseed, or sunflower oils heated to high temps.',
    orchardKitchen: 'Single-origin Extra Virgin Olive Oil & pure Avocado Oil. 100% seed-oil free.',
  },
  {
    category: 'Sauces & Dressings',
    standardFastCasual: 'Pre-bagged factory dressings loaded with xanthan gum, modified corn starch & preservatives.',
    orchardKitchen: 'Blended fresh daily in-house using whole avocados, Greek yogurt, herbs, citrus & olive oil.',
  },
  {
    category: 'Stocks & Broths',
    standardFastCasual: 'Dehydrated bouillon cubes or paste concentrates with yeast extracts and excessive sodium.',
    orchardKitchen: 'Simmered slow in-house for 14 hours from pasture-raised bones, fresh mirepoix, and herbs.',
  },
  {
    category: 'Sweeteners',
    standardFastCasual: 'High fructose corn syrup, cane sugar, dextrose syrups, and artificial zero-cal sweeteners.',
    orchardKitchen: 'Zero refined sugar. Sweetened only by Ontario raw honey, pure maple syrup, or whole fruit.',
  },
  {
    category: 'Food Integrity',
    standardFastCasual: 'Pre-cooked, cryovac bagged ingredients shipped across countries and reheated.',
    orchardKitchen: 'Whole Ontario produce delivered fresh, chopped, roasted, and served on your plate.',
  },
];

export const DASHBOARD_METRICS = {
  notice: 'DEMO METRICS • Sized realistically for @orchardkitchen.to (~2,191 followers, 1 Toronto location)',
  stats: {
    visitsFromInstagram: {
      value: 482,
      trend: '+18.4% vs last week',
      subtitle: 'From bio link & reel comments',
    },
    menuViews: {
      value: 341,
      trend: '70.7% conversion to menu',
      subtitle: 'Average time on menu: 2m 14s',
    },
    pickupOrdersToday: {
      value: 38,
      trend: '38 completed / in-progress',
      subtitle: '$1,084.50 demo order volume',
    },
    emailSignups: {
      value: 14,
      trend: '342 total seasonal list',
      subtitle: 'King West locals opted in',
    },
    averageOrderValue: {
      value: '$28.54',
      trend: '1.7 items per pickup order',
      subtitle: 'High plate + shot attachment',
    },
    commissionSaved: {
      value: '$325.35',
      trend: 'Saved today vs Uber/DoorDash 30%',
      subtitle: 'Kept inside the restaurant',
    },
  },
  commentCampaigns: [
    {
      reelTitle: "What's in our Lomo Saltado? 🥩 (Zero Seed Oils)",
      views: '18.4k',
      comments: 142,
      linksSent: 128,
      ordersPlaced: 44,
      revenueGenerated: '$1,254.00',
      conversionRate: '34.3%',
    },
    {
      reelTitle: "Cool days bring warm flavours 🥣 (Yam & Ginger Soup)",
      views: '12.1k',
      comments: 98,
      linksSent: 89,
      ordersPlaced: 31,
      revenueGenerated: '$745.00',
      conversionRate: '34.8%',
    },
    {
      reelTitle: "Morning ginger-lemon fire shots 🍋 (Raw & Cold-Pressed)",
      views: '9.8k',
      comments: 64,
      linksSent: 58,
      ordersPlaced: 19,
      revenueGenerated: '$342.50',
      conversionRate: '32.7%',
    },
  ],
  recentOrders: [
    {
      id: '#OK-8422',
      customerName: 'J. Sample',
      pickupTime: '12:30 PM',
      items: 'Lomo Saltado Plate (1), Turmeric Shot (1)',
      total: '$24.00',
      status: 'Ready for Pickup',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: '#OK-8421',
      customerName: 'Customer A',
      pickupTime: '12:45 PM',
      items: 'Rotisserie Chicken Plate (1), Warm Focaccia (1)',
      total: '$24.00',
      status: 'Preparing in Kitchen',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      id: '#OK-8420',
      customerName: 'M. Chen',
      pickupTime: '1:00 PM',
      items: 'Fall Squash & Kale Bowl (1), Pom-Beet Shot (1)',
      total: '$21.50',
      status: 'Preparing in Kitchen',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      id: '#OK-8419',
      customerName: 'E. Vance',
      pickupTime: '12:15 PM',
      items: 'Cilantro Chicken Soup (1), Ginger Fire Shot (1)',
      total: '$18.50',
      status: 'Completed',
      statusColor: 'bg-stone-100 text-stone-700 border-stone-300',
    },
    {
      id: '#OK-8418',
      customerName: 'T. Bennett',
      pickupTime: '12:00 PM',
      items: 'Super Green Goddess Salad (1), Turmeric Shot (2)',
      total: '$26.50',
      status: 'Completed',
      statusColor: 'bg-stone-100 text-stone-700 border-stone-300',
    },
    {
      id: '#OK-8417',
      customerName: 'S. Miller',
      pickupTime: '11:45 AM',
      items: 'Roasted Potato & Cauliflower Bowl (1)',
      total: '$15.50',
      status: 'Completed',
      statusColor: 'bg-stone-100 text-stone-700 border-stone-300',
    },
  ],
  topItems: [
    { name: 'Lomo Saltado Plate', count: 16, revenue: '$296.00', tag: 'Plate' },
    { name: 'Turmeric-Pepper Shot', count: 14, revenue: '$77.00', tag: 'Shot' },
    { name: 'Rotisserie Chicken Plate', count: 11, revenue: '$192.50', tag: 'Plate' },
    { name: 'Fall Squash & Kale Bowl', count: 8, revenue: '$128.00', tag: 'Bowl' },
    { name: 'Yam & Ginger Soup', count: 7, revenue: '$84.00', tag: 'Soup' },
  ],
  weeklyVolume: [
    { day: 'Mon', lunch: 16, dinner: 12, total: 28 },
    { day: 'Tue', lunch: 18, dinner: 13, total: 31 },
    { day: 'Wed', lunch: 21, dinner: 15, total: 36 },
    { day: 'Thu', lunch: 24, dinner: 18, total: 42 },
    { day: 'Fri', lunch: 26, dinner: 23, total: 49 },
    { day: 'Sat', lunch: 22, dinner: 22, total: 44 },
    { day: 'Sun', lunch: 20, dinner: 18, total: 38 },
  ],
};
