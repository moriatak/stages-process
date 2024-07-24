import { useState, useEffect } from 'react'
import './App.css'
import { DataProvider } from './context/DataContext';
import MainPage from './MainPage';

function App() {

  return (
    <DataProvider>
      <MainPage />
    </DataProvider>
  )
}

export default App
