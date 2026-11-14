export type DrawerTab = 'shop' | 'collections' | 'journal' | 'cart' | null;

export interface CatalogItem {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  tag: string;
}

export interface CartItem extends CatalogItem {
  cartItemId: string;
}

export interface CollectionItem {
  series: string;
  title: string;
  description: string;
}

export interface JournalEntry {
  date: string;
  title: string;
  readTime: string;
}

export const BG_IMAGE_1 =
  '/assets/aistudio/Gemini_Generated_Image_unboq1unboq1unbo_2705c74d.jpg';

export const BG_IMAGE_2 =
  '/assets/aistudio/Chrome_Visor_at_Sunset_857aa7e5.png';

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'cyber-tex-overcoat',
    title: 'CYBER-TEX OVERCOAT',
    price: 850,
    priceLabel: '$850',
    tag: 'LIMITED EDITION',
  },
  {
    id: 'geo-mesh-tech-hoodie',
    title: 'GEO-MESH TECH HOODIE',
    price: 320,
    priceLabel: '$320',
    tag: 'NEW DROP',
  },
  {
    id: 'orbital-tapered-trousers',
    title: 'ORBITAL TAPERED TROUSERS',
    price: 290,
    priceLabel: '$290',
    tag: 'IN STOCK',
  },
  {
    id: 'modular-all-weather-vest',
    title: 'MODULAR ALL-WEATHER VEST',
    price: 410,
    priceLabel: '$410',
    tag: 'PRE-ORDER',
  },
];

export const COLLECTIONS_ITEMS: CollectionItem[] = [
  {
    series: 'SERIES 01',
    title: 'SYNTHETIC HORIZONS',
    description:
      'Ultra-durable weather-sealed fabrics with minimalist silhouette architecture.',
  },
  {
    series: 'SERIES 02',
    title: 'KINETIC FORM',
    description:
      'Ergonomic streetwear designed for maximum mobility and temperature equilibrium.',
  },
  {
    series: 'SERIES 03',
    title: 'MONOCHROME ZERO',
    description:
      'Pure black and white structural tailoring crafted from 100% recycled polymers.',
  },
];

export const JOURNAL_ITEMS: JournalEntry[] = [
  {
    date: 'AUG 2026',
    title: 'THE ARCHITECTURE OF NEXT-GEN TEXTILES',
    readTime: '4 MIN READ',
  },
  {
    date: 'JUL 2026',
    title: 'CIRCULAR DESIGN IN HIGH-END APPAREL',
    readTime: '6 MIN READ',
  },
  {
    date: 'JUN 2026',
    title: 'MINIMALISM AS A FUNCTIONAL STATEMENT',
    readTime: '3 MIN READ',
  },
];
