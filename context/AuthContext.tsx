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
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("user", user);
      setLoading(false);
      if (user?.accessToken) {
        // localStorage.setItem("token", user?.accessToken);
      }

      // Redirect unauthenticated users from protected routes
      if (!user && !isPublicRoute && !loading) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router, isPublicRoute, loading]);

  // Redirect unauthenticated users when they try to access protected routes
  useEffect(() => {
    if (!loading && !user && !isPublicRoute) {
      router.push("/login");
    }
  }, [user, loading, isPublicRoute, router]);

  const logout = () => {
    signOut(auth).then(() => {
      router.push("/");
      // localStorage.removeItem("token");
    });
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
