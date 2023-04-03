import React, { Fragment } from 'react';
import { useAppSelector } from '../redux/hooks';

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
      <Fragment>
        <fieldset>
          <legend>Выбор прочности</legend>
          <select
            key={crypto.randomUUID()}
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
                  <option
                    key={crypto.randomUUID()}
                    className="user-form-select-option"
                    value={frame.step}
                  >
                    {frame.name}
                  </option>
                ))}
          </select>
        </fieldset>
      </Fragment>
    );
  }
);

export default SelectFrame;
