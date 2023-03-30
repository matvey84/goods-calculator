import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { useAppSelector } from '../redux/hooks';
import { IOrderFormData } from '../types/types';

interface IProp {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  required: string | undefined | boolean;
}
const SelectFrame = React.forwardRef(
  (props: IProp, ref: React.LegacyRef<HTMLSelectElement> | undefined) => {
    const { name, onChange, onBlur } = props;
    const allFrames = useAppSelector((state) => state.formSlice.allFrames);

    return (
      <fieldset>
        <legend>Выбор прочности</legend>
        <select
          key={nanoid()}
          name={name}
          ref={ref}
          id={name}
          onBlur={onBlur}
          onChange={onChange}
          className="order-form-select"
        >
          {!allFrames.length
            ? 'Loading...'
            : allFrames.map((frame) => (
                <option key={nanoid()} className="user-form-select-option" value={frame.step}>
                  {frame.name}
                </option>
              ))}
        </select>
      </fieldset>
    );
  }
);

export default SelectFrame;
