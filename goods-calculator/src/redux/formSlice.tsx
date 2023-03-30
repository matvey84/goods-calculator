import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { configBD } from '../DATA/data';
import {
  ICommonConfig,
  ICommonMaterials,
  IFix,
  IFixConfig,
  IFrame,
  IList,
  IMaterial,
  IPipe,
  ISize,
} from '../types/types';

interface IFormSlice {
  materialBD: ICommonMaterials[];
  configBD: ICommonConfig[];
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
  currentFixValue: number | undefined;
  currentFixID: string;
  currentFix: string;
}
const initialState: IFormSlice = {
  materialBD: [],
  configBD: configBD,
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
  currentFixValue: 5,
  currentFixID: '',
  currentFix: '',
};
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    getDataAction(state, action: PayloadAction<ICommonMaterials[]>) {
      state.materialBD = action.payload;
      state.goodsType = Array.from(new Set(action.payload.map((material) => material.type)));

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
      state.configBD = action.payload;
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
    getFixValue(state, action: PayloadAction<string>) {
      const currentListMaterial: IList = JSON.parse(action.payload);
      const currentFixConfig = state.allFixConfig.find(
        (config) => config.key === currentListMaterial.material
      );
      state.currentFixValue = currentFixConfig?.value;
    },
    getFixID(state, action: PayloadAction<string>) {
      const f: IFix = JSON.parse(action.payload);
      state.currentFixID = f.id;
      state.currentFix = action.payload;
    },
  },
});
export const { getDataAction, getConfigAction, getFilterListsAction, getFixValue, getFixID } =
  formSlice.actions;
export default formSlice.reducer;
