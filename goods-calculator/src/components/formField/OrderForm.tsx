import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { orderCreater } from '../../handlers/handlers';
import { getFilterListsAction, getFixValue } from '../../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { currentOrderData, IOrderFormData } from '../../types/types';
import CastomerParametrInput from '../../UI/CastomerParametrInput';
import FilterListMaterial from '../../UI/FilterCtegoriButton';
import FixChoose from '../../UI/FixChoose';
import SelectFrame from '../../UI/SelectFrame';
import SelectList from '../../UI/SelectList';
import SelectPipe from '../../UI/SelectPipe';
import './orderFormStyle.scss';

function OrderForm() {
  const dispatch = useAppDispatch();
  const sizeInputConfig = useAppSelector((state) => state.formSlice.sizeInputConfig);
  const currentFixValue = useAppSelector((state) => state.formSlice.currentFixValue);
  const goodsType = useAppSelector((state) => state.formSlice.goodsType);
  const currentFix = useAppSelector((state) => state.formSlice.currentFix);
  const width = sizeInputConfig.find((config) => config.key === 'width');
  const length = sizeInputConfig.find((config) => config.key === 'length');
  const [errorInputMessage, setErrorInputMessage] = useState<string>('');
  const [fixValueError, setFixValueError] = useState<number | string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
  } = useForm<IOrderFormData>({
    mode: 'onBlur',
  });

  const selectPipe = register('pipe', { required: 'Это обязательное поле!' });
  const selectList = register('list', {
    required: 'Это обязательное поле!',
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(getFixValue(e.currentTarget.value));
    },
  });

  const selectFrame = register('frameStep', { required: 'Это обязательное поле!' });
  const chooseFix = register('fix', {
    required: 'Это обязательное поле!',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFixValueError(e.currentTarget.value);
    },
  });
  const filter = register('category');
  const widthInput = register('width', {
    validate: (value) => !isNaN(+value) || 'Только цифры',
    valueAsNumber: true,
    required: 'Это обязательное поле!',
    min: {
      value: width!.min,
      message: `Должно быть больше или равно ${width!.min} м`,
    },
    max: {
      value: width!.max,
      message: `Должно быть меньше или равно ${width!.max} м`,
    },
  });

  const lengthInput = register('length', {
    validate: (value) => !isNaN(+value) || 'Только цифры',
    valueAsNumber: true,
    required: 'Это обязательное поле!',
    min: {
      value: length!.min,
      message: `Должно быть больше или равно ${length!.min} м`,
    },
    max: {
      value: length!.max,
      message: `Должно быть меньше или равно ${length!.max} м`,
    },
  });

  const formSubmitHandler: SubmitHandler<IOrderFormData> = (data: IOrderFormData) => {
    const completedData: IOrderFormData = {
      ...data,
      fixValue: String(currentFixValue!),
      fix: currentFix!,
    };

    const workData = Object.fromEntries(
      Object.entries(completedData).map((prop) => {
        return goodsType.some((type) => type === prop[0]) ? [prop[0], JSON.parse(prop[1])] : prop;
      })
    ) as currentOrderData;
    dispatch(orderCreater(workData, goodsType));
  };

  useEffect(() => {
    const currentInputError = errors.length?.message || errors.width?.message;
    setErrorInputMessage(currentInputError!);
  }, [errors.length?.message, errors.width?.message]);

  useEffect(() => {
    isSubmitSuccessful && reset();
    isSubmitSuccessful && dispatch(getFilterListsAction('all'));
  }, [dispatch, isSubmitSuccessful, reset]);
  useEffect(
    () => () => {
      dispatch(getFilterListsAction('all'));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <section className="order-form-field">
      <form onSubmit={handleSubmit(formSubmitHandler)} className="order-form">
        <fieldset className="order-form_filter-block">
          <legend>Фильтр кровельного покрытия</legend>
          <FilterListMaterial name={filter.name} ref={filter.ref} />
        </fieldset>

        <SelectList
          name={selectList.name}
          ref={selectList.ref}
          onChange={selectList.onChange}
          onBlur={selectList.onBlur}
          required={selectList.required!}
          errors={errors}
        />

        <fieldset
          className={!fixValueError ? 'order-form_filter-block__error' : 'order-form_filter-block'}
        >
          <legend>Крепеж</legend>

          <FixChoose
            name={chooseFix.name}
            onChange={chooseFix.onChange}
            ref={chooseFix.ref}
            required={chooseFix.required!}
          />
        </fieldset>

        <fieldset className={errors?.width || errors?.length ? 'error-fieldset' : 'input-block'}>
          <legend>{!!errorInputMessage ? errorInputMessage : 'Параметры'}</legend>
          <CastomerParametrInput
            name={lengthInput.name}
            ref={lengthInput.ref}
            onChange={lengthInput.onChange}
            errors={errors}
            onBlur={lengthInput.onBlur}
            required={lengthInput.required!}
          />
          <CastomerParametrInput
            name={widthInput.name}
            ref={widthInput.ref}
            onChange={widthInput.onChange}
            errors={errors}
            onBlur={widthInput.onBlur}
            required={widthInput.required!}
          />
        </fieldset>

        <SelectPipe
          name={selectPipe.name}
          ref={selectPipe.ref}
          onChange={selectPipe.onChange}
          errors={errors}
          onBlur={selectPipe.onBlur}
          required={selectPipe.required!}
        />
        <SelectFrame
          name={selectFrame.name}
          ref={selectFrame.ref}
          onChange={selectFrame.onChange}
          onBlur={selectFrame.onBlur}
          required={selectFrame.required!}
        />

        <button className="order-form_submit-button" type="submit" disabled={!isValid}>
          Сформировать счет.
        </button>
      </form>
    </section>
  );
}

export default OrderForm;
