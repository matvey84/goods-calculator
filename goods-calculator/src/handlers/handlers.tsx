import { setOrderList } from '../redux/formSlice';
import { AppDispatch } from '../redux/store';
import {
  IOrder,
  calculatorType,
  commonParsedOrderData,
  currentOrderData,
  orderFormDataConfig,
  parsedOrderData,
} from '../types/types';

export const orderCreater =
  (data: parsedOrderData, goodsType: string[]) => (dispatch: AppDispatch) => {
    const { id, list, orderConfig } = data;
    const filteredGoodTypes = goodsType.filter((type) => type !== 'orderConfig');
    const mocObj: IOrder = {
      id: '',
      orderFormDataID: id,
      name: '',
      unit: '',
      ammount: '',
      price: '',
      listsValue: '',
      commonCost: '',
      nds: '',
      costNDS: '',
      type: '',
    };
    const orders: IOrder[] = Array(filteredGoodTypes.length)
      .fill(mocObj)
      .map((obj: IOrder, i) => {
        return {
          ...obj,
          type: goodsType[i],
        };
      });
    const mappedData = Object.entries(data);
    const fillOrders = orders.map((order, i) => {
      if (mappedData.some((entries) => entries[0] === order.type)) {
        const obj = mappedData[i + 1][1] as unknown as commonParsedOrderData;
        return {
          ...order,
          id: obj.id,
          name: obj.name,
          price: String(obj.price),
          unit: obj.unit,
          listsValue: String(calculator(obj, orderConfig, list.width)!.listsValue),
          ammount: String(calculator(obj, orderConfig, list.width)!.ammount),
          commonCost: String(calculator(obj, orderConfig, list.width)!.commonCost),
          nds: '20',
          costNDS: String(calculator(obj, orderConfig, list.width)!.costNDS),
        };
      }
      return order;
    });
    dispatch(setOrderList(fillOrders));
  };

export const dataParser = (data: currentOrderData, goodsType: string[]): parsedOrderData => {
  const workData = Object.fromEntries(
    Object.entries(data).map((prop) => {
      return goodsType.some((type) => type === prop[0]) ? [prop[0], JSON.parse(prop[1])] : prop;
    })
  ) as parsedOrderData;
  return workData;
};

export const calculator = (
  obj: commonParsedOrderData,
  orderConfig: orderFormDataConfig,
  listWidth: number
): calculatorType | undefined => {
  const listLength = 1;
  const oneListArea = listWidth * listLength;
  const converterMM = 1000;
  const constructionArea = (Number(orderConfig.length) * Number(orderConfig.width)) / converterMM;
  const sidePipesAmmount = 2;
  const sidePipesLenght = (Number(orderConfig.width) * sidePipesAmmount) / converterMM;
  const nds = 20;
  const persent = 100;

  switch (obj.type) {
    case 'list':
      const listsValue = constructionArea / Number(obj.width) / converterMM;
      const commonValueListArea = oneListArea * listsValue;
      const commonCostList = commonValueListArea * Number(obj.price);
      const listCostNDS = commonCostList * ((nds + persent) / persent);
      return {
        listsValue: Number(listsValue.toFixed(2)),
        commonCost: Number(commonCostList.toFixed(2)),
        ammount: Math.ceil(commonValueListArea),
        costNDS: Number(listCostNDS.toFixed(2)),
      };
    case 'pipe':
      const longPpieAmmount = Math.ceil((Number(orderConfig.width) / listWidth + 1) / converterMM);
      const oneLongPipeLenght = Number(orderConfig.length) - Number(obj.width) * sidePipesAmmount;
      const longPipesLenght = (longPpieAmmount * oneLongPipeLenght) / converterMM;

      const betweenPipeAmmount = Math.ceil(
        ((Number(orderConfig.length) / Number(orderConfig.frameStep)) * Number(orderConfig.width)) /
          converterMM -
          1
      );
      const oneBetweenPipeLenght =
        ((Number(orderConfig.length) - Number(obj.width) * longPpieAmmount) / longPpieAmmount - 1) /
        converterMM;
      const betweenPipeLength = oneBetweenPipeLenght * betweenPipeAmmount;

      const commonPipeLength = Math.ceil(betweenPipeLength + longPipesLenght + sidePipesLenght);
      const commonPipeCost = commonPipeLength * Number(obj.price);
      const pipeCostNDS = commonPipeCost * ((nds + persent) / persent);
      return {
        commonCost: Number(commonPipeCost.toFixed(2)),
        ammount: Math.ceil(commonPipeLength),
        costNDS: Number(pipeCostNDS.toFixed(2)),
      };
    case 'fix':
      const commonfixAmmount =
        (constructionArea / listWidth / converterMM) * Number(orderConfig.fixValue);
      const commonfixCost = commonfixAmmount * Number(obj.price);
      const fixCostNDS = commonfixCost * ((nds + persent) / persent);
      return {
        commonCost: Number(commonfixCost.toFixed(2)),
        ammount: Math.ceil(commonfixAmmount),
        costNDS: Number(fixCostNDS.toFixed(2)),
      };

    default:
      return undefined;
  }
};

export const multiplicityCheck = (value: string, step: number): boolean => {
  const stepToMilimetrs = step * 1000;
  const valueToMilimetrs = Number(value) * 1000;
  return valueToMilimetrs % stepToMilimetrs === 0;
};
