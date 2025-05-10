import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/lib/auth";
import { BDEUser } from "@/types/job";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bdeProfile, setBdeProfile] = useState<BDEUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setLoading(false);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchBdeProfile(session.user.id);
      }
    };

    initializeApp();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchBdeProfile(session.user.id);
      } else {
        setBdeProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchBdeProfile = async (userId: string) => {
    const { data } = await supabase
      .from("bde_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setBdeProfile(data);
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider value={{ user, bdeProfile, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
