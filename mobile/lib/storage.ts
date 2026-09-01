const TOKEN_KEY = "chatbit_token";
const USER_KEY = "chatbit_user";

export type User = {
  id: number;
  fullname: string;
  email: string;
  role: "client" | "agent";
};

// Global in-memory storage map that persists throughout the app session
const memoryStore = new Map<string, string>();

const safeGet = async (key: string): Promise<string | null> => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const val = window.localStorage.getItem(key);
      if (val !== null && val !== undefined) return val;
    } catch {
      // ignore
    }
  }
  return memoryStore.get(key) || null;
};

const safeSet = async (key: string, value: string): Promise<void> => {
  memoryStore.set(key, value);
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  }
};

const safeRemove = async (key: string): Promise<void> => {
  memoryStore.delete(key);
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
};

export const storage = {
  async getToken(): Promise<string | null> {
    return await safeGet(TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await safeSet(TOKEN_KEY, token);
  },

  async removeToken(): Promise<void> {
    await safeRemove(TOKEN_KEY);
  },

  async getUser(): Promise<User | null> {
    const raw = await safeGet(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  async setUser(user: User): Promise<void> {
    await safeSet(USER_KEY, JSON.stringify(user));
  },

  async removeUser(): Promise<void> {
    await safeRemove(USER_KEY);
  },
};