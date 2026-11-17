import type { MyPlantClient } from "../client.js";
import type {
  PaginatedResponse,
  PaginationOptions,
  PhotoGallery,
} from "../types.js";

export class GalleriesFlow {
  private client: MyPlantClient;

  constructor(client: MyPlantClient) {
    this.client = client;
  }

  /**
   * Retrieves a paginated list of photo galleries.
   */
  public async getPage(
    options: PaginationOptions = {},
  ): Promise<PaginatedResponse<PhotoGallery>> {
    const params = new URLSearchParams();
    if (options.page !== undefined) params.set("page", String(options.page));
    if (options.perPage !== undefined) {
      params.set("perPage", String(options.perPage));
    }

    const query = params.toString();
    const endpoint = query ? `/photo-galleries?${query}` : "/photo-galleries";

    return this.client.request<PaginatedResponse<PhotoGallery>>(endpoint);
  }

  /**
   * Retrieves photo galleries (defaults to first page items).
   */
  public async getAll(
    options: PaginationOptions = {},
  ): Promise<PhotoGallery[]> {
    const response = await this.getPage(options);
    return response.items ?? [];
  }
}
