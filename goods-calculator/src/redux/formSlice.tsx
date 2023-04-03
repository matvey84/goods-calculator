import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ICommonConfig,
  ICommonMaterials,
  IFix,
  IFixConfig,
  IFrame,
  IList,
  IMaterial,
  IOrder,
  IPipe,
  ISize,
  parsedOrderData,
} from '../types/types';

interface IFormSlice {
  goodsType: string[];
  allLists: IList[];
  pipes: IPipe[];
  allFix: IFix[];
  allFrames: IFrame[];
  allFixConfig: IFixConfig[];
  sizeInputConfig: ISize[];
  filterCategory: IMaterial[];
  filteredList: IList[];
  listMaterial: string;
  currentFixID: string;
  orderFormDataList: parsedOrderData[];
  orderList: IOrder[][];
  editOrderFormData: parsedOrderData | null;
  isEditOrder: boolean;
}
const initialState: IFormSlice = {
  goodsType: [],
  allLists: [],
  pipes: [],
  allFix: [],
  allFrames: [],
  allFixConfig: [],
  sizeInputConfig: [],
  filterCategory: [],
  filteredList: [],
  listMaterial: 'all',
  currentFixID: '',
  orderFormDataList: [],
  orderList: [],
  editOrderFormData: null,
  isEditOrder: false,
};
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    getDataAction(state, action: PayloadAction<ICommonMaterials[]>) {
      const arr = Array.from(new Set(action.payload.map((material) => material.type)));
      state.goodsType = [...arr, 'orderConfig'];

      state.allLists = action.payload.filter(
        (material) => material.type === 'list'
      ) as Required<IList>[];

      state.pipes = action.payload.filter(
        (material) => material.type === 'pipe'
      ) as Required<IPipe>[];

      state.allFix = action.payload.filter(
        (material) => material.type === 'fix'
      ) as Required<IFix>[];
    },
    getConfigAction(state, action: PayloadAction<ICommonConfig[]>) {
      state.sizeInputConfig = action.payload.filter(
        (config) => config.type === 'size'
      ) as Required<ISize>[];

      state.filterCategory = action.payload.filter(
        (config) => config.type === 'material'
      ) as Required<IMaterial>[];

      state.allFrames = action.payload.filter(
        (config) => config.type === 'frame'
      ) as Required<IFrame>[];

      state.allFixConfig = action.payload.filter(
        (config) => config.type === 'fix'
      ) as Required<IFixConfig>[];
    },
    getFilterListsAction(state, action: PayloadAction<string>) {
      state.listMaterial = action.payload;
      state.filteredList = state.allLists.filter(
        (material) => material.material === action.payload
      );
    },
    getFixID(state, action: PayloadAction<string>) {
      state.currentFixID = action.payload;
    },
    setOrderFormList(state, action: PayloadAction<parsedOrderData>) {
      state.orderFormDataList = [...state.orderFormDataList, action.payload];
    },

    setOrderList(state, action: PayloadAction<IOrder[]>) {
      state.orderList = state.orderList.some((order) =>
        order.some((order) => order.orderFormDataID === action.payload[0].orderFormDataID)
      )
        ? state.orderList.map((order) => {
            return order.some((obj) =>
              action.payload.every((order) => order.orderFormDataID === obj.orderFormDataID)
            )
              ? action.payload
              : order;
          })
        : [...state.orderList, action.payload];
    },
    removeOrder(state, action: PayloadAction<string>) {
      state.orderList = state.orderList.filter((arr) => arr[0].orderFormDataID !== action.payload);
      state.orderFormDataList = state.orderFormDataList.filter((obj) => obj.id !== action.payload);
    },
    resetStore(state) {
      state.currentFixID = '';
      state.isEditOrder = false;
      state.editOrderFormData = null;
    },
    getEditFormOrderData(state, action: PayloadAction<string>) {
      state.isEditOrder = !state.isEditOrder;
      state.editOrderFormData = state.orderFormDataList.find((data) => data.id === action.payload)!;
    },
  },
});
export const {
  getDataAction,
  getConfigAction,
  getFilterListsAction,
  getFixID,
  setOrderFormList,
  setOrderList,
  removeOrder,
  resetStore,
  getEditFormOrderData,
} = formSlice.actions;
export default formSlice.reducer;
