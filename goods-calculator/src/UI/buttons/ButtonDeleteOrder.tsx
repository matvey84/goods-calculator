import React from 'react';
import { DeleteNoteSVG } from './svgButtons';
import './buttons.scss';
import { useAppDispatch } from '../../redux/hooks';
import { removeOrder } from '../../redux/formSlice';

interface IProp {
  id: string;
}
export const ButtonDeleteOrder = (props: IProp) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        id={id}
        className="button-delete-note"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          dispatch(removeOrder(e.currentTarget.id))
        }
      >
        <DeleteNoteSVG />
      </button>
    </>
  );
};
