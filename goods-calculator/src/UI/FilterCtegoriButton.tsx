import { nanoid } from '@reduxjs/toolkit';
import React, { Fragment } from 'react';
import { getFilterListsAction } from '../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface IProp {
  name: string;
}
const FilterListMaterial = React.forwardRef(
  (props: IProp, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    const dispatch = useAppDispatch();
    const { name } = props;
    const filterCategory = useAppSelector((state) => state.formSlice.filterCategory);
    const listMaterial = useAppSelector((state) => state.formSlice.listMaterial);

    const filterListHandle = (e: React.MouseEvent<HTMLInputElement>) => {
      dispatch(getFilterListsAction(e.currentTarget.id));
    };

    return (
      <>
        {filterCategory.map((category) => (
          <Fragment key={crypto.randomUUID()}>
            <input
              defaultChecked={category.key === listMaterial}
              className="order-form_filter-button"
              ref={ref}
              type="radio"
              name={name}
              value={category.key}
              id={category.key}
              onClick={(e: React.MouseEvent<HTMLInputElement>) => filterListHandle(e)}
            />
            <label
              key={nanoid()}
              htmlFor={category.key}
              className={
                category.key === listMaterial
                  ? 'order-form_filter-block__label-green'
                  : 'order-form_filter-block__label'
              }
            >
              {category.name}
            </label>
          </Fragment>
        ))}
      </>
    );
  }
);

export default FilterListMaterial;
