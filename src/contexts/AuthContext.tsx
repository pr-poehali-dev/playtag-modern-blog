import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthState } from "@/types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    login: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addPoints: (points: number) => void;
  spendPoints: (points: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "toly.akuloff@yandex.ru";
const ADMIN_PASSWORD = "908908Tolya--Qwe";

const mockUsers: User[] = [
  {
    id: "admin",
    login: "admin",
    email: ADMIN_EMAIL,
    name: "Анатолий",
    surname: "Акулов",
    points: 1000,
    isAdmin: true,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=400&fit=crop",
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("playTagUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = mockUsers[0];
      setAuthState({
        user: adminUser,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem("playTagUser", JSON.stringify(adminUser));
      return true;
    }

    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      setAuthState({
        user: existingUser,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem("playTagUser", JSON.stringify(existingUser));
      return true;
    }

    return false;
  };

  const register = async (
    login: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    const existingUser = mockUsers.find(
      (u) => u.email === email || u.login === login,
    );
    if (existingUser) return false;

    const newUser: User = {
      id: Date.now().toString(),
      login,
      email,
      points: 0,
      isAdmin: false,
    };

    mockUsers.push(newUser);
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
    localStorage.setItem("playTagUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem("playTagUser");
  };

  const updateUser = (userData: Partial<User>) => {
    if (!authState.user) return;

    const updatedUser = { ...authState.user, ...userData };
    setAuthState((prev) => ({ ...prev, user: updatedUser }));
    localStorage.setItem("playTagUser", JSON.stringify(updatedUser));

    const userIndex = mockUsers.findIndex((u) => u.id === authState.user.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedUser;
    }
  };

  const addPoints = (points: number) => {
    if (!authState.user) return;
    updateUser({ points: authState.user.points + points });
  };

  const spendPoints = (points: number): boolean => {
    if (!authState.user || authState.user.points < points) return false;
    updateUser({ points: authState.user.points - points });
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUser,
        addPoints,
        spendPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
