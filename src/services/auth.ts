
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (credentials: LoginCredentials): Promise<User> => {
  await delay(800); // 800ms simulated latency

  if (credentials.email === "user@example.com" && credentials.password === "password") {
    return {
      id: "1",
      email: "user@example.com",
      name: "John Doe",
      role: "user",
    };
  }

  throw new Error("Invalid email or password");
};

export const logout = async (): Promise<void> => {
  await delay(500);
};
