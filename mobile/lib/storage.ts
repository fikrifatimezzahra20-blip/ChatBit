import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "chatbit_token";
const USER_KEY = "chatbit_user";

type User = {
  id: number;
  fullname: string;
  email: string;
  role: "client" | "agent";
};

// In-memory fallback if native module or localStorage is unavailable
const memoryStore = new Map<string, string>();

const safeGetItem = async (key: string): Promise<string | null> => {
  try {
    const val = await AsyncStorage.getItem(key);
    if (val !== null && val !== undefined) return val;
  } catch {
    // Fall back below if native module is null
  }

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      // ignore
    }
  }

  return memoryStore.get(key) || null;
};

const safeSetItem = async (key: string, value: string): Promise<void> => {
  let stored = false;

  try {
    await AsyncStorage.setItem(key, value);
    stored = true;
  } catch {
    // Fall back to web/memory
  }

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(key, value);
      stored = true;
    } catch {
      // ignore
    }
  }

  if (!stored) {
    memoryStore.set(key, value);
  }
};

const safeRemoveItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // Fall back to web/memory
  }

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }

  memoryStore.delete(key);
};

export const storage = {
  async getToken(): Promise<string | null> {
    return await safeGetItem(TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await safeSetItem(TOKEN_KEY, token);
  },

  async removeToken(): Promise<void> {
    await safeRemoveItem(TOKEN_KEY);
  },

  async getUser(): Promise<User | null> {
    const user = await safeGetItem(USER_KEY);
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  async setUser(user: User): Promise<void> {
    await safeSetItem(USER_KEY, JSON.stringify(user));
  },

  async removeUser(): Promise<void> {
    await safeRemoveItem(USER_KEY);
  },
};