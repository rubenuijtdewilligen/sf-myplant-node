import type { MyPlantClient } from "./client.js";
import type { LoginResponse } from "./types.js";

export class AuthFlow {
  private client: MyPlantClient;

  constructor(client: MyPlantClient) {
    this.client = client;
  }

  /**
   * Authenticates a user with email or username and password, storing the JWT token.
   */
  public async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.client.request<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.client.setToken(response.token);
    }

    return response;
  }
}
