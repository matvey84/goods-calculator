import React, { useRef } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { IOrder } from '../../../types/types';
import { ButtonEditOrder } from '../../../UI/buttons/ButtonEditOrder';
import { ButtonDeleteOrder } from '../../../UI/buttons/ButtonDeleteOrder';
interface IProp {
  order: IOrder[];
}
function Order(props: IProp) {
  const order = props.order;
  const editOrderFormData = useAppSelector((state) => state.formSlice.editOrderFormData?.id);
  const orderRef = useRef<HTMLTableElement>(null);
  return (
    <div className="order" id={order[0].orderFormDataID}>
      <section className="order-table_button-section">
        <ButtonEditOrder id={order[0].orderFormDataID} />
        <ButtonDeleteOrder id={order[0].orderFormDataID} />
      </section>
      <table
        className="order-table"
        id={order[0].orderFormDataID}
        ref={orderRef}
        style={{
          background: editOrderFormData === order[0].orderFormDataID ? '#c5f7c5' : 'transparent',
        }}
      >
        <thead>
          <tr className="order-table_header">
            <td className="table-cell table-cell_header">№</td>
            <td className="table-cell table-cell_header">Наименование продукции</td>
            <td className="table-cell table-cell_header">Едуница измерения</td>
            <td className="table-cell table-cell_header">Количество</td>
            <td className="table-cell table-cell_header">Цена, у.е.</td>
            <td className="table-cell table-cell_header">Стоимость, у.е</td>
            <td className="table-cell table-cell_header">НДС, %</td>
            <td className="table-cell table-cell_header">Сумма НДС, у.е</td>
            <td className="table-cell table-cell_header">Общая стоимость с НДС</td>
          </tr>
        </thead>
        <tbody>
          {!order.length
            ? 'Loading...'
            : order.map((row, i) => (
                <tr key={nanoid()} className="order-table_row">
                  <td key={nanoid()} className="table-cell">
                    {++i}
                  </td>
                  <td key={nanoid()} className="table-cell">
                    {row.name}
                  </td>
                  <td key={nanoid()} className="table-cell">
                    {row.unit}
                  </td>
                  <td key={nanoid()} className="table-cell">
                    {row.ammount}
                  </td>
                  <td key={nanoid()} className="table-cell">
                    {Number(row.price).toFixed(2)}
                  </td>
                  <td key={nanoid()} className="table-cell">
                    {Number(row.commonCost).toFixed(2)}
                  </td>
                  <td key={nanoid()} className="table-cell">
                    {row.nds}
                  </td>
                  <td key={nanoid()} className="table-cell">
                    {((Number(row.commonCost) * Number(row.nds)) / 100).toFixed(2)}
                  </td>
                  <td key={nanoid()} className="table-cell">
                    {Number(row.costNDS).toFixed(2)}
                  </td>
                </tr>
              ))}
          <tr className="order-table_footer">
            <td className="table-cell table-cell_footer" colSpan={5}>
              Итого
            </td>
            <td className="table-cell table-cell_footer">
              {order.reduce((sum, num) => sum + Number(num.commonCost), 0).toFixed(2)}
            </td>
            <td className="table-cell table-cell_footer"></td>
            <td className="table-cell table-cell_footer">
              {order
                .reduce((sum, num) => sum + (Number(num.commonCost) * Number(num.nds)) / 100, 0)
                .toFixed(2)}
            </td>
            <td className="table-cell table-cell_footer">
              {order.reduce((sum, num) => sum + Number(num.costNDS), 0).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Order;
