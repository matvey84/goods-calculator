import { nanoid } from '@reduxjs/toolkit';

export const matterialBD = [
  {
    type: 'list',
    name: 'Лист-1 0.5 ширина 1.8м',
    material: 'plastic',
    unit: 'м2',
    width: 1.8,
    price: 12,
  },
  {
    type: 'list',
    name: 'Лист-2 0.5 ширина 1.5м',
    material: 'plastic',
    unit: 'м2',
    width: 1.5,
    price: 15,
  },
  {
    type: 'list',
    name: 'Лист-3 0.5 ширина 1.2м',
    material: 'plastic',
    unit: 'м2',
    width: 1.2,
    price: 15,
  },
  {
    type: 'list',
    name: 'Лист-4 0.7 ширина 1.8м',
    material: 'plastic',
    unit: 'м2',
    width: 1.8,
    price: 17,
  },
  {
    type: 'list',
    name: 'Лист-5 0.7 ширина 1.5м',
    material: 'plastic',
    unit: 'м2',
    width: 1.5,
    price: 20,
  },
  {
    type: 'list',
    name: 'Лист-6 0.7 ширина 1.2м',
    material: 'plastic',
    unit: 'м2',
    width: 1.2,
    price: 22,
  },

  {
    type: 'list',
    name: 'Лист-7 0.3 ширина 1м',
    material: 'metal',
    unit: 'м2',
    width: 1,
    price: 25,
  },
  {
    type: 'list',
    name: 'Лист-8 0.3 ширина 0.75м',
    material: 'metal',
    unit: 'м2',
    width: 0.75,
    price: 20,
  },
  {
    type: 'list',
    name: 'Лист-9 0.3 ширина 0.5м',
    material: 'metal',
    unit: 'м2',
    width: 0.5,
    price: 15,
  },
  {
    type: 'list',
    name: 'Лист-10 0.5 ширина 1м',
    material: 'metal',
    unit: 'м2',
    width: 1,
    price: 30,
  },
  {
    type: 'list',
    name: 'Лист-11 0.5 ширина 0.75м',
    material: 'metal',
    unit: 'м2',
    width: 0.75,
    price: 26,
  },
  {
    type: 'list',
    name: 'Лист-12 0.5 ширина 0.5м',
    material: 'metal',
    unit: 'м2',
    width: 0.5,
    price: 22,
  },

  {
    type: 'pipe',
    name: 'Труба 20х20',
    unit: 'мп',
    width: 20,
    price: 18,
  },
  {
    type: 'pipe',
    name: 'Труба 30х30',
    unit: 'мп',
    width: 30,
    price: 18,
  },

  {
    type: 'fix',
    name: 'Саморез стандартный',
    unit: 'шт',
    price: 1.1,
  },
  {
    type: 'fix',
    name: 'Саморез усиленный',
    unit: 'шт',
    price: 2.2,
  },
].map((materials) => {
  return {
    ...materials,
    id: nanoid(),
  };
});

export const configBD = [
  {
    type: 'size',
    key: 'length',
    name: 'Длина',
    min: 5,
    max: 50,
    step: 0.2,
  },
  {
    type: 'size',
    key: 'width',
    name: 'Ширина',
    min: 5,
    max: 25,
    step: 0.2,
  },
  {
    type: 'frame',
    key: 'light',
    name: 'Легкая',
    step: 1.2,
  },
  {
    type: 'frame',
    key: 'standard',
    name: 'Стандартная',
    step: 1,
  },
  {
    type: 'frame',
    key: 'strong',
    name: 'Усиленная',
    step: 0.8,
  },
  {
    type: 'material',
    key: 'metal',
    name: 'Металл',
  },
  {
    type: 'material',
    key: 'plastic',
    name: 'Пластик',
  },
  {
    type: 'material',
    key: 'all',
    name: 'Все',
  },
  {
    type: 'fix',
    key: 'plastic',
    name: 'Пластик',
    value: 10,
  },
  {
    type: 'fix',
    key: 'metal',
    name: 'Металл',
    value: 5,
  },
];
