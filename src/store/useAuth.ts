import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: (email, password) => {
        const stored = localStorage.getItem('fabrician-users');
        const users = stored ? JSON.parse(stored) : [];
        const user = users.find((u: User) => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true, isAdmin: user.role === 'admin' });
          return true;
        }
        // Demo login
        if (email === 'demo@fabrician.com' && password === 'demo123') {
          const demoUser: User = {
            id: 'u1',
            name: 'Demo User',
            email: 'demo@fabrician.com',
            phone: '+8801712345678',
            role: 'customer',
            addresses: [
              {
                id: 'a1',
                label: 'Home',
                name: 'Demo User',
                phone: '+8801712345678',
                division: 'Dhaka',
                district: 'Dhaka',
                thana: 'Gulshan',
                address: 'House 12, Road 45, Gulshan 2',
                isDefault: true,
              },
            ],
          };
          set({ user: demoUser, isAuthenticated: true, isAdmin: false });
          return true;
        }
        // Admin login
        if (email === 'admin@fabrician.com' && password === 'admin123') {
          const adminUser: User = {
            id: 'admin1',
            name: 'Admin User',
            email: 'admin@fabrician.com',
            phone: '+8801711111111',
            role: 'admin',
            addresses: [],
          };
          set({ user: adminUser, isAuthenticated: true, isAdmin: true });
          return true;
        }
        return false;
      },

      signup: (name, email, phone, _password) => {
        const stored = localStorage.getItem('fabrician-users');
        const users = stored ? JSON.parse(stored) : [];
        if (users.find((u: User) => u.email === email)) return false;
        
        const newUser: User = {
          id: `u${Date.now()}`,
          name,
          email,
          phone,
          role: 'customer',
          addresses: [],
        };
        users.push(newUser);
        localStorage.setItem('fabrician-users', JSON.stringify(users));
        set({ user: newUser, isAuthenticated: true, isAdmin: false });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isAdmin: false });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (!user) return;
        const updated = { ...user, ...updates };
        set({ user: updated });
      },
    }),
    {
      name: 'fabrician-auth',
    }
  )
);
