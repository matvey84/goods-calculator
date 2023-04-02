import React from 'react';
import { EditTaskSVG } from './svgButtons';
import './buttons.scss';
import { useAppDispatch } from '../../redux/hooks';

interface IProp {
  id: string;
}
export const ButtonEditOrder = (props: IProp) => {
  const dispatch = useAppDispatch();
  const { id } = props;

  return (
    <>
      <button
        id={id}
        className="button-edit-note"
        onClick={
          (e: React.MouseEvent<HTMLButtonElement>) => console.log(e)
          // dispatch(removeOrder(e.currentTarget.id))
        }
      >
        <EditTaskSVG />
      </button>
    </>
  );
};
