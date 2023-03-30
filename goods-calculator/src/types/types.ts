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
  frameStep: number;
  width: string;
  length: string;
  category: string;
  fixValue: number;
  fixPrice: number | string;
}
