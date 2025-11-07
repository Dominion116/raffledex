import { createContext, useContext, useState } from 'react';

const RaffleContext = createContext();

export const useRaffles = () => useContext(RaffleContext);

export const RaffleProvider = ({ children }) => {
  const [raffles, setRaffles] = useState([]);

  const addRaffle = (raffle) => {
    setRaffles((prevRaffles) => [...prevRaffles, raffle]);
  };

  return (
    <RaffleContext.Provider value={{ raffles, addRaffle }}>
      {children}
    </RaffleContext.Provider>
  );
};
