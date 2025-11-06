import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const element = document.getElementById('root');

if (!element) {
  throw new Error('No root element found');
}

const root = createRoot(element);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
