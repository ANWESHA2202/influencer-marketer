"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { usePathname } from "next/navigation";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const publicRoutes = ["/signup", "/login"]; // define routes that shouldn't use AuthenticatedLayout
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
  };

  console.log("console , this page ");

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {user && !isPublicRoute ? (
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
