import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { getFixID } from '../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface IProp {
  name: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FixChoose = React.forwardRef(
  (props: IProp, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    const dispatch = useAppDispatch();
    const { name, required, onChange } = props;
    const allFix = useAppSelector((state) => state.formSlice.allFix);
    const currentFixID = useAppSelector((state) => state.formSlice.currentFixID);

    const setCurrentFix = (e: React.MouseEvent<HTMLInputElement>) => {
      dispatch(getFixID(e.currentTarget.value));
    };

    return (
      <>
        {allFix.map((fix) => (
          <>
            <input
              onChange={onChange}
              key={nanoid()}
              required={required}
              className="order-form_filter-button"
              ref={ref}
              type="radio"
              name={name}
              value={fix.price}
              id={fix.id}
              onClick={(e: React.MouseEvent<HTMLInputElement>) => setCurrentFix(e)}
            />
            <label
              htmlFor={fix.id}
              className={
                fix.id === currentFixID
                  ? 'order-form_filter-block__label-green'
                  : 'order-form_filter-block__label'
              }
            >
              {fix.name}
            </label>
          </>
        ))}
      </>
    );
  }
);

export default FixChoose;
