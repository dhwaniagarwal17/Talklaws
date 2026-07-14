"use client";

/**
 * lib/adminAuth.tsx
 * React context that stores the admin JWT token and provides
 * login/logout helpers. Persists token in localStorage.
 */

import React, { createContext, useContext, useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  admin: null,
  token: null,
  loading: true,
  login: async () => null,
  logout: () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session — verify token is still valid with the server
  useEffect(() => {
    const stored = localStorage.getItem("talklaws_admin_token");
    const storedAdmin = localStorage.getItem("talklaws_admin_info");

    if (stored && storedAdmin) {
      // Verify the token against the backend before trusting it
      fetch(`${API}/api/admin/me`, {
        headers: { Authorization: `Bearer ${stored}` },
      })
        .then((res) => {
          if (res.ok) {
            setToken(stored);
            setAdmin(JSON.parse(storedAdmin));
          } else {
            // Token expired or invalid — clear it
            localStorage.removeItem("talklaws_admin_token");
            localStorage.removeItem("talklaws_admin_info");
          }
        })
        .catch(() => {
          // Backend unreachable — clear token so login is required
          localStorage.removeItem("talklaws_admin_token");
          localStorage.removeItem("talklaws_admin_info");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return data.message || "Login failed";
      }

      setToken(data.token);
      setAdmin(data.admin);
      localStorage.setItem("talklaws_admin_token", data.token);
      localStorage.setItem("talklaws_admin_info", JSON.stringify(data.admin));
      return null; // null = no error
    } catch {
      return "Cannot connect to server. Make sure the backend is running.";
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("talklaws_admin_token");
    localStorage.removeItem("talklaws_admin_info");
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AuthContext);
}

// Helper — authenticated fetch wrapper
export async function apiFetch(
  path: string,
  token: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  return res;
}
