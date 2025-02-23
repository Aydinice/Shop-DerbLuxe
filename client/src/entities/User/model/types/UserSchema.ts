export interface UserSchema {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface UserState {
  user: UserSchema | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}
