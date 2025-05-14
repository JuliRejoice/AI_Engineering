import { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";
import { BDEUser } from "@/types/employee";

export interface AuthContextType {
  user: User | null;
  bdeProfile: BDEUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  // if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
