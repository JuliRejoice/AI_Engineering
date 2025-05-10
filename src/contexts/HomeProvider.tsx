import { createContext, useContext, ReactNode, useState } from 'react';

interface Filters {
  searchQuery: string;
  reactionFilter: "all" | "accepted" | "rejected" | "pending";
  viewMode: "grid" | "list";
  sortBy: "job_created_at" | "job_score";
}

interface HomeContextType {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function HomeProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    reactionFilter: 'pending',
    viewMode: 'grid',
    sortBy: 'job_created_at'
  });

  return (
    <HomeContext.Provider value={{ 
      filters,
      setFilters: (newFilters) => setFilters(prev => ({ ...prev, ...newFilters })),
      isLoading,
      setIsLoading
    }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) throw new Error('useHome must be used within HomeProvider');
  return context;
} 