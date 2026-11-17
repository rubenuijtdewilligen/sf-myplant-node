import { AuthFlow } from "./auth.js";
import { ActivitiesFlow } from "./endpoints/activities.js";
import { WudjesFlow } from "./endpoints/wudjes.js";
import type {
  Activity,
  ActivitySignup,
  ActivitySignupResponse,
  ApiError,
  ApiStatus,
  LoginResponse,
  PostWudjeRequest,
  PostWudjeResponse,
  RemoveRegistration,
  SingleActivity,
  Wud,
} from "./types.js";

export class MyPlantApiError extends Error implements ApiError {
  public status?: number;
  public isAuthError: boolean;
  public isNetworkError: boolean;

  constructor(message: string, status?: number, isNetworkError = false) {
    super(message);
    this.name = "MyPlantApiError";
    if (status !== undefined) {
      this.status = status;
    }
    this.isAuthError = status === 401 || status === 403;
    this.isNetworkError = isNetworkError;
  }
}

export class MyPlantClient {
  public auth: AuthFlow;
  public activities: ActivitiesFlow;
  public wudjes: WudjesFlow;

  public baseUrl: string;
  public token: string | null = null;

  constructor(baseUrl = "https://semper-florens.nl/api", token?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    if (token) {
      this.token = token;
    }

    this.auth = new AuthFlow(this);
    this.activities = new ActivitiesFlow(this);
    this.wudjes = new WudjesFlow(this);
  }

  public setToken(token: string | null): void {
    this.token = token;
  }

  public async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network request failed";
      throw new MyPlantApiError(msg, undefined, true);
    }

    if (!response.ok) {
      let errorMessage = `Request failed: ${response.status} ${response.statusText}`;
      try {
        const errorData = (await response.json()) as {
          message?: string;
          error?: string;
        };
        if (errorData.message) errorMessage = errorData.message;
        else if (errorData.error) errorMessage = errorData.error;
      } catch {
        // Fallback to HTTP status text if response body is not JSON
      }
      throw new MyPlantApiError(errorMessage, response.status, false);
    }

    return response.json() as Promise<T>;
  }

  public async login(
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    return this.auth.login(username, password);
  }

  public getApiStatus(): ApiStatus {
    return {
      isAvailable: true,
      error: null,
      isLoading: false,
    };
  }

  public createApiError(
    status: number,
    message: string,
    isNetworkError = false,
  ): ApiError {
    return new MyPlantApiError(message, status, isNetworkError);
  }

  // bastiaanno/my-plant-api drop-in wrappers:
  public async getActivities(): Promise<Activity[]> {
    return this.activities.getAll();
  }

  public async getActivity({
    activityId,
  }: {
    activityId: string;
  }): Promise<SingleActivity> {
    return this.activities.getById(activityId);
  }

  public async joinActivity(
    id: string,
    info: ActivitySignup,
  ): Promise<ActivitySignupResponse> {
    return this.activities.join(id, info);
  }

  public async removeActivity(
    info: RemoveRegistration,
  ): Promise<{ success: boolean; message?: string }> {
    return this.activities.remove(info);
  }

  public async getWudjes(): Promise<Wud[]> {
    return this.wudjes.getAll();
  }

  public async postWudje(info: PostWudjeRequest): Promise<PostWudjeResponse> {
    return this.wudjes.post(info);
  }
}

export default MyPlantClient;
