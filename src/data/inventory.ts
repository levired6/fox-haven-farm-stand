// src/data/inventory.ts
import { Product } from '../types';

export const INVENTORY: Product[] = [
  // --- VEGETABLES ---
  {
    id: 'veg-1',
    name: 'Cucumbers',
    category: 'Vegetables',
    price: 1.50,
    unit: 'each',
    image: '/images/produce/cucumbers.png',
    description: 'Crisp, field-grown cucumbers harvested daily.',
    tasteProfile: 'Cool, refreshingly crisp, with a subtle sweet finish.'
  },
  {
    id: 'veg-2',
    name: 'Corn on the Cob',
    category: 'Vegetables',
    price: 0.75,
    unit: 'ear',
    image: 'images/produce/corn.png',
    description: 'Sweet bi-color sweetcorn fresh from the field.',
    tasteProfile: 'Juicy burst of natural sugar with tender kernels.'
  },
  {
    id: 'veg-3',
    name: 'Carrots',
    category: 'Vegetables',
    price: 3.00,
    unit: 'bunch',
    image: 'images/produce/carrots.png',
    description: 'Fresh pulled orange carrots with leafy green tops.',
    tasteProfile: 'Earthy, deeply sweet, and satisfyingly crunchy.'
  },
  {
    id: 'veg-4',
    name: 'Radishes',
    category: 'Vegetables',
    price: 2.50,
    unit: 'bunch',
    image: 'images/produce/radishes.png',
    description: 'Vibrant red round radishes.',
    tasteProfile: 'Peppery snap with a crisp, hydrating center.'
  },
  {
    id: 'veg-5',
    name: 'Green Peppers',
    category: 'Vegetables',
    price: 1.25,
    unit: 'each',
    image: 'images/produce/green-peppers.png',
    description: 'Thick-walled green bell peppers.',
    tasteProfile: 'Mildly tangy, herbaceous, and firm.'
  },
  {
    id: 'veg-6',
    name: 'Red Peppers',
    category: 'Vegetables',
    price: 1.75,
    unit: 'each',
    image: 'images/produce/red-peppers.png',
    description: 'Vine-ripened sweet red bell peppers.',
    tasteProfile: 'Richly sweet, fruity, and crunchy.'
  },
  {
    id: 'veg-7',
    name: 'Jalapeños',
    category: 'Vegetables',
    price: 0.50,
    unit: 'each',
    image: 'images/produce/jalapenos.png',
    description: 'Spicy fresh jalapeño peppers.',
    tasteProfile: 'Bright vegetable flavor with a zesty, medium kick.'
  },
  {
    id: 'veg-8',
    name: 'Yellow Squash',
    category: 'Vegetables',
    price: 2.00,
    unit: 'lb',
    image: 'images/produce/yellow-squash.png',
    description: 'Tender summer crookneck squash.',
    tasteProfile: 'Mild, buttery, and delicate.'
  },
  {
    id: 'veg-9',
    name: 'Zucchini',
    category: 'Vegetables',
    price: 2.00,
    unit: 'lb',
    image: 'images/produce/zucchini.png',
    description: 'Dark green farm-fresh zucchini.',
    tasteProfile: 'Nutty, tender, and subtle.'
  },
  {
    id: 'veg-10',
    name: 'Banana Peppers',
    category: 'Vegetables',
    price: 0.75,
    unit: 'each',
    image: 'images/produce/banana-pepper.png',
    description: 'Sweet or mild tangy banana peppers.',
    tasteProfile: 'Tangy, mild sweetness with a gentle zip.'
  },
  {
    id: 'veg-11',
    name: 'Red Tomatoes',
    category: 'Vegetables',
    price: 3.50,
    unit: 'lb',
    image: 'images/produce/tomato.png',
    description: 'Heirloom vine-ripened red tomatoes.',
    tasteProfile: 'Balanced acidity with a bursting, savory sweet flavor.'
  },
  {
    id: 'veg-12',
    name: 'Beets',
    category: 'Vegetables',
    price: 3.25,
    unit: 'bunch',
    image: 'images/produce/beets.png',
    description: 'Deep crimson garden beets.',
    tasteProfile: 'Rich, earthy sweetness with tender texture.'
  },
  {
    id: 'veg-13',
    name: 'Celery',
    category: 'Vegetables',
    price: 2.75,
    unit: 'head',
    image: 'images/produce/celery.png',
    description: 'Crisp organic celery heads.',
    tasteProfile: 'Salty, herbal snap with maximum hydration.'
  },
  {
    id: 'veg-14',
    name: 'Pumpkins',
    category: 'Vegetables',
    price: 6.00,
    unit: 'each',
    image: 'images/produce/pumpkin.png',
    description: 'Heirloom carving and pie pumpkins.',
    tasteProfile: 'Dense, earthy sweet interior flavor.'
  },

  // --- SALADS & GREENS ---
  {
    id: 'sal-1',
    name: 'Microgreens',
    category: 'Salads & Greens',
    price: 4.50,
    unit: 'container',
    image: 'images/produce/micro-greens.png',
    description: 'Nutrient-dense nutrient microgreen shoots.',
    tasteProfile: 'Intense concentrated green flavor with spicy mustard notes.'
  },
  {
    id: 'sal-2',
    name: 'Head Lettuce',
    category: 'Salads & Greens',
    price: 2.50,
    unit: 'head',
    image: 'images/produce/head-lettuce.png',
    description: 'Crisp butterhead lettuce.',
    tasteProfile: 'Mild, sweet, and silky crunch.'
  },
  {
    id: 'sal-3',
    name: 'Field Greens',
    category: 'Salads & Greens',
    price: 4.00,
    unit: 'bag',
    image: 'images/produce/field-greens.png',
    description: 'Fresh picked heirloom green leaf mix.',
    tasteProfile: 'Peppery, leafy, and light.'
  },
  {
    id: 'sal-4',
    name: 'Spring Mix Lettuce',
    category: 'Salads & Greens',
    price: 4.25,
    unit: 'bag',
    image: 'images/produce/spring-mix.png',
    description: 'Tender baby greens and red leaf lettuce.',
    tasteProfile: 'Soft, nutty, and delicate.'
  },
  {
    id: 'sal-5',
    name: 'Romaine Lettuce',
    category: 'Salads & Greens',
    price: 3.00,
    unit: 'head',
    image: 'images/produce/romaine.png',
    description: 'Classic crunchy green Romaine.',
    tasteProfile: 'Sturdy, juicy bite with a pleasant bitter finish.'
  },
  {
    id: 'sal-6',
    name: 'Jar Salads',
    category: 'Salads & Greens',
    price: 8.50,
    unit: 'jar',
    image: 'images/produce/jar-salad.png',
    description: 'Layered fresh veggies, greens, and house vinaigrette in Mason jars.',
    tasteProfile: 'Layered crunch, tangy dressing, and farm-fresh richness.'
  },

  // --- PANTRY & ARTISANAL ---
  {
    id: 'pantry-1',
    name: 'House Salad Dressings',
    category: 'Pantry & Artisanal',
    price: 6.00,
    unit: 'bottle',
    image: 'images/produce/dressing.png',
    description: 'Handcrafted farm dressings (Ranch, Creamy Herb, Vinaigrette).',
    tasteProfile: 'Rich, herbaceous, creamy, and zesty.'
  },
  {
    id: 'pantry-2',
    name: 'Artisan Pickles',
    category: 'Pantry & Artisanal',
    price: 7.00,
    unit: 'jar',
    image: 'images/produce/pickles.png',
    description: 'Garlic dill and sweet bread-and-butter pickles.',
    tasteProfile: 'Briny, garlic pack with a sharp vinegar snap.'
  },
  {
    id: 'pantry-3',
    name: 'Farmhouse Popcorn',
    category: 'Pantry & Artisanal',
    price: 4.00,
    unit: 'bag',
    image: 'images/produce/popcorn.png',
    description: 'Unpopped heirloom kernel corn.',
    tasteProfile: 'Nutty, light, and fluffy when popped.'
  },
  {
    id: 'pantry-4',
    name: 'Kettle Corn',
    category: 'Pantry & Artisanal',
    price: 5.50,
    unit: 'bag',
    image: 'images/produce/kettlecorn.png',
    description: 'Sweet and salty kettle popped corn.',
    tasteProfile: 'Irresistible balance of warm sugar and sea salt.'
  },
  {
    id: 'pantry-5',
    name: 'Local Honey',
    category: 'Pantry & Artisanal',
    price: 11.00,
    unit: 'jar',
    image: 'images/produce/honey.png',
    description: 'Raw wildflower honey gathered from local apiaries.',
    tasteProfile: 'Floral, velvety, naturally sweet with clover notes.'
  },
  {
    id: 'pantry-6',
    name: 'Dip Mixes',
    category: 'Pantry & Artisanal',
    price: 3.50,
    unit: 'packet',
    image: 'images/produce/dip-mix.png',
    description: 'Herb and spice blends for sour cream or cream cheese.',
    tasteProfile: 'Savory garlic, dill, and onion punch.'
  },
  {
    id: 'pantry-7',
    name: 'Herbal Teas',
    category: 'Pantry & Artisanal',
    price: 6.50,
    unit: 'bag',
    image: 'images/produce/tea.png',
    description: 'Dried mint, chamomile, and wildflower tea blends.',
    tasteProfile: 'Soothing botanicals with honeyed warmth.'
  },

  // --- MEATS & EGGS ---
  {
    id: 'meat-1',
    name: 'Pasture Pork Cuts',
    category: 'Meats & Eggs',
    price: 9.50,
    unit: 'lb',
    image: 'images/produce/pork-chops.png',
    description: 'Pasture-raised pork chops and sausage.',
    tasteProfile: 'Savory, rich marbling with clean natural flavor.'
  },
  {
    id: 'meat-2',
    name: 'Farm Chicken',
    category: 'Meats & Eggs',
    price: 6.50,
    unit: 'lb',
    image: 'images/produce/chicken.png',
    description: 'Free-range whole chicken and cuts.',
    tasteProfile: 'Tender, juicy, authentic farm poultry taste.'
  },
  {
    id: 'meat-3',
    name: 'Grass-Fed Beef',
    category: 'Meats & Eggs',
    price: 12.00,
    unit: 'lb',
    image: 'images/produce/beef.png',
    description: 'Grass-fed steaks and ground beef.',
    tasteProfile: 'Deep beefy umami with lean texture.'
  },
  {
    id: 'meat-4',
    name: 'Fresh Farm Eggs',
    category: 'Meats & Eggs',
    price: 5.00,
    unit: 'dozen',
    image: 'images/produce/eggs.png',
    description: 'Pasture-raised colorful farm eggs.',
    tasteProfile: 'Creamy, rich golden yolks with velvety texture.'
  },

  // --- BAKED GOODS ---
  {
    id: 'bake-1',
    name: 'Cinnamon Rolls',
    category: 'Baked Goods',
    price: 4.50,
    unit: 'each',
    image: 'images/produce/cinnamon-rolls.png',
    description: 'Giant warm cinnamon rolls with cream cheese frosting.',
    tasteProfile: 'Pillowy dough, warm cinnamon spice, and gooey glaze.'
  },
  {
    id: 'bake-2',
    name: 'Pumpkin Gooey Butter Cake',
    category: 'Baked Goods',
    price: 5.50,
    unit: 'slice',
    image: 'images/produce/pumpkin-gooey-butter-cake.png',
    description: 'Rich pumpkin spiced butter cake with a gooey center.',
    tasteProfile: 'Decadent butter crust, pumpkin pie spice, and melt-in-your-mouth center.'
  },
  {
    id: 'bake-3',
    name: 'Gooey Butter Cake',
    category: 'Baked Goods',
    price: 5.00,
    unit: 'slice',
    image: 'images/produce/gooey-butter-cake.png',
    description: 'Traditional St. Louis style gooey butter cake.',
    tasteProfile: 'Ultra-sweet, buttery, rich, with a crispy vanilla top layer.'
  },
  {
    id: 'bake-4',
    name: 'Chocolate Fudge Cake',
    category: 'Baked Goods',
    price: 5.00,
    unit: 'slice',
    image: 'images/produce/chocolate-fudge-cake.png',
    description: 'Moist triple chocolate layer cake.',
    tasteProfile: 'Deep dark cocoa, velvety ganache, and decadent richness.'
  },
  {
    id: 'bake-5',
    name: 'Fresh Baked Cookies',
    category: 'Baked Goods',
    price: 2.50,
    unit: 'each',
    image: 'images/produce/chocolate-chip-cookies.png',
    description: 'Chocolate chip, oatmeal raisin, and peanut butter.',
    tasteProfile: 'Crisp edges, soft chewy center, melted chocolate chips.'
  },
  {
    id: 'bake-6',
    name: 'Fudge Brownies',
    category: 'Baked Goods',
    price: 3.50,
    unit: 'each',
    image: 'images/produce/fudge-brownies.png',
    description: 'Thick chocolate fudge brownies with crackly top.',
    tasteProfile: 'Dense, rich, intensely chocolatey and fudgy.'
  },

  // --- APPAREL & GOODS ---
  {
    id: 'app-1',
    name: 'Handpoured Farm Candles',
    category: 'Apparel & Goods',
    price: 16.00,
    unit: 'each',
    image: 'images/produce/candle.png',
    description: 'Soy wax candles infused with apple cider & honey scents.',
    tasteProfile: 'Warm vanilla, cedarwood, and sweet honey fragrance.'
  },
  {
    id: 'app-2',
    name: 'Fox Haven Tee Shirt',
    category: 'Apparel & Goods',
    price: 22.00,
    unit: 'shirt',
    image: 'images/merch/tshirt.png',
    description: 'Soft cotton vintage logo shirt.',
    tasteProfile: 'Ultra-soft blend, breathable, and comfortable fit.'
  },

  // --- ADULT BEVERAGES (AGE RESTRICTED 21+) ---
  {
    id: 'alc-1',
    name: 'Fox Haven Farmhouse Ale',
    category: 'Adult Beverages',
    price: 14.00,
    unit: '4-pack',
    image: 'images/produce/farmhouse-ale.png',
    description: 'Craft brewed crisp farmhouse pale ale.',
    tasteProfile: 'Citrusy hop aroma, light malt backbone, dry crisp finish.',
    isAgeRestricted: true,
    abv: '5.8% ABV'
  },
  {
    id: 'alc-2',
    name: 'Harvest Amber Porter',
    category: 'Adult Beverages',
    price: 15.00,
    unit: '4-pack',
    image: 'images/produce/amber-porter.png',
    description: 'Dark roasted amber beer brewed on site.',
    tasteProfile: 'Toasted caramel, chocolate malt, and dark fruit undertones.',
    isAgeRestricted: true,
    abv: '6.4% ABV'
  },
  {
    id: 'alc-3',
    name: 'Estate Red Wine',
    category: 'Adult Beverages',
    price: 24.00,
    unit: 'bottle',
    image: 'images/produce/red-wine.png',
    description: 'Small batch fermented red grape wine.',
    tasteProfile: 'Blackberry, oak spice, smooth tannins, and vanilla note.',
    isAgeRestricted: true,
    abv: '13.5% ABV'
  },
  {
    id: 'alc-4',
    name: 'Estate White Wine',
    category: 'Adult Beverages',
    price: 22.00,
    unit: 'bottle',
    image: 'images/produce/white-wine.png',
    description: 'Crisp chilled white wine blend.',
    tasteProfile: 'Green apple, pear, floral honeysuckle, bright acidity.',
    isAgeRestricted: true,
    abv: '12.0% ABV'
  },
  {
    id: 'alc-5',
    name: 'Fox Haven Apple Moonshine',
    category: 'Adult Beverages',
    price: 32.00,
    unit: 'jar',
    image: 'images/produce/moonshine.png',
    description: 'Traditional corn mash spirit infused with farm cider.',
    tasteProfile: 'Strong warm grain kick, sweet cinnamon apple finish.',
    isAgeRestricted: true,
    abv: '45.0% ABV'
  }
];