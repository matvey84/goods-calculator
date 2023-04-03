import React, { useMemo } from 'react';
import { FieldErrors } from 'react-hook-form';
import { IOrderFormData } from '../types/types';

interface IProp {
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  required: boolean;
  errors: FieldErrors<IOrderFormData>;
}
const CastomerParametrInput = React.forwardRef(
  (props: IProp, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    const { name, onChange, onBlur, errors, id } = props;

    const currenInputError = useMemo(() => {
      const currentInputError = errors.length ? errors.length : errors.width;
      return currentInputError?.ref?.name;
    }, [errors.length, errors.width]);

    return (
      <input
        id={id}
        ref={ref}
        autoComplete="off"
        required
        name={name}
        type="text"
        placeholder={`${name === 'length' ? 'длинна' : 'ширина'} в метрах`}
        onChange={onChange}
        onBlur={onBlur}
        disabled={(name !== 'length' && !!errors.length) || (name !== 'width' && !!errors.width)}
        className={
          currenInputError === name
            ? 'order-form_parametr-input__error'
            : 'order-form_parametr-input'
        }
      />
    );
  }
);

export default CastomerParametrInput;
