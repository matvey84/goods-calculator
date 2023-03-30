import { AppDispatch } from '../redux/store';
import { IOrderFormData } from '../types/types';

export const orderCreater = (data: IOrderFormData) => (dispatch: AppDispatch) => {
  console.log(data);
};
