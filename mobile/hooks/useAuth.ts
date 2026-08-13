import { useEffect, useState } from "react";
import { storage } from "../lib/storage";
import type { User } from "../types/user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await storage.getUser();

        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.log("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    await storage.removeToken();
    await storage.removeUser();
    setUser(null);
  };

  return {
    user,
    setUser,
    loading,
    logout,
    isAuthenticated: !!user,
  };
}