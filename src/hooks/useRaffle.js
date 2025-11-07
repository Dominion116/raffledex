import { useContext } from 'react';
import { RaffleContext } from '../contexts/RaffleContext';

export const useRaffle = () => useContext(RaffleContext);
