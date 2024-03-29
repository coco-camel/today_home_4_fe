import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles';
import GlobalFonts from './styles/GlobalFonts';

function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalFonts />
      <Outlet />
    </>
  );
}

export default App;
