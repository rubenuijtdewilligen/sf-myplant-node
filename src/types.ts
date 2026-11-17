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
