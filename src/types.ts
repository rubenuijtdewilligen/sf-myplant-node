export interface ApiError {
  message: string;
  status?: number;
  isAuthError: boolean;
  isNetworkError: boolean;
}

export interface ApiStatus {
  isAvailable: boolean;
  error: ApiError | null;
  isLoading: boolean;
}

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  isAdmin: boolean;
  registrationDate: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}
