import React from 'react';
import { ResetButtonSVG } from './svgButtons';

interface IProp {
  reset: () => void;
}

const ButtonResetForm = (props: IProp) => {
  const reset = props.reset;

  return (
    <>
      <button
        className="button-reset-filter"
        onClick={() => {
          reset();
        }}
      >
        <ResetButtonSVG />
      </button>
    </>
  );
};

export default ButtonResetForm;
