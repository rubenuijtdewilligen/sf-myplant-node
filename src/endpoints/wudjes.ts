import type { MyPlantClient } from "../client.js";
import type {
  PaginatedResponse,
  PaginationOptions,
  PostWudjeRequest,
  PostWudjeResponse,
  Wud,
} from "../types.js";

export class WudjesFlow {
  private client: MyPlantClient;

  constructor(client: MyPlantClient) {
    this.client = client;
  }

  /**
   * Retrieves a paginated list of WUD messages.
   */
  public async getPage(
    options: PaginationOptions = {},
  ): Promise<PaginatedResponse<Wud>> {
    const params = new URLSearchParams();
    if (options.page !== undefined) params.set("page", String(options.page));
    if (options.perPage !== undefined) {
      params.set("perPage", String(options.perPage));
    }

    const query = params.toString();
    const endpoint = query ? `/wudjes?${query}` : "/wudjes";

    return this.client.request<PaginatedResponse<Wud>>(endpoint);
  }

  /**
   * Retrieves WUD messages (defaults to first page items).
   */
  public async getAll(options: PaginationOptions = {}): Promise<Wud[]> {
    const response = await this.getPage(options);
    return response.items ?? [];
  }

  /**
   * Posts a new WUD message.
   */
  public async post(info: PostWudjeRequest): Promise<PostWudjeResponse> {
    return this.client.request<PostWudjeResponse>("/wudjes", {
      method: "POST",
      body: JSON.stringify(info),
    });
  }
}
