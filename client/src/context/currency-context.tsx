import React, { createContext, useContext, useState, ReactNode } from 'react';
import { formatRupees, formatUsdAsRupees } from '@/lib/currency';

interface CurrencyContextType {
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // We could add more features here like currency switching
  // but for now we're only using INR

  const formatPrice = (amount: number) => {
    return formatRupees(amount);
  };

  return (
    <CurrencyContext.Provider value={{ formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
