import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [companyId, setCompanyId] = useState('');
  

  const updateCompanyIdFomCookis = (companyId) => {
    setCompanyId(companyId);
  }

  const DataContextValue = {
    updateCompanyIdFomCookis,
    companyId
  };

  return (
    <DataContext.Provider value={DataContextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
