import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize/modern-normalize.css';
import App from './App.js';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

import { BrowserRouter } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';

import './styles/base.scss';
import './styles/reset.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
