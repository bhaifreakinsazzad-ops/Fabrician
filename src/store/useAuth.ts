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

type StoredUser = User & { password: string };

function getStoredUsers(): StoredUser[] {
  const raw = localStorage.getItem('fabrician-users');
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Array<User | StoredUser>;
    return parsed.map((u) => ({
      ...u,
      password: 'password' in u && typeof u.password === 'string' ? u.password : '',
    }));
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem('fabrician-users', JSON.stringify(users));
}

function toSessionUser(storedUser: StoredUser): User {
  // Keep password out of auth session state.
  return {
    id: storedUser.id,
    name: storedUser.name,
    email: storedUser.email,
    phone: storedUser.phone,
    avatar: storedUser.avatar,
    role: storedUser.role,
    addresses: storedUser.addresses,
  };
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const users = getStoredUsers();
        const storedUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

        if (storedUser && storedUser.password === password) {
          const sessionUser = toSessionUser(storedUser);
          set({
            user: sessionUser,
            isAuthenticated: true,
            isAdmin: sessionUser.role === 'admin',
          });
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

      signup: (name, email, phone, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const users = getStoredUsers();
        if (users.find((u) => u.email.toLowerCase() === normalizedEmail)) return false;

        const newUser: StoredUser = {
          id: `u${Date.now()}`,
          name: name.trim(),
          email: normalizedEmail,
          phone: phone.trim(),
          role: 'customer',
          addresses: [],
          password,
        };

        const nextUsers = [...users, newUser];
        saveStoredUsers(nextUsers);
        set({ user: toSessionUser(newUser), isAuthenticated: true, isAdmin: false });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isAdmin: false });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (!user) return;

        const updatedUser: User = { ...user, ...updates };
        const users = getStoredUsers();
        const nextUsers = users.map((stored) =>
          stored.id === user.id ? { ...stored, ...updatedUser } : stored
        );
        saveStoredUsers(nextUsers);
        set({ user: updatedUser });
      },
    }),
    {
      name: 'fabrician-auth',
    }
  )
);
