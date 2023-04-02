import React from 'react';
// import { resetFilterAction } from '../redux/note-slice/noteSlice';
import { ResetButtonSVG } from './svgButtons';
import { useAppDispatch } from '../../redux/hooks';

interface IProp {
  reset: () => void;
}

const ButtonResetForm = (props: IProp) => {
  const reset = props.reset;
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        className="button-reset-filter"
        onClick={() => {
          // dispatch(resetFilterAction());
          reset();
        }}
      >
        <ResetButtonSVG />
      </button>
    </>
  );
};

export default ButtonResetForm;
