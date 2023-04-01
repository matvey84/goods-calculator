import { nanoid } from '@reduxjs/toolkit';
import React, { useCallback } from 'react';
import { FieldErrors } from 'react-hook-form';
import { useAppSelector } from '../redux/hooks';
import { IOrderFormData } from '../types/types';

interface IProp {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  required: boolean;
  errors: FieldErrors<IOrderFormData>;
}
const SelectList = React.forwardRef(
  (props: IProp, ref: React.LegacyRef<HTMLSelectElement> | undefined) => {
    const { name, onChange, errors, onBlur } = props;
    const allLists = useAppSelector((state) => state.formSlice.allLists);
    const filteredListMaterial = useAppSelector((state) => state.formSlice.filteredList);
    const listMaterial: string = useAppSelector((state) => state.formSlice.listMaterial);

    const currentMaterials = useCallback(() => {
      const current = listMaterial === 'all' ? allLists : filteredListMaterial;
      return current;
    }, [allLists, filteredListMaterial, listMaterial]);
    return (
      <fieldset className={errors.list ? 'error-fieldset' : ''}>
        <legend>{errors.list ? errors.list.message : 'Выбор покрытия'}</legend>
        <select
          name={name}
          ref={ref}
          id={name}
          required
          onBlur={onBlur}
          onChange={onChange}
          className="order-form-select"
          defaultValue=""
        >
          <option className="user-form-select-option" disabled value="">
            ---Материал покрытия---
          </option>
          {!currentMaterials().length
            ? 'Loading...'
            : currentMaterials().map((material) => (
                <option
                  id={material.id}
                  key={nanoid()}
                  className="user-form-select-option"
                  value={JSON.stringify(material)}
                >
                  {material.name}
                </option>
              ))}
        </select>
      </fieldset>
    );
  }
);

export default SelectList;
