import React from 'react';
import './resultFieldStyle.scss';
import Order from './order/Order';
import { useAppSelector } from '../../redux/hooks';

function ResultField() {
  const orderList = useAppSelector((state) => state.formSlice.orderList);
  return (
    <section className="order-list">
      {!orderList.length
        ? 'Loading...'
        : orderList.map((order) => <Order key={crypto.randomUUID()} order={order} />)}
    </section>
  );
}

export default ResultField;
