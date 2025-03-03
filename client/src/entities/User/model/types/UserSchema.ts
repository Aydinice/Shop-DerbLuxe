export interface User {
  id: number;
  username: string | null;
  email: string | null;
  role: string | null;
}

export interface UserSchema {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
