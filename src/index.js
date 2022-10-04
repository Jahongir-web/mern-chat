import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import { InfoProvider } from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <InfoProvider>
      <Routes>
        <Route path='*' element={<App />}/>      
      </Routes>
    </InfoProvider>
  </BrowserRouter>
);


