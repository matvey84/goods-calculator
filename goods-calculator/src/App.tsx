import React, { useEffect } from 'react';
import './App.scss';
import OrderForm from './components/formField/OrderForm';
import ResultField from './components/resultField/ResultField';
import { configBD, matterialBD } from './DATA/data';
import { getConfigAction, getDataAction } from './redux/formSlice';
import { useAppDispatch } from './redux/hooks';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDataAction(matterialBD));
    dispatch(getConfigAction(configBD));
  });
  return (
    <div className="App">
      <section className="app-container">
        <OrderForm />
        <ResultField />
      </section>
    </div>
  );
}

export default App;
