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
  const publicRoutes = ["/", "/login", "/signup", "/voice-agent"];
  const reRouteToDashbaord = ["/"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isRerouteToDashboard = reRouteToDashbaord.includes(pathname);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user, "for token");
      setLoading(false);
      // @ts-ignore
      if (user?.accessToken) {
        // @ts-ignore
        localStorage.setItem("token", user?.accessToken);
      }

      if (!user && !isPublicRoute) {
        // Unauthenticated user trying to access protected route
        router.push("/login");
      }

      if (user && isRerouteToDashboard) {
        // Authenticated user on public route → redirect to dashboard
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [pathname, router, isPublicRoute]);

  const logout = () => {
    signOut(auth).then(() => {
      router.push("/");
      localStorage.removeItem("token");
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
        <AuthenticatedLayout title="Influency">{children}</AuthenticatedLayout>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
