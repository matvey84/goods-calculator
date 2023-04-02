import React from 'react';
import './resultFieldStyle.scss';
import Order from './order/Order';
import { useAppSelector } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';

function ResultField() {
  const orderList = useAppSelector((state) => state.formSlice.orderList);
  return (
    <section className="order-list">
      {!orderList.length
        ? 'Loading...'
        : orderList.map((order) => <Order key={nanoid()} order={order} />)}
    </section>
  );
}

export default ResultField;
