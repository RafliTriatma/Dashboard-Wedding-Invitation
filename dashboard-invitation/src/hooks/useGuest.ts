import { useState, useCallback } from 'react';
import { Guest } from '@/types';

interface UseGuestsReturn {
  guests: Guest[];
  addGuest: (name: string) => Guest | null;
  removeGuest: (id: number) => void;
  updateGuestStatus: (id: number, status: Guest['status']) => void;
  clearGuests: () => void;
  getGuestById: (id: number) => Guest | undefined;
}

export const useGuests = (): UseGuestsReturn => {
  const [guests, setGuests] = useState<Guest[]>([
    { 
      id: 1, 
      name: 'Prasenda dan Istri', 
      createdAt: new Date(),
      status: 'pending'
    }
  ]);

  const addGuest = useCallback((name: string): Guest | null => {
    if (!name.trim()) {
      return null;
    }

    const newGuest: Guest = {
      id: Date.now(), // Using timestamp for unique ID
      name: name.trim(),
      createdAt: new Date(),
      status: 'pending'
    };

    setGuests(prev => [...prev, newGuest]);
    return newGuest;
  }, []);

  const removeGuest = useCallback((id: number) => {
    setGuests(prev => prev.filter(guest => guest.id !== id));
  }, []);

  const updateGuestStatus = useCallback((id: number, status: Guest['status']) => {
    setGuests(prev => prev.map(guest => 
      guest.id === id ? { ...guest, status } : guest
    ));
  }, []);

  const clearGuests = useCallback(() => {
    setGuests([]);
  }, []);

  const getGuestById = useCallback((id: number): Guest | undefined => {
    return guests.find(guest => guest.id === id);
  }, [guests]);

  return {
    guests,
    addGuest,
    removeGuest,
    updateGuestStatus,
    clearGuests,
    getGuestById,
  };
};
