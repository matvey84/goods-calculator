import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { dataParser, multiplicityCheck, orderCreater } from '../../handlers/handlers';
import { getFilterListsAction, resetStore, setOrderFormList } from '../../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { currentOrderData, IList, IOrderFormData, orderFormDataConfig } from '../../types/types';
import CastomerParametrInput from '../../UI/CustomerParametrInput';
import FilterListMaterial from '../../UI/FilterCtegoriButton';
import FixChoose from '../../UI/FixChoose';
import SelectFrame from '../../UI/SelectFrame';
import SelectList from '../../UI/SelectList';
import SelectPipe from '../../UI/SelectPipe';
import './orderFormStyle.scss';
import { nanoid } from '@reduxjs/toolkit';
import ButtonResetForm from '../../UI/buttons/ButtonResetForm';

function OrderForm() {
  const dispatch = useAppDispatch();
  const sizeInputConfig = useAppSelector((state) => state.formSlice.sizeInputConfig);
  const allFixConfig = useAppSelector((state) => state.formSlice.allFixConfig);
  const editOrderFormData = useAppSelector((state) => state.formSlice.editOrderFormData);
  const isEditOrder = useAppSelector((state) => state.formSlice.isEditOrder);
  const goodsType = useAppSelector((state) => state.formSlice.goodsType);
  const width = sizeInputConfig.find((config) => config.key === 'width');
  const length = sizeInputConfig.find((config) => config.key === 'length');
  const [errorInputMessage, setErrorInputMessage] = useState<string>('');
  const converterMM = 1000;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
  } = useForm<IOrderFormData>({
    mode: 'all',
  });

  const selectPipe = register('pipe', { required: 'Это обязательное поле!' });

  const selectList = register('list', {
    required: 'Это обязательное поле!',
  });

  const selectFrame = register('frameStep', { required: 'Это обязательное поле!' });

  const chooseFix = register('fix', {
    required: 'Это обязательное поле!',
    validate: (value) => Boolean(value) || 'Это обязательное поле!',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.currentTarget.classList.toggle('order-form_filter-block__label-green');
    },
  });

  const filter = register('category');

  const widthInput = register('width', {
    validate: (value) =>
      isNaN(+value)
        ? 'Только цифры'
        : multiplicityCheck(value, width!.step)
        ? value
        : `Должно быть кратно ${width!.step * converterMM} мм. Пример: (${(
            Number(value) + 0.1
          ).toFixed(1)})`,
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
    validate: (value) =>
      isNaN(+value)
        ? 'Только цифры'
        : multiplicityCheck(value, length!.step)
        ? value
        : `Должно быть кратно ${length!.step * converterMM} мм. Пример: (${(
            Number(value) + 0.1
          ).toFixed(1)})`,
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
    const list: IList = JSON.parse(data.list);

    const currentFixValue = String(
      allFixConfig.filter((config) => config.key === list.material).at(-1)?.value
    );
    const configuration: orderFormDataConfig = {
      type: 'orderConfig',
      fixValue: currentFixValue,
      length: String(Number(data.length) * converterMM),
      width: String(Number(data.width) * converterMM),
      frameStep: String(Number(data.frameStep) * converterMM),
    };
    const completedData: currentOrderData = {
      id: isEditOrder ? editOrderFormData!.id! : nanoid(),
      list: data.list,
      pipe: data.pipe,
      fix: data.fix,
      orderConfig: JSON.stringify(configuration),
    };

    const parsedData = dataParser(completedData, goodsType);
    dispatch(setOrderFormList(parsedData));
    dispatch(orderCreater(parsedData, goodsType));
    dispatch(resetStore());
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
      dispatch(resetStore());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <section className="order-form-field">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="order-form"
        style={{ outline: isEditOrder ? '1px solid green' : 'none' }}
      >
        {isEditOrder && <h3 className="edit-order-title">Внесите изменения!</h3>}
        <ButtonResetForm reset={reset} />
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

        <fieldset className={'order-form_filter-block__error order-form_filter-block'}>
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
          {!isValid ? 'Пустые поля!' : 'Сформировать счет.'}
        </button>
      </form>
    </section>
  );
}

export default OrderForm;
