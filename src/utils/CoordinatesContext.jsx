import React, { createContext, useContext, useState } from 'react';

const CoordinatesContext = createContext();

export function CoordinatesProvider({ children }) {
  const [coordinates, setCoordinates] = useState({ lat: 26.87560, lng: 80.91150 });

  return (
    <CoordinatesContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </CoordinatesContext.Provider>
  );
}

export function useCoordinates() {
  return useContext(CoordinatesContext);
}
