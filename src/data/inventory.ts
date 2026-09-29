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
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=400',
    description: 'Crisp, field-grown cucumbers harvested daily.',
    tasteProfile: 'Cool, refreshingly crisp, with a subtle sweet finish.'
  },
  {
    id: 'veg-2',
    name: 'Corn on the Cob',
    category: 'Vegetables',
    price: 0.75,
    unit: 'ear',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=400',
    description: 'Sweet bi-color sweetcorn fresh from the field.',
    tasteProfile: 'Juicy burst of natural sugar with tender kernels.'
  },
  {
    id: 'veg-3',
    name: 'Carrots',
    category: 'Vegetables',
    price: 3.00,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1598170845058-12ef4a4575c1?q=80&w=400',
    description: 'Fresh pulled orange carrots with leafy green tops.',
    tasteProfile: 'Earthy, deeply sweet, and satisfyingly crunchy.'
  },
  {
    id: 'veg-4',
    name: 'Radishes',
    category: 'Vegetables',
    price: 2.50,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400',
    description: 'Vibrant red round radishes.',
    tasteProfile: 'Peppery snap with a crisp, hydrating center.'
  },
  {
    id: 'veg-5',
    name: 'Green Peppers',
    category: 'Vegetables',
    price: 1.25,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=400',
    description: 'Thick-walled green bell peppers.',
    tasteProfile: 'Mildly tangy, herbaceous, and firm.'
  },
  {
    id: 'veg-6',
    name: 'Red Peppers',
    category: 'Vegetables',
    price: 1.75,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1526346698389-224221b4b02d?q=80&w=400',
    description: 'Vine-ripened sweet red bell peppers.',
    tasteProfile: 'Richly sweet, fruity, and crunchy.'
  },
  {
    id: 'veg-7',
    name: 'Jalapeños',
    category: 'Vegetables',
    price: 0.50,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=400',
    description: 'Spicy fresh jalapeño peppers.',
    tasteProfile: 'Bright vegetable flavor with a zesty, medium kick.'
  },
  {
    id: 'veg-8',
    name: 'Yellow Squash',
    category: 'Vegetables',
    price: 2.00,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=400',
    description: 'Tender summer crookneck squash.',
    tasteProfile: 'Mild, buttery, and delicate.'
  },
  {
    id: 'veg-9',
    name: 'Zucchini',
    category: 'Vegetables',
    price: 2.00,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=400',
    description: 'Dark green farm-fresh zucchini.',
    tasteProfile: 'Nutty, tender, and subtle.'
  },
  {
    id: 'veg-10',
    name: 'Banana Peppers',
    category: 'Vegetables',
    price: 0.75,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400',
    description: 'Sweet or mild tangy banana peppers.',
    tasteProfile: 'Tangy, mild sweetness with a gentle zip.'
  },
  {
    id: 'veg-11',
    name: 'Red Tomatoes',
    category: 'Vegetables',
    price: 3.50,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=400',
    description: 'Heirloom vine-ripened red tomatoes.',
    tasteProfile: 'Balanced acidity with a bursting, savory sweet flavor.'
  },
  {
    id: 'veg-12',
    name: 'Beets',
    category: 'Vegetables',
    price: 3.25,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=400',
    description: 'Deep crimson garden beets.',
    tasteProfile: 'Rich, earthy sweetness with tender texture.'
  },
  {
    id: 'veg-13',
    name: 'Celery',
    category: 'Vegetables',
    price: 2.75,
    unit: 'head',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400',
    description: 'Crisp organic celery heads.',
    tasteProfile: 'Salty, herbal snap with maximum hydration.'
  },
  {
    id: 'veg-14',
    name: 'Pumpkins',
    category: 'Vegetables',
    price: 6.00,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400',
    description: 'Nutrient-dense nutrient microgreen shoots.',
    tasteProfile: 'Intense concentrated green flavor with spicy mustard notes.'
  },
  {
    id: 'sal-2',
    name: 'Head Lettuce',
    category: 'Salads & Greens',
    price: 2.50,
    unit: 'head',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=400',
    description: 'Crisp butterhead lettuce.',
    tasteProfile: 'Mild, sweet, and silky crunch.'
  },
  {
    id: 'sal-3',
    name: 'Field Greens',
    category: 'Salads & Greens',
    price: 4.00,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400',
    description: 'Fresh picked heirloom green leaf mix.',
    tasteProfile: 'Peppery, leafy, and light.'
  },
  {
    id: 'sal-4',
    name: 'Spring Mix Lettuce',
    category: 'Salads & Greens',
    price: 4.25,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400',
    description: 'Tender baby greens and red leaf lettuce.',
    tasteProfile: 'Soft, nutty, and delicate.'
  },
  {
    id: 'sal-5',
    name: 'Romaine Lettuce',
    category: 'Salads & Greens',
    price: 3.00,
    unit: 'head',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=400',
    description: 'Classic crunchy green Romaine.',
    tasteProfile: 'Sturdy, juicy bite with a pleasant bitter finish.'
  },
  {
    id: 'sal-6',
    name: 'Jar Salads',
    category: 'Salads & Greens',
    price: 8.50,
    unit: 'jar',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=400',
    description: 'Handcrafted farm dressings (Ranch, Creamy Herb, Vinaigrette).',
    tasteProfile: 'Rich, herbaceous, creamy, and zesty.'
  },
  {
    id: 'pantry-2',
    name: 'Artisan Pickles',
    category: 'Pantry & Artisanal',
    price: 7.00,
    unit: 'jar',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400',
    description: 'Garlic dill and sweet bread-and-butter pickles.',
    tasteProfile: 'Briny, garlic pack with a sharp vinegar snap.'
  },
  {
    id: 'pantry-3',
    name: 'Farmhouse Popcorn',
    category: 'Pantry & Artisanal',
    price: 4.00,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=400',
    description: 'Unpopped heirloom kernel corn.',
    tasteProfile: 'Nutty, light, and fluffy when popped.'
  },
  {
    id: 'pantry-4',
    name: 'Kettle Corn',
    category: 'Pantry & Artisanal',
    price: 5.50,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=400',
    description: 'Sweet and salty kettle popped corn.',
    tasteProfile: 'Irresistible balance of warm sugar and sea salt.'
  },
  {
    id: 'pantry-5',
    name: 'Local Honey',
    category: 'Pantry & Artisanal',
    price: 11.00,
    unit: 'jar',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=400',
    description: 'Raw wildflower honey gathered from local apiaries.',
    tasteProfile: 'Floral, velvety, naturally sweet with clover notes.'
  },
  {
    id: 'pantry-6',
    name: 'Dip Mixes',
    category: 'Pantry & Artisanal',
    price: 3.50,
    unit: 'packet',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=400',
    description: 'Herb and spice blends for sour cream or cream cheese.',
    tasteProfile: 'Savory garlic, dill, and onion punch.'
  },
  {
    id: 'pantry-7',
    name: 'Herbal Teas',
    category: 'Pantry & Artisanal',
    price: 6.50,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=400',
    description: 'Pasture-raised pork chops and sausage.',
    tasteProfile: 'Savory, rich marbling with clean natural flavor.'
  },
  {
    id: 'meat-2',
    name: 'Farm Chicken',
    category: 'Meats & Eggs',
    price: 6.50,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=400',
    description: 'Free-range whole chicken and cuts.',
    tasteProfile: 'Tender, juicy, authentic farm poultry taste.'
  },
  {
    id: 'meat-3',
    name: 'Grass-Fed Beef',
    category: 'Meats & Eggs',
    price: 12.00,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=400',
    description: 'Grass-fed steaks and ground beef.',
    tasteProfile: 'Deep beefy umami with lean texture.'
  },
  {
    id: 'meat-4',
    name: 'Fresh Farm Eggs',
    category: 'Meats & Eggs',
    price: 5.00,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400',
    description: 'Giant warm cinnamon rolls with cream cheese frosting.',
    tasteProfile: 'Pillowy dough, warm cinnamon spice, and gooey glaze.'
  },
  {
    id: 'bake-2',
    name: 'Pumpkin Gooey Butter Cake',
    category: 'Baked Goods',
    price: 5.50,
    unit: 'slice',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=400',
    description: 'Rich pumpkin spiced butter cake with a gooey center.',
    tasteProfile: 'Decadent butter crust, pumpkin pie spice, and melt-in-your-mouth center.'
  },
  {
    id: 'bake-3',
    name: 'Gooey Butter Cake',
    category: 'Baked Goods',
    price: 5.00,
    unit: 'slice',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=400',
    description: 'Traditional St. Louis style gooey butter cake.',
    tasteProfile: 'Ultra-sweet, buttery, rich, with a crispy vanilla top layer.'
  },
  {
    id: 'bake-4',
    name: 'Chocolate Fudge Cake',
    category: 'Baked Goods',
    price: 5.00,
    unit: 'slice',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400',
    description: 'Moist triple chocolate layer cake.',
    tasteProfile: 'Deep dark cocoa, velvety ganache, and decadent richness.'
  },
  {
    id: 'bake-5',
    name: 'Fresh Baked Cookies',
    category: 'Baked Goods',
    price: 2.50,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=400',
    description: 'Chocolate chip, oatmeal raisin, and peanut butter.',
    tasteProfile: 'Crisp edges, soft chewy center, melted chocolate chips.'
  },
  {
    id: 'bake-6',
    name: 'Fudge Brownies',
    category: 'Baked Goods',
    price: 3.50,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=400',
    description: 'Soy wax candles infused with apple cider & honey scents.',
    tasteProfile: 'Warm vanilla, cedarwood, and sweet honey fragrance.'
  },
  {
    id: 'app-2',
    name: 'Fox Haven Tee Shirt',
    category: 'Apparel & Goods',
    price: 22.00,
    unit: 'shirt',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?q=80&w=400',
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
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=400',
    description: 'Traditional corn mash spirit infused with farm cider.',
    tasteProfile: 'Strong warm grain kick, sweet cinnamon apple finish.',
    isAgeRestricted: true,
    abv: '45.0% ABV'
  }
];