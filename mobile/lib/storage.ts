import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "chatbit_token";
const USER_KEY = "chatbit_user";

type User = {
  id: number;
  fullname: string;
  email: string;
  role: "client" | "agent";
};

export const storage = {
  async getToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async setToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async removeToken() {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  async getUser(): Promise<User | null> {
    const user = await AsyncStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  },

  async setUser(user: User) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async removeUser() {
    await AsyncStorage.removeItem(USER_KEY);
  },
};