import React, { Fragment } from 'react';
import { FieldErrors } from 'react-hook-form';
import { useAppSelector } from '../redux/hooks';
import { IOrderFormData } from '../types/types';
interface IProp {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  required: string | undefined | boolean;
  errors: FieldErrors<IOrderFormData>;
}
const SelectPipe = React.forwardRef(
  (props: IProp, ref: React.LegacyRef<HTMLSelectElement> | undefined) => {
    const pipes = useAppSelector((state) => state.formSlice.pipes);
    const { name, onChange, errors, onBlur } = props;

    return (
      <Fragment>
        <fieldset className={errors.pipe ? 'error-fieldset' : ''}>
          <legend>{errors.pipe ? errors.pipe.message : 'Трубы'}</legend>
          <select
            name={name}
            ref={ref}
            id={name}
            onBlur={onBlur}
            required
            onChange={onChange}
            defaultValue=""
            className="order-form-select"
          >
            <option className="user-form-select-option" disabled value="">
              ---Трубы----
            </option>
            {pipes.map((pipe) => (
              <option
                key={crypto.randomUUID()}
                className="user-form-select-option"
                value={JSON.stringify(pipe)}
              >
                {pipe.name}
              </option>
            ))}
          </select>
        </fieldset>
      </Fragment>
    );
  }
);

export default SelectPipe;
