import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './redux/rootReducer';
import { store, persistor } from './redux/store';
// import { AuthProvider } from './Auth/AuthContext';
// Adjust the import path here

// Remove the duplicate store creation
// const store = configureStore({
//   reducer: rootReducer
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);








