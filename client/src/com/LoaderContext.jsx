import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const startLoading = () => setCount((c) => c + 1);
  const stopLoading = () => setCount((c) => Math.max(c - 1, 0));

  const loading = count > 0;
  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
