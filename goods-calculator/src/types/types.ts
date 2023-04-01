export interface ICommonMaterials {
  id: string;
  type: string;
  name: string;
  material?: string;
  unit: string;
  width?: number;
  price: number;
}

export interface IList {
  id: string;
  type: string;
  name: string;
  material: string;
  unit: string;
  width: number;
  price: number;
}
export interface IPipe {
  id: string;
  type: string;
  name: string;
  unit: string;
  width: number;
  price: number;
}
export interface IFix {
  id: string;
  type: string;
  name: string;
  unit: string;
  price: number;
}

export interface ICommonConfig {
  type: string;
  key: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

export interface ISize {
  type: string;
  key: string;
  name: string;
  min: number;
  max: number;
  step: number;
}
export interface IFrame {
  type: string;
  key: string;
  name: string;
  step: number;
}
export interface IMaterial {
  type: string;
  key: string;
  name: string;
}
export interface IFixConfig {
  type: string;
  key: string;
  name: string;
  value: number;
}

export interface IOrderFormData {
  list: string;
  pipe: string;
  frameStep: string;
  width: string;
  length: string;
  category: string;
  fixValue: string;
  fix: string;
  [x: string]: string;
}

export type orderFormDataConfig = {
  type: string;
  fixValue: string;
  length: string;
  width: string;
  frameStep: string;
  [x: string]: string;
};

export interface currentOrderData {
  id: string;
  pipe: string;
  list: string;
  fix: string;
  orderConfig: string;
}

export type parsedOrderData = {
  id: string;
  pipe: IPipe;
  list: IList;
  fix: IFix;
  orderConfig: orderFormDataConfig;
};

export type commonParsedOrderData = {
  type: string;
  name: string;
  material?: string;
  unit: string;
  width?: string;
  price: string;
  id: string;
};

export interface IOrder {
  id: string;
  orderFormDataID: string;
  type: string;
  name: string;
  unit: string;
  price: string;
  ammount: string;
  commonCost: string;
  nds: string;
  costNDS: string;
  [x: string]: string;
}
