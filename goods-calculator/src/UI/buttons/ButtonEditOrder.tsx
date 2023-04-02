import React from 'react';
import { EditTaskSVG } from './svgButtons';
import './buttons.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getEditFormOrderData } from '../../redux/formSlice';

interface IProp {
  id: string;
}
export const ButtonEditOrder = (props: IProp) => {
  const dispatch = useAppDispatch();
  const editOrderFormData = useAppSelector((state) => state.formSlice.editOrderFormData);
  const { id } = props;

  return (
    <>
      <button
        disabled={id == editOrderFormData?.id}
        id={id}
        className="button-edit-note"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          dispatch(getEditFormOrderData(e.currentTarget.id))
        }
      >
        <EditTaskSVG />
      </button>
    </>
  );
};
