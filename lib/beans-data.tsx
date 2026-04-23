import type { ReactNode } from 'react';

export interface ReserveBean {
  origin: string;
  cat: string;
  name: ReactNode[];
  desc: string;
  price: string;
}

export const reserveItems: ReserveBean[] = [
  {
    origin: 'Ethiopia · Sidamo',
    cat: 'Single Origin',
    name: ['Ethiopian ', <em key="si">Sidamo</em>],
    desc: 'Sun-dried in the Sidamo highlands. Bright berry notes, a floral lift, and a clean, lingering finish.',
    price: 'From $22',
  },
  {
    origin: 'Colombia · Excelso',
    cat: 'Single Origin',
    name: ['Colombia ', <em key="ex">Excelso</em>],
    desc: 'A versatile Colombian with caramel sweetness, mild citrus acidity, and a smooth, rounded body.',
    price: 'From $22',
  },
  {
    origin: 'Costa Rica · Tarrazú',
    cat: 'Single Origin',
    name: ['Costa Rica ', <em key="ta">Tarrazú</em>],
    desc: 'Grown at altitude in the Tarrazú valley. Honey-toned, bright, with a rich cocoa undertone.',
    price: 'From $22',
  },
  {
    origin: 'House Blend',
    cat: 'Signature',
    name: ['Mokha ', <em key="eb">Espresso Blend</em>],
    desc: 'Our house signature — crafted for espresso. Bold, balanced, with dark chocolate and a velvety crema.',
    price: 'From $22',
  },
];
